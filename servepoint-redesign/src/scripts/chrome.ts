/**
 * Site chrome behaviour (docs/15 sections 6 and 9): the mobile menu dialog, hover for the Services popover, copy buttons
 * with a toast, generic tabs with swipe, the section nav and the table of contents with scroll-spy, and the phone patterns:
 * clamped text with Read more, folded lists with Show all, swipe rows with dots, and a bottom bar that steps aside.
 * No framework. Nothing here reads layout on scroll: observers and events only.
 */
const root = document.documentElement;
const fine = matchMedia("(hover: hover) and (pointer: fine)");
const small = matchMedia("(max-width: 40rem)");
const chevron = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

// ---- Mobile menu (native dialog) ----
const menu = document.getElementById("mobile-menu") as HTMLDialogElement | null;
document.getElementById("menu-open")?.addEventListener("click", (e) => {
  if (!menu?.showModal) return;
  e.preventDefault();
  menu.showModal();
});
document.getElementById("menu-close")?.addEventListener("click", () => menu?.close());
menu?.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  if (t === menu || t.closest("a")) menu.close();
});

// ---- Services popover opens on hover for fine pointers. Click, Enter and Escape still work natively. ----
const mega = document.getElementById("mega");
const trigger = document.getElementById("mega-trigger");
if (mega && trigger && "showPopover" in mega) {
  let timer = 0;
  const open = () => {
    window.clearTimeout(timer);
    if (fine.matches && !mega.matches(":popover-open")) (mega as HTMLElement & { showPopover(): void }).showPopover();
  };
  const close = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (mega.matches(":popover-open")) (mega as HTMLElement & { hidePopover(): void }).hidePopover();
    }, 160);
  };
  [trigger, mega].forEach((el) => {
    el.addEventListener("pointerenter", open);
    el.addEventListener("pointerleave", close);
  });
  mega.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) (mega as HTMLElement & { hidePopover(): void }).hidePopover();
  });
}

// ---- Toast and copy buttons ----
const toast = document.getElementById("toast");
let toastTimer = 0;
export function say(message: string) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("on");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("on"), 2200);
}
document.addEventListener("click", async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-copy]");
  if (!btn) return;
  const text = btn.dataset.copy || document.querySelector(btn.dataset.copyTarget ?? "")?.textContent || "";
  try {
    await navigator.clipboard.writeText(text.trim());
    say("Copied");
  } catch {
    say("Select the text and copy it");
  }
});

// ---- Mobile bar: hidden while a form field has focus, and while the hero actions or the closing band are on screen ----
document.addEventListener("focusin", (e) => {
  if ((e.target as HTMLElement).matches?.("input:not([type=radio]):not([type=checkbox]), select, textarea")) root.setAttribute("data-formfocus", "");
});
document.addEventListener("focusout", () => root.removeAttribute("data-formfocus"));
const watched = document.querySelectorAll("[data-mbar-hide]");
if (watched.length && "IntersectionObserver" in window) {
  const inView = new Set<Element>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
    root.toggleAttribute("data-mbar-off", inView.size > 0);
  });
  watched.forEach((el) => io.observe(el));
}

// ---- Generic tabs: [data-tabs] > [role=tablist] button[role=tab] ... [role=tabpanel]. Without script every panel shows. ----
document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((box) => {
  const tabs = Array.from(box.querySelectorAll<HTMLElement>("[role=tab]"));
  const panels = Array.from(box.querySelectorAll<HTMLElement>("[role=tabpanel]"));
  if (!tabs.length) return;
  box.classList.add("tabs-ready");
  const select = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(i === j));
      t.tabIndex = i === j ? 0 : -1;
    });
    panels.forEach((p, j) => (p.hidden = i !== j));
    box.dataset.tab = String(i);
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      const k = (e as KeyboardEvent).key;
      let n = -1;
      if (k === "ArrowRight" || k === "ArrowDown") n = (i + 1) % tabs.length;
      if (k === "ArrowLeft" || k === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
      if (k === "Home") n = 0;
      if (k === "End") n = tabs.length - 1;
      if (n >= 0) {
        e.preventDefault();
        select(n, true);
      }
    });
  });
  const start = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
  select(start);

  // Swipe the panel to move to the next or the previous tab
  const host = panels[0]?.parentElement;
  if (host) {
    let x0 = 0;
    let y0 = 0;
    let live = false;
    host.addEventListener(
      "touchstart",
      (e) => {
        live = e.touches.length === 1 && !(e.target as HTMLElement).closest("input, textarea, select, .chips-scroll");
        x0 = e.touches[0].clientX;
        y0 = e.touches[0].clientY;
      },
      { passive: true }
    );
    host.addEventListener(
      "touchend",
      (e) => {
        if (!live) return;
        live = false;
        const dx = e.changedTouches[0].clientX - x0;
        const dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
        const n = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true") + (dx < 0 ? 1 : -1);
        if (n >= 0 && n < tabs.length) select(n);
      },
      { passive: true }
    );
  }
});

// ---- Phones: the footer link groups are accordions, closed. They are open in the HTML, so wide screens and no script show every link. ----
const footGroups = Array.from(document.querySelectorAll<HTMLDetailsElement>(".foot-col details"));
if (footGroups.length) {
  const sync = () => footGroups.forEach((d) => (d.open = !small.matches));
  sync();
  small.addEventListener("change", sync);
  footGroups.forEach((d) => d.querySelector("summary")?.addEventListener("click", (e) => !small.matches && e.preventDefault()));
}

// ---- Phones: long text clamps to a few lines with Read more. [data-collapse="3"] clamps lines, [data-fold] clamps height. ----
let uid = 0;
document.querySelectorAll<HTMLElement>("[data-collapse], [data-fold]").forEach((el) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "more-btn";
  btn.hidden = true;
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = `<span>Read more</span>${chevron}`;
  if (!el.id) el.id = `more-${++uid}`;
  btn.setAttribute("aria-controls", el.id);
  el.after(btn);
  const measure = () => {
    if (!small.matches) btn.hidden = true;
    else btn.hidden = !el.hasAttribute("data-open") && el.scrollHeight <= el.clientHeight + 1;
  };
  btn.addEventListener("click", () => {
    const open = !el.hasAttribute("data-open");
    el.toggleAttribute("data-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.firstElementChild!.textContent = open ? "Show less" : "Read more";
  });
  new ResizeObserver(measure).observe(el);
  small.addEventListener("change", measure);
  document.fonts?.ready.then(measure);
  measure();
});

// ---- Phones: a long list shows its first items and a Show all button. [data-clip="8"] on the list. ----
document.querySelectorAll<HTMLElement>("[data-clip]").forEach((list) => {
  const keep = Number(list.dataset.clip) || 8;
  const items = Array.from(list.children) as HTMLElement[];
  if (items.length <= keep + 1) return;
  items.forEach((li, i) => li.classList.toggle("over", i >= keep));
  list.classList.add("clip");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "more-btn";
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = `<span>Show all ${items.length}</span>${chevron}`;
  btn.addEventListener("click", () => {
    const all = list.classList.toggle("all");
    btn.setAttribute("aria-expanded", String(all));
    btn.firstElementChild!.textContent = all ? "Show fewer" : `Show all ${items.length}`;
  });
  list.after(btn);
});

// ---- Phones: card groups are swipe rows with dots ----
document.querySelectorAll<HTMLElement>(".snap-row").forEach((row) => {
  const items = Array.from(row.children) as HTMLElement[];
  const dots = document.createElement("div");
  dots.className = "snap-dots";
  dots.setAttribute("aria-hidden", "true");
  items.forEach(() => dots.appendChild(document.createElement("i")));
  row.after(dots);
  row.setAttribute("aria-label", row.dataset.label ?? "Cards. Swipe or use the arrow keys.");
  let frame = 0;
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : row.clientWidth;
      const i = atEnd ? items.length - 1 : Math.round(row.scrollLeft / Math.max(step, 1));
      Array.from(dots.children).forEach((d, j) => d.classList.toggle("on", j === i));
    });
  };
  const arm = () => (small.matches ? row.setAttribute("tabindex", "0") : row.removeAttribute("tabindex"));
  row.addEventListener("scroll", sync, { passive: true });
  small.addEventListener("change", arm);
  arm();
  sync();
});

// ---- Scroll-spy for the section nav and the table of contents ----
function spy(links: HTMLAnchorElement[]) {
  const targets = links
    .map((a) => ({ a, el: document.getElementById(decodeURIComponent(a.hash.slice(1))) }))
    .filter((t): t is { a: HTMLAnchorElement; el: HTMLElement } => Boolean(t.el));
  if (!targets.length || !("IntersectionObserver" in window)) return;
  const visible = new Map<Element, number>();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.set(en.target, en.boundingClientRect.top) : visible.delete(en.target)));
      const top = [...visible.entries()].sort((x, y) => x[1] - y[1])[0]?.[0];
      targets.forEach((t) => {
        if (t.el === top) {
          t.a.setAttribute("aria-current", "true");
          // keep the active pill in view on the swipe row
          const bar = t.a.closest<HTMLElement>(".subnav-in");
          if (bar && bar.scrollWidth > bar.clientWidth) {
            const x = t.a.getBoundingClientRect().left - bar.getBoundingClientRect().left + bar.scrollLeft;
            bar.scrollTo({ left: x - bar.clientWidth / 3, behavior: "smooth" });
          }
        } else t.a.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-18% 0px -62% 0px" }
  );
  targets.forEach((t) => io.observe(t.el));
}
spy(Array.from(document.querySelectorAll<HTMLAnchorElement>(".subnav a[href^='#']")));

// ---- Table of contents built from the h2 elements of [data-toc-source]. A disclosure on phones, open on wide screens. ----
const tocBox = document.querySelector<HTMLElement>("[data-toc]");
const tocSource = document.querySelector<HTMLElement>("[data-toc-source]");
if (tocBox && tocSource) {
  const heads = Array.from(tocSource.querySelectorAll<HTMLElement>("h2"));
  if (heads.length > 1) {
    const ul = document.createElement("ul");
    heads.forEach((h, i) => {
      if (!h.id) h.id = `s-${i + 1}-${h.textContent!.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });
    tocBox.querySelector("h2")?.remove();
    const wide = matchMedia("(min-width: 62.0625rem)");
    const det = document.createElement("details");
    const sum = document.createElement("summary");
    sum.innerHTML = `On this page${chevron}`;
    sum.addEventListener("click", (e) => wide.matches && e.preventDefault());
    det.open = wide.matches;
    wide.addEventListener("change", () => (det.open = wide.matches));
    det.append(sum, ul);
    tocBox.appendChild(det);
    tocBox.hidden = false;
    ul.addEventListener("click", (e) => {
      if (!wide.matches && (e.target as HTMLElement).closest("a")) det.open = false;
    });
    spy(Array.from(ul.querySelectorAll("a")));
  }
}

// ---- The process scene (home page only) is its own module ----
if (document.querySelector("[data-scene]")) void import("./scene.ts");
