// Core interactions. Everything is progressive: the site works fully without it.
// Several pieces are vanilla ports of React Bits components (Aurora, RotatingText, TextPressure,
// SpotlightCard, Magnet) so the site ships no React runtime.
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
const idle = (fn: () => void) => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

/* ---------- splash & arrival cleanup ---------- */
if (root.classList.contains("is-splash")) setTimeout(() => root.classList.remove("is-splash"), 2100);
if (root.classList.contains("is-arriving")) setTimeout(() => root.classList.remove("is-arriving"), 600);
addEventListener("pageshow", (e) => { if (e.persisted) root.classList.remove("is-leaving", "is-arriving"); });

/* ---------- reveal on scroll ---------- */
// Only below-the-fold elements are hidden, so nothing visible ever flickers and crawlers see everything.
if (!reduce) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.replace("is-pending", "is-in");
      io.unobserve(e.target);
    }),
    { rootMargin: "0px 0px -6% 0px" },
  );
  $$(".reveal").forEach((el, i) => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add("is-pending");
    el.style.setProperty("--d", `${(i % 3) * 70}ms`);
    io.observe(el);
  });
}

/* ---------- copy e-mail ---------- */
$$<HTMLButtonElement>("[data-copy]").forEach((btn) => {
  if (!navigator.clipboard) return;
  btn.hidden = false;
  const label = btn.querySelector("[data-copy-label]");
  const status = btn.parentElement?.querySelector("[data-copy-status]");
  const original = label?.textContent ?? "";
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? "");
      if (label) label.textContent = btn.dataset.copied ?? "";
      if (status) status.textContent = btn.dataset.copied ?? "";
      setTimeout(() => { if (label) label.textContent = original; if (status) status.textContent = ""; }, 2200);
    } catch { /* clipboard denied: the mailto link remains */ }
  });
});

/* ---------- portrait swap & memoji wave ---------- */
$$<HTMLButtonElement>("[data-portrait]").forEach((btn) =>
  btn.addEventListener("click", () => btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"))),
);
$$<HTMLButtonElement>("[data-memoji]").forEach((btn) => {
  const wave = () => {
    btn.classList.remove("is-waving");
    void btn.offsetWidth; // restart the animation
    btn.classList.add("is-waving");
    clearTimeout(Number(btn.dataset.t));
    btn.dataset.t = String(setTimeout(() => btn.classList.remove("is-waving"), 1800));
  };
  btn.addEventListener("click", wave);
  if (!reduce) setTimeout(wave, root.classList.contains("is-splash") ? 2300 : 900);
  if (finePointer && !reduce) {
    addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      btn.style.setProperty("--ry", `${(dx * 40).toFixed(2)}deg`);
      btn.style.setProperty("--rx", `${(-dy * 30).toFixed(2)}deg`);
    }, { passive: true });
  }
});

/* ---------- RotatingText: per-character spring between words ---------- */
$$("[data-rotator]").forEach((el) => {
  const words: string[] = JSON.parse(el.dataset.rotator ?? "[]");
  if (reduce || words.length < 2) return;
  let i = 0;
  const spring = "cubic-bezier(.34,1.45,.64,1)";
  const measure = (w: string) => {
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    probe.textContent = w;
    el.append(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width;
  };
  el.style.width = `${el.getBoundingClientRect().width}px`;
  const swap = () => {
    if (document.hidden) return;
    const old = [...el.querySelectorAll<HTMLElement>(".ch")];
    old.forEach((c, n) => c.animate([{ transform: "none", opacity: 1 }, { transform: "translateY(-110%)", opacity: 0 }], { duration: 320, delay: n * 12, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" }));
    const exit = 320 + old.length * 12;
    setTimeout(() => {
      i = (i + 1) % words.length;
      const next = words[i] ?? "";
      el.style.width = `${measure(next)}px`;
      el.replaceChildren(...[...next].map((ch, n) => {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = ch;
        s.animate([{ transform: "translateY(105%)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 560, delay: n * 18, easing: spring, fill: "backwards" });
        return s;
      }));
    }, exit - 80);
  };
  setInterval(swap, 2600);
});

/* ---------- SpotlightCard: radial light follows the pointer ---------- */
if (finePointer) {
  $$("[data-spotlight]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  });
}

/* ---------- Magnet: buttons lean toward the pointer ---------- */
if (finePointer && !reduce) {
  $$("[data-magnet]").forEach((el) => {
    const pad = 40;
    let raf = 0;
    addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const near = Math.abs(e.clientX - cx) < r.width / 2 + pad && Math.abs(e.clientY - cy) < r.height / 2 + pad;
        el.style.translate = near ? `${((e.clientX - cx) / 5).toFixed(1)}px ${((e.clientY - cy) / 5).toFixed(1)}px` : "0 0";
      });
    }, { passive: true });
    el.style.transition = "translate .45s cubic-bezier(.16,1,.3,1), background-color .25s, transform .35s cubic-bezier(.34,1.4,.64,1)";
  });
}

/* ---------- TextPressure (404): weight follows the pointer ---------- */
$$("[data-pressure]").forEach((title) => {
  if (reduce) return;
  const chars = [...title.querySelectorAll<HTMLElement>("span")];
  const target = { x: innerWidth / 2, y: innerHeight / 2 }, cur = { ...target };
  const move = (x: number, y: number) => { target.x = x; target.y = y; };
  addEventListener("pointermove", (e) => move(e.clientX, e.clientY), { passive: true });
  addEventListener("touchmove", (e) => { const t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
  const tick = () => {
    cur.x += (target.x - cur.x) / 12;
    cur.y += (target.y - cur.y) / 12;
    const max = title.getBoundingClientRect().width / 1.6;
    chars.forEach((c) => {
      const r = c.getBoundingClientRect();
      const d = Math.hypot(cur.x - (r.left + r.width / 2), cur.y - (r.top + r.height / 2));
      c.style.fontWeight = String(Math.round(Math.max(150, 900 - (750 * d) / max)));
    });
    requestAnimationFrame(tick);
  };
  tick();
});
const path404 = document.querySelector("[data-404-path]");
if (path404) path404.textContent = location.pathname.slice(0, 48);

/* ---------- Aurora backdrop (WebGL), after load so it never competes with LCP ---------- */
// Desktop-class devices only: phones keep the CSS gradient, which costs nothing on the main thread.
function mountAurora() {
  const box = document.querySelector<HTMLElement>("[data-aurora]");
  if (!box || reduce || saveData || !finePointer || navigator.hardwareConcurrency < 4) return;
  import("./aurora").then((m) => m.mount(box, finePointer)).catch(() => { /* static gradient stays */ });
}
if (document.readyState === "complete") idle(mountAurora);
else addEventListener("load", () => idle(mountAurora), { once: true });

/* ---------- page transition ---------- */
if (!reduce) {
  const routeLabel = document.querySelector("[data-curtain-route]");
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.("a");
    if (!a || a.target || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /\.(pdf|txt|xml|json)$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    if (routeLabel) routeLabel.textContent = a.textContent?.trim() || url.pathname;
    root.classList.add("is-leaving");
    try { sessionStorage.setItem("jr-nav", "1"); } catch { /* private mode */ }
    setTimeout(() => location.assign(url.href), 340);
  });
}

/* ---------- scroll choreography (GSAP + Lenis), loaded after first paint ---------- */
if (!reduce) idle(() => { import("./motion").then((m) => m.init(finePointer)); });
