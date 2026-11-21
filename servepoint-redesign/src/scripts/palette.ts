/**
 * Command palette (docs/15 section 4). Native dialog, combobox over a listbox, keyboard first.
 * Opens with Ctrl or Cmd K, with the slash key outside a field, or from any [data-palette-open] button.
 * The index is fetched once from /search.json on first open.
 */
interface Item {
  t: string; // title
  s?: string; // subtitle
  u: string; // url
  k: string; // kind: Action, Service, Page, Area, Neighbourhood, Guide
  q?: string; // extra keywords
}

const dialog = document.getElementById("palette") as HTMLDialogElement | null;
const input = document.getElementById("palette-input") as HTMLInputElement | null;
const list = document.getElementById("palette-list");

if (dialog && input && list && typeof dialog.showModal === "function") {
  let index: Item[] | null = null;
  let loading: Promise<void> | null = null;
  let shown: Item[] = [];
  let active = 0;

  const load = () => {
    loading ??= fetch("/search.json")
      .then((r) => r.json() as Promise<Item[]>)
      .then((d) => {
        index = d;
      })
      .catch(() => {
        index = [];
      });
    return loading;
  };

  const order = ["Action", "Service", "Page", "Area", "Neighbourhood", "Guide"];
  const icons: Record<string, string> = {
    Action: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    Service: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    Page: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    Area: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    Neighbourhood: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    Guide: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  };

  const score = (it: Item, terms: string[]) => {
    const title = it.t.toLowerCase();
    const hay = `${title} ${(it.s ?? "").toLowerCase()} ${(it.q ?? "").toLowerCase()}`;
    let s = 0;
    for (const term of terms) {
      if (title === term) s += 12;
      else if (title.startsWith(term)) s += 8;
      else if (title.includes(` ${term}`)) s += 6;
      else if (title.includes(term)) s += 4;
      else if (hay.includes(term)) s += 2;
      else return 0;
    }
    return s;
  };

  const suggested = (): Item[] =>
    (index ?? []).filter((i) => i.k === "Action" || i.k === "Service" || ["Pricing", "Areas we serve", "Guides"].includes(i.t));

  function render() {
    const raw = input!.value.trim().toLowerCase();
    const terms = raw.split(/\s+/).filter(Boolean);
    let items: Item[];
    if (!terms.length) items = suggested();
    else
      items = (index ?? [])
        .map((it) => ({ it, s: score(it, terms) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s || order.indexOf(a.it.k) - order.indexOf(b.it.k))
        .slice(0, 14)
        .map((x) => x.it);
    shown = terms.length ? items : [...items].sort((a, b) => order.indexOf(a.k) - order.indexOf(b.k));
    active = 0;
    list!.innerHTML = "";
    if (!shown.length) {
      const p = document.createElement("p");
      p.className = "palette-empty";
      p.textContent = raw ? "Nothing matches. Try a neighbourhood, a document, or Request service." : "Loading";
      list!.appendChild(p);
      input!.removeAttribute("aria-activedescendant");
      return;
    }
    let group = "";
    shown.forEach((it, i) => {
      const label = terms.length ? "" : it.k === "Action" ? "Do something" : it.k === "Service" ? "Services" : "Pages";
      if (label && label !== group) {
        group = label;
        const g = document.createElement("div");
        g.className = "palette-group";
        g.setAttribute("role", "presentation");
        g.textContent = label;
        list!.appendChild(g);
      }
      const a = document.createElement("a");
      a.className = "palette-item";
      a.id = `pal-${i}`;
      a.href = it.u;
      a.setAttribute("role", "option");
      a.setAttribute("aria-selected", String(i === 0));
      a.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[it.k] ?? icons.Page}</svg><span class="grow"><span></span><span class="sub"></span></span><span class="kind"></span>`;
      (a.querySelector(".grow > span") as HTMLElement).textContent = it.t;
      (a.querySelector(".sub") as HTMLElement).textContent = it.s ?? "";
      (a.querySelector(".kind") as HTMLElement).textContent = it.k;
      a.addEventListener("mousemove", () => select(i, false));
      a.addEventListener("click", () => dialog!.close());
      list!.appendChild(a);
    });
    input!.setAttribute("aria-activedescendant", "pal-0");
  }

  function select(i: number, scroll = true) {
    if (!shown.length) return;
    active = (i + shown.length) % shown.length;
    list!.querySelectorAll<HTMLElement>(".palette-item").forEach((el, j) => el.setAttribute("aria-selected", String(j === active)));
    const el = document.getElementById(`pal-${active}`);
    input!.setAttribute("aria-activedescendant", `pal-${active}`);
    if (scroll) el?.scrollIntoView({ block: "nearest" });
  }

  async function open() {
    if (dialog!.open) return;
    dialog!.showModal();
    input!.value = "";
    render();
    await load();
    render();
    input!.focus();
  }

  input.addEventListener("input", render);
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      select(active + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      select(active - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = shown[active];
      if (it) {
        dialog.close();
        location.href = it.u;
      }
    }
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.querySelectorAll("[data-palette-open]").forEach((b) => b.addEventListener("click", open));
  document.addEventListener("keydown", (e) => {
    const typing = (e.target as HTMLElement).matches?.("input, textarea, select, [contenteditable]");
    if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      dialog.open ? dialog.close() : open();
    } else if (e.key === "/" && !typing && !dialog.open) {
      e.preventDefault();
      open();
    }
  });
  // Warm the index when the pointer first approaches the search button.
  document.querySelectorAll("[data-palette-open]").forEach((b) => b.addEventListener("pointerenter", load, { once: true }));
}
