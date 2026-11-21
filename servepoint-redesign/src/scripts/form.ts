export {};
/**
 * Request form behaviour (docs/05 section 4, docs/07 section 5.1). Progressive enhancement: without script the form is a
 * single step. With script: two steps, validation on blur and submit, a summary, an optional "remember my firm details"
 * (firm, name, email, phone only, never the person to be served) and a reference number SP-YYMMDD-XXXX.
 */
const REMEMBER_KEY = "sp-firm-details";
const REF_KEY = "sp-reference";
const root = document.documentElement;

type Variant = "process-serving" | "court-filing" | "corporate-search" | "not-sure";

const form = document.querySelector<HTMLFormElement>("form.request-form");
if (form) init(form);

function track(name: string) {
  (window as unknown as { plausible?: (n: string) => void }).plausible?.(name);
}

function init(f: HTMLFormElement) {
  const box = f.querySelector<HTMLElement>(".formbox")!;
  const status = f.querySelector<HTMLElement>("[id$='-status']")!;
  const errBox = f.querySelector<HTMLElement>(".err-summary")!;
  const errList = errBox.querySelector("ul")!;
  const topicNote = f.querySelector<HTMLElement>("[id$='-topic']")!;
  const summaryDl = f.querySelector<HTMLElement>(".summary-box dl")!;
  const urgNote = f.querySelector<HTMLElement>("[id$='-urgnote']")!;
  const variants = Array.from(f.querySelectorAll<HTMLElement>(".variant"));
  const get = (name: string) => f.elements.namedItem(name) as HTMLInputElement | null;
  const remember = f.querySelector<HTMLInputElement>("input[name='remember']")!;
  let started = false;

  const selectedService = () => (f.querySelector<HTMLInputElement>("input[name='service']:checked")?.value ?? "process-serving") as Variant;
  const stepLabel = ["", "Step 1 of 2: The file", "Step 2 of 2: The person and the place", "Review: Check your request"];

  // ---- Prefill from the page that linked here ----
  const q = new URLSearchParams(location.search);
  const svc = q.get("service");
  if (svc) {
    const r = f.querySelector<HTMLInputElement>(`input[name='service'][value='${svc}']`);
    if (r) r.checked = true;
  }
  const urgKey = q.get("urgency");
  if (urgKey) {
    const r = f.querySelector<HTMLInputElement>(`input[name='urgency'][data-key='${urgKey}']`);
    if (r) r.checked = true;
  }
  if (q.get("city")) get("city")!.value = q.get("city")!;
  const topic = q.get("topic");
  const topics: Record<string, string> = {
    "preferred-pricing": "Asking about preferred pricing for law firms and high-volume clients.",
    "community-rate": "Asking about the discounted community rate.",
    coverage: "Checking availability outside the listed areas. Add the address in step 2.",
  };
  if (topic && topics[topic]) {
    get("topic")!.value = topic;
    topicNote.textContent = topics[topic];
    topicNote.hidden = false;
  }
  if (q.get("city")) {
    const name = q.get("city")!.replace(/-/g, " ");
    topicNote.textContent = `${topicNote.textContent ?? ""} Area: ${name}.`.trim();
    topicNote.hidden = false;
  }

  // ---- Remembered firm details ----
  try {
    const saved = JSON.parse(localStorage.getItem(REMEMBER_KEY) ?? "null");
    if (saved) {
      (["firm", "name", "email", "phone"] as const).forEach((k) => {
        if (saved[k]) get(k)!.value = saved[k];
      });
      remember.checked = true;
    }
  } catch { /* storage unavailable: the form works without it */ }
  f.querySelector("[id$='-forget']")?.addEventListener("click", () => {
    try { localStorage.removeItem(REMEMBER_KEY); } catch { /* ignore */ }
    (["firm", "name", "email", "phone"] as const).forEach((k) => (get(k)!.value = ""));
    remember.checked = false;
  });

  // ---- Phones: phone, court file number and matter reference fold behind one control ----
  const opt = Array.from(f.querySelectorAll<HTMLElement>(".field.opt"));
  if (opt.length) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "opt-toggle full step1";
    toggle.innerHTML = '<span>Add phone, court file number or matter reference</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    opt[opt.length - 1].after(toggle);
    const reveal = () => {
      opt.forEach((el) => el.classList.add("shown"));
      toggle.hidden = true;
    };
    toggle.addEventListener("click", () => {
      reveal();
      opt[0].querySelector<HTMLInputElement>("input")?.focus();
    });
    if (opt.some((el) => (el.querySelector<HTMLInputElement>("input")?.value ?? "").trim())) reveal();
  }

  // ---- Live summary beside the form (service, urgency, deadline and references only. Never the person served) ----
  const live = document.querySelector<HTMLElement>("[data-live-sum]");
  const setLive = (key: string, text: string) => {
    const dd = live?.querySelector<HTMLElement>(`[data-sum='${key}']`);
    if (!dd) return;
    dd.textContent = text || "Not given";
    dd.classList.toggle("empty", !text);
  };
  const updateLive = () => {
    if (!live) return;
    const svcLabel = f.querySelector<HTMLInputElement>("input[name='service']:checked + label")?.textContent ?? "";
    setLive("service", svcLabel);
    setLive("urgency", f.querySelector<HTMLInputElement>("input[name='urgency']:checked")?.value ?? "");
    setLive("firm", get("firm")?.value.trim() ?? "");
    setLive("court", get("court")?.value.trim() ?? "");
    setLive("matter", get("matter")?.value.trim() ?? "");
    const v = selectedService();
    const deadlineName = v === "process-serving" ? "deadline" : v === "court-filing" ? "court_deadline" : v === "corporate-search" ? "search_deadline" : "help_deadline";
    setLive("deadline", get(deadlineName)?.value ?? "");
    const timing = live.querySelector<HTMLElement>("[data-sum-timing]");
    const u = f.querySelector<HTMLInputElement>("input[name='urgency']:checked")?.dataset.key;
    if (timing) timing.textContent = u === "standard" ? "First attempt typically within 24 hours of receiving your documents and instructions." : "Rush requests are prioritized. Availability is confirmed the same business day, and rush pricing is confirmed before service.";
  };
  f.addEventListener("input", updateLive);
  f.addEventListener("change", updateLive);

  // ---- Variants and urgency note ----
  const showVariant = () => {
    const v = selectedService();
    variants.forEach((el) => {
      const on = el.dataset.v === v;
      el.classList.toggle("on", on);
      el.querySelectorAll<HTMLInputElement>("input, textarea, select").forEach((i) => {
        i.disabled = !on; // hidden fields are not submitted (docs/07 section 5.1)
        if (i.hasAttribute("data-req")) i.required = on;
      });
    });
  };
  const notes: Record<string, string> = {
    Standard: "First attempt typically within 24 hours.",
    "Rush within 48 hours": "Rush requests are prioritized. Availability is confirmed the same business day, and rush pricing is confirmed before service.",
    "Rush same day": "Rush requests are prioritized. Availability is confirmed the same business day, and rush pricing is confirmed before service.",
  };
  f.querySelectorAll<HTMLInputElement>("input[name='urgency']").forEach((i) =>
    i.addEventListener("change", () => (urgNote.textContent = notes[i.value] ?? ""))
  );
  f.querySelectorAll<HTMLInputElement>("input[name='service']").forEach((i) => i.addEventListener("change", showVariant));
  showVariant();
  updateLive();

  // ---- Step control ----
  const stepper = Array.from(document.querySelectorAll<HTMLElement>(".stepper li"));
  const go = (n: 1 | 2 | 3, focus = true) => {
    const apply = () => {
      box.dataset.step = String(n);
      status.textContent = stepLabel[n];
      stepper.forEach((li) => {
        const k = Number(li.dataset.s);
        if (k === n) li.setAttribute("aria-current", "step");
        else li.removeAttribute("aria-current");
        li.classList.toggle("done", k < n);
      });
      if (n === 3) buildSummary();
      if (focus) status.focus({ preventScroll: false });
    };
    const vt = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition;
    if (vt && !matchMedia("(prefers-reduced-motion: reduce)").matches) vt.call(document, apply);
    else apply();
  };

  // ---- Validation ----
  const label = (el: HTMLElement) => (el.closest(".field")?.querySelector("label")?.firstChild?.textContent ?? el.getAttribute("name") ?? "").trim();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  function problem(el: HTMLInputElement): string | null {
    if (el.disabled) return null;
    const v = el.value.trim();
    if (el.required && !v && el.type !== "radio") return `Enter ${label(el).toLowerCase()}.`;
    if (el.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter an email address we can reply to, like name@firm.ca.";
    if (el.type === "date" && v && new Date(`${v}T00:00:00`) < today) return "Enter a date that is today or later.";
    return null;
  }
  function setError(el: HTMLInputElement, msg: string | null) {
    const wrap = el.closest(".field");
    wrap?.querySelector(".msg")?.remove();
    wrap?.classList.toggle("err", Boolean(msg));
    if (msg) {
      const p = document.createElement("p");
      p.className = "msg"; p.id = `${el.id}-err`; p.textContent = msg;
      wrap?.appendChild(p);
      el.setAttribute("aria-invalid", "true");
      el.setAttribute("aria-describedby", p.id);
    } else {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    }
  }
  function validate(step: 1 | 2): boolean {
    const scope = step === 1 ? Array.from(f.querySelectorAll<HTMLInputElement>(".step1 input, .step1 textarea")) : Array.from(f.querySelectorAll<HTMLInputElement>(".variant.on input, .variant.on textarea"));
    const errs: { el: HTMLElement; msg: string }[] = [];
    scope.filter((e) => e.type !== "checkbox" || e.name !== "remember").forEach((el) => {
      if (el.type === "radio" || el.type === "checkbox" || el.name === "bot-field") return;
      const m = problem(el);
      setError(el, m);
      if (m) errs.push({ el, msg: m });
    });
    if (step === 2 && selectedService() === "corporate-search" && !f.querySelector("input[name='search_types']:checked")) {
      const first = f.querySelector<HTMLElement>("input[name='search_types']")!;
      errs.push({ el: first, msg: "Choose at least one search." });
    }
    errList.innerHTML = "";
    errs.forEach(({ el, msg }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${el.id}`; a.textContent = msg;
      a.addEventListener("click", (e) => { e.preventDefault(); el.focus(); });
      li.appendChild(a); errList.appendChild(li);
    });
    errBox.hidden = errs.length === 0;
    if (errs.length) errBox.focus();
    return errs.length === 0;
  }
  f.addEventListener("focusout", (e) => {
    const el = e.target as HTMLInputElement;
    if (el.matches?.("input:not([type=radio]):not([type=checkbox]), textarea") && el.name !== "bot-field") setError(el, problem(el));
  });
  f.addEventListener("input", () => {
    if (!started) { started = true; track("request_start"); }
  }, { once: true });

  // ---- Summary ----
  function buildSummary() {
    summaryDl.innerHTML = "";
    const add = (k: string, v: string) => {
      if (!v) return;
      const dt = document.createElement("dt"); dt.textContent = k;
      const dd = document.createElement("dd"); dd.textContent = v;
      summaryDl.append(dt, dd);
    };
    const val = (n: string) => (get(n)?.value ?? "").trim();
    add("Firm", val("firm")); add("Name", val("name")); add("Email", val("email")); add("Phone", val("phone"));
    add("Matter reference", val("matter")); add("Court file number", val("court"));
    add("Service", f.querySelector<HTMLInputElement>("input[name='service']:checked + label")?.textContent ?? "");
    add("Urgency", f.querySelector<HTMLInputElement>("input[name='urgency']:checked")?.value ?? "");
    f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(".variant.on input, .variant.on textarea").forEach((el) => {
      if ((el.type === "radio" || el.type === "checkbox") && !(el as HTMLInputElement).checked) return;
      const l = el.closest(".field")?.querySelector("label")?.firstChild?.textContent ?? el.closest("fieldset")?.querySelector("legend")?.textContent ?? el.name;
      add(l.trim(), el.value.trim());
    });
  }

  // ---- Buttons ----
  // A field's blur validation can add an error line and move the button before the click lands. Keeping focus on the
  // field during mouse down means the click always reaches the button; focus moves programmatically afterwards.
  f.querySelectorAll<HTMLButtonElement>("button[type='button'].btn, .opt-toggle").forEach((b) => b.addEventListener("mousedown", (e) => e.preventDefault()));
  const on = (suffix: string, fn: () => void) => f.querySelector(`[id$='${suffix}']`)?.addEventListener("click", fn);
  on("-next", () => { if (validate(1)) { track("request_step_2"); errBox.hidden = true; go(2); } });
  on("-back", () => { errBox.hidden = true; go(1); });
  on("-review", () => { if (validate(2)) { errBox.hidden = true; go(3); } });
  on("-edit1", () => go(1));
  on("-edit2", () => go(2));

  // ---- Submit: validate, generate the reference, remember details, then post natively ----
  f.addEventListener("submit", (e) => {
    if (box.dataset.step !== "3") {
      e.preventDefault();
      if (box.dataset.step === "1" && validate(1)) go(2);
      else if (box.dataset.step === "2" && validate(2)) go(3);
      return;
    }
    const ref = makeReference();
    get("reference")!.value = ref;
    try {
      sessionStorage.setItem(REF_KEY, ref);
      if (remember.checked) localStorage.setItem(REMEMBER_KEY, JSON.stringify({ firm: get("firm")!.value, name: get("name")!.value, email: get("email")!.value, phone: get("phone")!.value }));
      else localStorage.removeItem(REMEMBER_KEY);
    } catch { /* ignore */ }
    f.action = `/request-service/received/?ref=${encodeURIComponent(ref)}`;
    track("request_submit");
  });

  root.classList.add("form-ready");
}

/** SP-YYMMDD-XXXX with four random characters and no ambiguous letters. A convenience for the client's email, not a token. */
function makeReference(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `SP-${yy}${mm}${dd}-${suffix}`;
}
