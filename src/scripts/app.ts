// Core interactions. Everything here is progressive: the site works fully without it.
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
type NetInfo = { saveData?: boolean };
const saveData = Boolean((navigator as Navigator & { connection?: NetInfo }).connection?.saveData);
const idle = (fn: () => void) => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));

/* ---------- splash & arrival curtain cleanup ---------- */
if (root.classList.contains("is-splash")) setTimeout(() => root.classList.remove("is-splash"), 1600);
if (root.classList.contains("is-arriving")) setTimeout(() => root.classList.remove("is-arriving"), 650);
addEventListener("pageshow", (e) => { if (e.persisted) root.classList.remove("is-leaving", "is-arriving"); });

/* ---------- section state: pending → healthy ---------- */
const liveIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-live"); liveIO.unobserve(e.target); } }),
  { rootMargin: "0px 0px -15% 0px" },
);
document.querySelectorAll("[data-live]").forEach((el) => liveIO.observe(el));

/* ---------- reveal fallback when CSS scroll-driven animations are missing ---------- */
if (!CSS.supports("animation-timeline: view()")) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- copy e-mail ---------- */
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
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

/* ---------- portrait wave (hover on fine pointers, tap everywhere) ---------- */
document.querySelectorAll<HTMLButtonElement>("[data-portrait]").forEach((btn) => {
  btn.addEventListener("click", () => btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true")));
});

/* ---------- background videos ---------- */
function mountVideos() {
  if (reduce || saveData) return;
  document.querySelectorAll<HTMLElement>("[data-bgvideo]").forEach((box) => {
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
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !userPaused) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 });
    io.observe(box);
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

/* ---------- page transition curtain ---------- */
if (!reduce) {
  const routeLabel = document.querySelector("[data-curtain-route]");
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.("a");
    if (!a || a.target || a.hasAttribute("download") || a.getAttribute("rel")?.includes("external")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /\.(pdf|txt|xml|json)$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash
    e.preventDefault();
    if (routeLabel) routeLabel.textContent = url.pathname;
    root.classList.add("is-leaving");
    try { sessionStorage.setItem("jr-nav", "1"); } catch { /* private mode */ }
    setTimeout(() => location.assign(url.href), 380);
  });
}

/* ---------- custom cursor ---------- */
if (finePointer && !reduce) {
  const cursor = document.querySelector<HTMLElement>(".cursor");
  const dot = cursor?.querySelector<HTMLElement>(".dot");
  const ring = cursor?.querySelector<HTMLElement>(".ring");
  if (cursor && dot && ring) {
    root.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, vx = 0, vy = 0, raf = 0;
    // critically-damped-ish spring for the ring, dot follows the pointer exactly
    const tick = () => {
      const k = 0.18, d = 0.62;
      vx = (vx + (x - rx) * k) * d; vy = (vy + (y - ry) * k) * d;
      rx += vx; ry += vy;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor.classList.remove("is-hidden");
      if (!raf) raf = requestAnimationFrame(tick);
      const t = e.target as Element;
      cursor.classList.toggle("is-card", Boolean(t.closest?.("[data-cursor='card']")));
      cursor.classList.toggle("is-link", Boolean(t.closest?.("a, button, summary, label, [role='button']")));
    }, { passive: true });
    document.addEventListener("pointerleave", () => cursor.classList.add("is-hidden"));
    addEventListener("pointerdown", () => ring.animate([{ scale: 1 }, { scale: 0.82 }, { scale: 1 }], { duration: 360, easing: "cubic-bezier(.34,1.56,.64,1)" }));
  }
}

/* ---------- scroll choreography (GSAP + Lenis), loaded after first paint ---------- */
if (!reduce) idle(() => { import("./motion").then((m) => m.init(finePointer)); });

/* ---------- 404: echo the requested path in the traceroute ---------- */
const tracePath = document.querySelector(".nf .path");
if (tracePath) tracePath.textContent = ` ${location.pathname.slice(0, 40)}`;
