/**
 * The process scene (docs/15 section 5). One module for every layout, loaded only on the page that has a [data-scene].
 *
 * The stage in focus is written to data-now on the scene, and to is-active and is-reached on the stages. The rail, the step bar,
 * the lit part of the sample sheet and the fades are all CSS transitions on those states.
 *
 * Which stage is in focus depends on the layout:
 * - Phones in portrait (the scene is pinned): the scroll position inside the scroll track, in equal parts. The frame stays put
 *   while the reader scrolls, and the next stage fades in over the one before. A scroll listener is attached only while the
 *   track is on screen, one passive listener that schedules one frame.
 * - Everywhere else (a column of stages): the stage that crosses a line 45% down the window, by IntersectionObserver.
 * Tapping a step scrolls to its stage in either layout.
 */
const scene = document.querySelector<HTMLElement>("[data-scene]");

if (scene) {
  const stages = Array.from(scene.querySelectorAll<HTMLElement>(".stage"));
  const rail = scene.querySelector<HTMLElement>(".stages")!;
  const tabs = Array.from(scene.querySelectorAll<HTMLButtonElement>(".scene-tab"));
  const track = scene.querySelector<HTMLElement>(".scene-pin")!;
  const frame = scene.querySelector<HTMLElement>(".scene-pinned")!;
  const header = document.getElementById("site-header");
  const pin = matchMedia("(max-width: 40rem) and (min-height: 36rem) and (prefers-reduced-motion: no-preference)");
  let now = 0;

  const paintRail = () => rail.style.setProperty("--rail", `${stages[Math.max(now, 1) - 1].offsetTop}px`);
  // On a phone the step bar is a carousel. The step in focus is brought to the centre of it, smoothly, once the page is running.
  const bar = scene.querySelector<HTMLElement>(".scene-tabs")!;
  const centre = (n: number, smooth: boolean) => {
    const pill = tabs[n - 1]?.parentElement;
    if (!pill || bar.scrollWidth <= bar.clientWidth + 1) return;
    bar.scrollTo({ left: pill.offsetLeft - (bar.clientWidth - pill.offsetWidth) / 2, behavior: smooth ? "smooth" : "instant" });
  };
  const set = (n: number) => {
    n = Math.min(Math.max(n, 1), stages.length);
    if (n === now) return;
    const first = now === 0;
    now = n;
    scene.dataset.now = String(n);
    scene.style.setProperty("--steps-p", String(n / stages.length));
    stages.forEach((s, i) => {
      s.classList.toggle("is-active", i + 1 === n);
      s.classList.toggle("is-reached", i + 1 <= n);
    });
    tabs.forEach((t, i) => {
      t.classList.toggle("is-done", i + 1 < n);
      if (i + 1 === n) t.setAttribute("aria-current", "step");
      else t.removeAttribute("aria-current");
    });
    centre(n, !first);
    paintRail();
  };

  scene.classList.add("tabs-on");
  set(1);
  new ResizeObserver(paintRail).observe(rail);

  // ---- Pinned: the scroll position picks the stage ----
  const headerH = () => header?.getBoundingClientRect().height ?? 60;
  /** The pinned distance: the track is taller than the frame by this much. */
  const span = () => track.offsetHeight - frame.offsetHeight;
  const update = () => {
    if (!pin.matches) return;
    const scrolled = headerH() - track.getBoundingClientRect().top;
    const p = Math.min(Math.max(scrolled / Math.max(span(), 1), 0), 1);
    scene.style.setProperty("--pin-p", p.toFixed(4));
    set(Math.floor(p * stages.length) + 1);
  };
  let queued = 0;
  const schedule = () => {
    if (!queued) queued = requestAnimationFrame(() => ((queued = 0), update()));
  };
  let listening = false;
  const listen = (on: boolean) => {
    if (on === listening) return;
    listening = on;
    if (on) {
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", schedule);
      update();
    } else {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    }
  };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => listen(e.isIntersecting && pin.matches)).observe(track);
  }
  pin.addEventListener("change", () => {
    if (pin.matches) listen(true);
    else listen(false);
    paintRail();
  });

  // ---- A column: the stage that crosses a line 45% down the window is in focus ----
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !pin.matches) set(stages.indexOf(e.target as HTMLElement) + 1);
        }),
      { rootMargin: "-45% 0px -55% 0px" }
    );
    stages.forEach((s) => io.observe(s));
  }

  // ---- A tap on a step goes to its stage ----
  scene.addEventListener("click", (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>("[data-go]");
    if (!b) return;
    const n = Number(b.dataset.go);
    if (pin.matches) {
      // The middle of that stage's part of the pinned distance
      const start = scrollY + track.getBoundingClientRect().top - headerH();
      scrollTo({ top: start + ((n - 0.5) / stages.length) * span() });
    } else {
      stages[n - 1]?.scrollIntoView({ block: "start" });
    }
  });
}

export {};
