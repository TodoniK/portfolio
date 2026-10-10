// Core interactions. Everything is progressive: the site works fully without it.
// Several pieces are vanilla ports of React Bits components (TargetCursor, RotatingText, TextPressure,
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
// IntersectionObserver rather than animation-timeline: the CSS minifier folds view() into the
// animation shorthand, which Chrome rejects.
{
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
    { rootMargin: "0px 0px -6% 0px" },
  );
  $$(".reveal").forEach((el, i) => { el.style.setProperty("--d", `${(i % 3) * 70}ms`); io.observe(el); });
}

/* ---------- header turns dark over dark sections ---------- */
{
  const darks = $$(".dark");
  const under = new Set<Element>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)));
    root.classList.toggle("header-dark", under.size > 0);
  }, { rootMargin: "0px 0px -94% 0px" });
  darks.forEach((d) => io.observe(d));
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

/* ---------- background videos ---------- */
function mountVideos() {
  if (reduce || saveData) return;
  $$("[data-bgvideo]").forEach((box) => {
    const tpl = box.querySelector<HTMLTemplateElement>("template[data-sources]");
    if (!tpl) return;
    const video = document.createElement("video");
    Object.assign(video, { muted: true, loop: true, playsInline: true, preload: "metadata" });
    video.setAttribute("aria-hidden", "true");
    video.append(tpl.content.cloneNode(true));
    box.querySelector("picture")?.after(video);
    let userPaused = false;
    const btn = box.querySelector<HTMLButtonElement>("[data-video-toggle]");
    video.addEventListener("playing", () => video.classList.add("is-playing"), { once: true });
    new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !userPaused) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 }).observe(box);
    if (btn) {
      btn.hidden = false;
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => {
        userPaused = !userPaused;
        if (userPaused) video.pause(); else video.play().catch(() => {});
        btn.setAttribute("aria-pressed", String(userPaused));
        btn.setAttribute("aria-label", (userPaused ? btn.dataset.labelPlay : btn.dataset.labelPause) ?? "");
      });
    }
  });
}
if (document.readyState === "complete") idle(mountVideos);
else addEventListener("load", () => idle(mountVideos), { once: true });

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

/* ---------- TargetCursor: corner brackets that lock onto interactive targets ---------- */
if (finePointer && !reduce) initTargetCursor();

function initTargetCursor() {
  const el = document.querySelector<HTMLElement>(".tcursor");
  if (!el) return;
  const corners = [...el.querySelectorAll<HTMLElement>(".corner")];
  const dot = el.querySelector<HTMLElement>(".dot")!;
  const label = el.querySelector<HTMLElement>(".label")!;
  root.classList.add("has-cursor");
  type S = { x: number; v: number };
  const S = (x = 0): S => ({ x, v: 0 });
  // semi-implicit spring step, two sub-steps for stability (same model as React Bits)
  const step = (s: S, goal: number, k: number, c: number, dt: number) => {
    for (let n = 0, h = dt / 2; n < 2; n++) { s.v += (k * (goal - s.x) - c * s.v) * h; s.x += s.v * h; }
  };
  const SIZE = 36, CORNER = 12, PAD = 8, QUARTER = Math.PI / 2, ANG = [0, 90, 180, 270];
  const p = { x: innerWidth / 2, y: innerHeight / 2, inside: false, seen: false, pressed: false };
  const cx = S(), cy = S(), hw = S(SIZE / 2), hh = S(SIZE / 2), rad = S(), turn = S(), lock = S(), press = S(), pres = S();
  let target: Element | null = null, tRadius = 0, quarter = 0, spin = 0, raf = 0, last = 0, lastLabel = "";
  const snapW = 4.6 / 0.22, snapK = snapW * snapW, snapC = 2 * 0.62 * snapW;
  const SEL = "a, button, summary, label, [role='button']";
  const find = (node: Element | null) => node?.closest("[data-cursor-target]") ?? node?.closest(SEL) ?? null;
  const lockOn = (next: Element | null) => {
    if (next === target) return;
    target = next;
    if (target) { quarter = Math.round(turn.x / QUARTER); tRadius = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0; spin = 0; }
  };
  const frame = (now: number) => {
    raf = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    if (target && !target.isConnected) lockOn(null);
    const rect = target?.getBoundingClientRect();
    const locked = Boolean(rect) && p.inside;
    step(pres, p.inside ? 1 : 0, 260, 32, dt);
    step(lock, locked ? 1 : 0, snapK, 2 * snapW, dt);
    step(press, p.pressed ? 1 : 0, 900, 40, dt);
    let gx = p.x, gy = p.y, gw = SIZE / 2, gh = SIZE / 2, gr = 2;
    if (rect && locked) {
      const mx = rect.left + rect.width / 2, my = rect.top + rect.height / 2;
      gx = mx + (p.x - mx) * 0.08; gy = my + (p.y - my) * 0.08;
      const odd = Math.abs(quarter) % 2 === 1, w = rect.width / 2 + PAD, h = rect.height / 2 + PAD;
      gw = odd ? h : w; gh = odd ? w : h;
      gr = Math.min(tRadius + PAD, CORNER);
    }
    if (!p.seen) { cx.x = gx; cy.x = gy; hw.x = gw; hh.x = gh; p.seen = p.inside; }
    const follow = locked ? snapK : 2200, followC = locked ? snapC : 2 * Math.sqrt(2200);
    step(cx, gx, follow, followC, dt); step(cy, gy, follow, followC, dt);
    step(hw, gw, snapK, snapC, dt); step(hh, gh, snapK, snapC, dt); step(rad, gr, snapK, 2 * snapW, dt);
    if (locked) step(turn, quarter * QUARTER, snapK, snapC, dt);
    else { const speed = reduce ? 0 : (Math.PI * 2) / 2.4; spin += (speed - spin) * (1 - Math.exp(-dt * 3)); turn.v = spin; turn.x += spin * dt; }
    const sq = 1 - press.x * 0.14, cos = Math.cos(turn.x), sin = Math.sin(turn.x);
    const w = Math.max(0, hw.x) * sq, h = Math.max(0, hh.x) * sq;
    const local = [[-w, -h], [w, -h], [w, h], [-w, h]] as const;
    const r = Math.max(0, Math.min(rad.x, CORNER)), deg = (turn.x * 180) / Math.PI;
    let left = Infinity, top = Infinity;
    corners.forEach((c, n) => {
      const [lx, ly] = local[n]!;
      const x = cx.x + lx * cos - ly * sin, y = cy.x + lx * sin + ly * cos;
      left = Math.min(left, x); top = Math.min(top, y);
      c.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${(ANG[n]! + deg).toFixed(2)}deg)`;
      c.style.borderTopLeftRadius = `${r.toFixed(2)}px`;
    });
    dot.style.transform = `translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%) scale(${(1 - press.x * 0.35).toFixed(3)})`;
    const text = target?.getAttribute("data-cursor-label") ?? "";
    if (text && text !== lastLabel) { label.textContent = text; lastLabel = text; }
    const shown = text ? Math.max(0, Math.min(1, lock.x)) : 0;
    label.style.transform = `translate3d(${left.toFixed(2)}px,${(top - 8).toFixed(2)}px,0) translateY(-100%) translateY(${((1 - shown) * 4).toFixed(2)}px)`;
    label.style.opacity = shown.toFixed(3);
    el.style.opacity = Math.max(0, Math.min(1, pres.x)).toFixed(3);
    const resting = !p.inside && pres.x < 0.002 && Math.abs(pres.v) < 0.002;
    if (!resting) raf = requestAnimationFrame(frame);
    else last = 0;
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const setInside = (v: boolean) => { p.inside = v; root.classList.toggle("cursor-in", v); };
  addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    p.x = e.clientX; p.y = e.clientY;
    if (!p.inside) setInside(true);
    lockOn(find(e.target as Element));
    wake();
  }, { passive: true });
  addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse") { p.pressed = true; wake(); } }, { passive: true });
  addEventListener("pointerup", () => { p.pressed = false; wake(); }, { passive: true });
  addEventListener("scroll", () => { if (p.inside) { lockOn(find(document.elementFromPoint(p.x, p.y))); wake(); } }, { passive: true, capture: true });
  const leave = () => { setInside(false); p.pressed = false; p.seen = false; lockOn(null); wake(); };
  root.addEventListener("pointerleave", leave);
  addEventListener("blur", leave);
}

/* ---------- scroll choreography (GSAP + Lenis), loaded after first paint ---------- */
if (!reduce) idle(() => { import("./motion").then((m) => m.init(finePointer)); });
