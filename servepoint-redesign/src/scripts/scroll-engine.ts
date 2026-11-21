/**
 * Scroll engine v3 (docs/15 section 7). Inlined in the base layout.
 *
 * Motion is time based, not scroll based. A block rises a few pixels and fades in once, when it comes into view, and then
 * stays put. Nothing here listens to scroll. Everything runs on IntersectionObserver.
 *
 * Contract
 * - Adds the classes loaded and reduced to <html>, the attribute data-scrolled once the page has moved, and the classes
 *   rv and rv-in on blocks that are below the fold, and drawn on the network map.
 * - Blocks that are already on screen when the page opens are left alone, so there is no hide-and-show flash.
 * - With reduced motion nothing is hidden and nothing is added except the two state classes. With no script the page is complete.
 * - The scene (the pinned sample sheet, the step bar on phones) is a separate module, scene.ts, loaded only where it is used.
 */
(function () {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("loaded");
  if (reduce) root.classList.add("reduced");
  if (!("IntersectionObserver" in window)) return;

  // The header settles into a solid bar once the page has moved. A sentinel at the top, no scroll listener.
  const top = document.createElement("div");
  top.setAttribute("aria-hidden", "true");
  Object.assign(top.style, { position: "absolute", top: "0", left: "0", width: "1px", height: "8px", pointerEvents: "none" });
  document.body.prepend(top);
  new IntersectionObserver(([e]) => root.toggleAttribute("data-scrolled", !e.isIntersecting)).observe(top);

  if (reduce) return;

  // Blocks that rise into view: section heads, the columns of a two column section, card groups, tables.
  const targets = [
    ".sec-head",
    ".reveal",
    ".snap-row",
    ".founder-card",
    ".grid-2 > *",
    ".grid-3 > *",
    ".grid-auto > *",
    ".guide-list > *",
    ".court-list > *",
    ".showcase",
    ".area-grid",
    ".table-wrap",
    ".instruct-card",
  ].join(",");
  const vh = innerHeight;
  const seen = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      const batch = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
      batch.forEach((el, i) => {
        io.unobserve(el);
        el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
        el.classList.add("rv-in");
        // Once it has arrived, hand the element back to its own transitions.
        window.setTimeout(() => {
          el.classList.remove("rv", "rv-in");
          el.style.transitionDelay = "";
        }, 1200 + i * 70);
      });
    },
    { rootMargin: "0px 0px -9% 0px" }
  );
  document.querySelectorAll<HTMLElement>(targets).forEach((el) => {
    // The scene (stages, pinned sheet, pinned frame) manages its own states and is never revealed here.
    if (seen.has(el) || el.closest(".rv") || el.closest("[data-scene] .scene-pin") || el.closest("[data-hero], .hero, .page-hero")) return;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92) return; // on screen already, or above the fold after a reload: leave it alone
    seen.add(el);
    el.classList.add("rv");
    io.observe(el);
  });

  // The coverage network draws itself once when it first comes into view.
  const draw = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("drawn");
        draw.unobserve(e.target);
      }),
    { threshold: 0.35 }
  );
  document.querySelectorAll("[data-draw]").forEach((el) => draw.observe(el));
})();
