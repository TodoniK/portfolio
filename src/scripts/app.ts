// Core interactions. Everything is progressive: the site works fully without it.
// Several pieces are vanilla ports of React Bits components (Aurora, RotatingText, TextPressure,
// SpotlightCard, Magnet) so the site ships no React runtime.
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
const idle = (fn: () => void) => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

/* ---------- splash cleanup ---------- */
if (root.classList.contains("is-splash")) setTimeout(() => root.classList.remove("is-splash"), 1400);

/* ---------- theme: follows the system until the visitor picks one (applied before paint in Base.astro) ---------- */
const themeBtn = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const systemDark = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => (root.dataset.theme ?? (systemDark.matches ? "dark" : "light")) === "dark";
const syncTheme = () => {
  themeBtn?.setAttribute("aria-pressed", String(isDark()));
  $$<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => { m.content = isDark() ? "#0a0a0b" : "#fbfbfd"; });
};
syncTheme();
systemDark.addEventListener("change", syncTheme);
themeBtn?.addEventListener("click", () => {
  const apply = () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("jr-theme", root.dataset.theme); } catch { /* private mode: choice lasts for the page */ }
    syncTheme();
  };
  if (reduce || !document.startViewTransition) apply();
  else document.startViewTransition(apply);
});

/* ---------- language: remember explicit choices, suggest the browser's language once ---------- */
// Suggestion only, never a redirect: crawlers and shared links keep the URL's language.
const LANG_KEY = "jr-lang";
document.addEventListener("click", (e) => {
  const a = (e.target as Element).closest?.<HTMLElement>("[data-lang]");
  if (a) try { localStorage.setItem(LANG_KEY, a.dataset.lang ?? ""); } catch { /* private mode */ }
});
try {
  if (!localStorage.getItem(LANG_KEY)) {
    const offered = $$("[data-suggest]").map((el) => el.dataset.suggest);
    const want = navigator.languages.map((l) => l.slice(0, 2).toLowerCase()).find((l) => l === root.lang || offered.includes(l));
    const banner = want && want !== root.lang ? document.querySelector<HTMLElement>(`[data-suggest="${want}"]`) : null;
    if (banner) {
      banner.hidden = false;
      banner.querySelector("[data-suggest-close]")?.addEventListener("click", () => {
        banner.hidden = true;
        try { localStorage.setItem(LANG_KEY, root.lang); } catch { /* private mode */ }
      });
    }
  }
} catch { /* storage blocked: no suggestion */ }

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
  // headings: words rise from a mask, once (port of the former GSAP effect)
  $$("[data-split]").forEach((el) => {
    const words = (el.textContent ?? "").trim().split(/\s+/);
    el.replaceChildren(...words.flatMap((w, n) => {
      const mask = document.createElement("span");
      mask.className = "mask";
      mask.setAttribute("aria-hidden", "true");
      const s = document.createElement("span");
      s.className = "w";
      s.textContent = w;
      s.style.setProperty("--n", String(n));
      mask.append(s);
      return n ? [" ", mask] : [mask];
    }));
    const sr = document.createElement("span");
    sr.className = "visually-hidden";
    sr.textContent = words.join(" ");
    el.append(sr);
  });
  const pending = $$(".reveal, [data-split]").filter((el) => el.getBoundingClientRect().top >= innerHeight);
  pending.forEach((el, i) => {
    el.classList.add("is-pending");
    if (el.classList.contains("reveal")) el.style.setProperty("--d", `${(i % 3) * 70}ms`);
    io.observe(el);
  });

  // CountUp: metrics count once when they come into view
  const counter = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counter.unobserve(e.target);
    const el = e.target as HTMLElement, raw = el.dataset.raw ?? "";
    const m = raw.match(/[\d.,]+/)!;
    const target = parseFloat(m[0].replace(/,/g, "")), decimals = (m[0].split(".")[1] ?? "").length;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1800), v = target * (1 - 2 ** (-10 * k));
      el.textContent = raw.replace(m[0], (k === 1 ? target : v).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), { rootMargin: "0px 0px -8% 0px" });
  $$("[data-count]").forEach((el) => {
    const raw = el.textContent ?? "";
    if (!/\d/.test(raw) || el.getBoundingClientRect().top < innerHeight) return;
    el.dataset.raw = raw;
    el.textContent = raw.replace(/[\d.,]+/, (d) => (0).toFixed((d.split(".")[1] ?? "").length));
    counter.observe(el);
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

/* ---------- memoji wave ---------- */
$$<HTMLButtonElement>("[data-memoji]").forEach((btn) => {
  const face = btn.querySelector<HTMLElement>("[data-face]");
  let hide = 0, anim: Animation | undefined;
  const wave = () => {
    btn.classList.add("is-waving");
    clearTimeout(hide);
    hide = window.setTimeout(() => btn.classList.remove("is-waving"), 1800);
    // a wave in progress finishes instead of restarting, so fast clicks never make the face jump
    if (reduce || !face || anim?.playState === "running") return;
    anim = face.animate(
      [{ rotate: "0deg", translate: "0 0" }, { rotate: "-9deg", translate: "0 -8px", offset: 0.2 }, { rotate: "7deg", translate: "0 0", offset: 0.45 }, { rotate: "-4deg", offset: 0.7 }, { rotate: "0deg", translate: "0 0" }],
      { duration: 900, easing: "cubic-bezier(.65,0,.35,1)" },
    );
  };
  btn.addEventListener("click", wave);
  if (!reduce && root.classList.contains("is-intro")) setTimeout(wave, 1600);
  if (finePointer && !reduce) {
    let raf = 0;
    addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        btn.style.setProperty("--ry", `${(dx * 18).toFixed(2)}deg`);
        btn.style.setProperty("--rx", `${(-dy * 14).toFixed(2)}deg`);
      });
    }, { passive: true });
  }
});

/* ---------- RotatingText: per-character spring between words ---------- */
// Each character carries the slice of the gradient matching its position, so WebKit (which only clips a
// background to the element's own glyphs) still shows one continuous gradient across the word.
$$("[data-rotator]").forEach((el) => {
  const words: string[] = JSON.parse(el.dataset.rotator ?? "[]");
  if (reduce || words.length < 2) return;
  let i = 0;
  const spring = "cubic-bezier(.34,1.45,.64,1)";
  const chars = (w: string) => {
    const list = [...w].map((ch) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = ch;
      return s;
    });
    el.replaceChildren(...list);
    const width = el.scrollWidth;
    list.forEach((c) => { c.style.backgroundSize = `${width}px 100%`; c.style.backgroundPositionX = `${-c.offsetLeft}px`; });
    return list;
  };
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
  setInterval(() => {
    if (document.hidden) return;
    const old = el.querySelector(".word") ? chars(words[i] ?? "") : [...el.querySelectorAll<HTMLElement>(".ch")];
    old.forEach((c, n) => c.animate([{ transform: "none", opacity: 1 }, { transform: "translateY(-110%)", opacity: 0 }], { duration: 320, delay: n * 12, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" }));
    setTimeout(() => {
      i = (i + 1) % words.length;
      const next = words[i] ?? "";
      el.style.width = `${measure(next)}px`;
      chars(next).forEach((c, n) => c.animate([{ transform: "translateY(105%)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 560, delay: n * 18, easing: spring, fill: "backwards" }));
    }, 240 + old.length * 12);
  }, 2600);
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
  const magnets = $$("[data-magnet]");
  let raf = 0;
  if (magnets.length) addEventListener("pointermove", (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const pad = 40;
      const rects = magnets.map((el) => el.getBoundingClientRect());
      magnets.forEach((el, n) => {
        const r = rects[n]!, cx = r.left + r.width / 2 - parseFloat(el.dataset.tx ?? "0"), cy = r.top + r.height / 2 - parseFloat(el.dataset.ty ?? "0");
        const near = Math.abs(e.clientX - cx) < r.width / 2 + pad && Math.abs(e.clientY - cy) < r.height / 2 + pad;
        const tx = near ? (e.clientX - cx) / 5 : 0, ty = near ? (e.clientY - cy) / 5 : 0;
        if (tx === parseFloat(el.dataset.tx ?? "0") && ty === parseFloat(el.dataset.ty ?? "0")) return;
        el.dataset.tx = String(tx); el.dataset.ty = String(ty);
        el.style.translate = `${tx.toFixed(1)}px ${ty.toFixed(1)}px`;
      });
    });
  }, { passive: true });
  magnets.forEach((el) => { el.style.transition = "translate .45s cubic-bezier(.16,1,.3,1), background-color .25s, transform .35s cubic-bezier(.34,1.4,.64,1)"; });
}

/* ---------- TextPressure (404): weight follows the pointer ---------- */
$$("[data-pressure]").forEach((title) => {
  if (reduce) return;
  const chars = [...title.querySelectorAll<HTMLElement>("span")];
  const target = { x: innerWidth / 2, y: innerHeight / 2 }, cur = { ...target };
  let running = false;
  const tick = () => {
    cur.x += (target.x - cur.x) / 12;
    cur.y += (target.y - cur.y) / 12;
    const max = title.getBoundingClientRect().width / 1.6;
    const centres = chars.map((c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2] as const; });
    chars.forEach((c, n) => {
      const [x, y] = centres[n]!;
      c.style.fontWeight = String(Math.round(Math.max(150, 900 - (750 * Math.hypot(cur.x - x, cur.y - y)) / max)));
    });
    running = Math.hypot(target.x - cur.x, target.y - cur.y) > 0.5;
    if (running) requestAnimationFrame(tick);
  };
  const move = (x: number, y: number) => {
    target.x = x; target.y = y;
    if (!running) { running = true; requestAnimationFrame(tick); }
  };
  addEventListener("pointermove", (e) => move(e.clientX, e.clientY), { passive: true });
  addEventListener("touchmove", (e) => { const t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
  move(target.x, target.y);
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
