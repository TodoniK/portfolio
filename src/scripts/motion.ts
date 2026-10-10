// Scroll choreography. Only loaded when motion is allowed; every effect is decorative.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** The original text stays readable by assistive tech; animated pieces are aria-hidden. */
function srCopy(el: HTMLElement, text: string) {
  const sr = document.createElement("span");
  sr.className = "visually-hidden";
  sr.textContent = text;
  el.append(sr);
}

function split(el: HTMLElement, group: number, masked: boolean) {
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";
  const out: HTMLElement[] = [];
  for (let i = 0; i < words.length; i += group) {
    const w = document.createElement("span");
    w.className = "w";
    w.textContent = words.slice(i, i + group).join(" ");
    let node: HTMLElement = w;
    if (masked) { node = document.createElement("span"); node.className = "mask"; node.append(w); }
    node.setAttribute("aria-hidden", "true");
    el.append(node, " ");
    out.push(w);
  }
  srCopy(el, words.join(" "));
  return out;
}

export function init(finePointer: boolean) {
  let velocity = 0;
  if (finePointer) {
    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    lenis.on("scroll", (l: Lenis) => { velocity = l.velocity; ScrollTrigger.update(); });
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    ScrollTrigger.create({ onUpdate: (s) => { velocity = s.getVelocity() / 60; } });
  }
  const mm = gsap.matchMedia();

  /* hero: text drifts away, the screen grows into place (Apple-style) */
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (hero) {
    const inner = hero.querySelector(".hero-inner");
    const screen = hero.querySelector<HTMLElement>("[data-hero-media]");
    if (inner) gsap.to(inner, { yPercent: -18, opacity: 0, filter: "blur(6px)", ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "45% top", scrub: true } });
    if (screen) gsap.fromTo(screen, { scale: 0.86, borderRadius: 48 }, { scale: 1, borderRadius: 24, ease: "none", scrollTrigger: { trigger: screen, start: "top bottom", end: "top 18%", scrub: true } });
  }

  /* ScrollVelocity: rows drift and speed up with scroll velocity */
  const rows = [...document.querySelectorAll<HTMLElement>("[data-velocity]")];
  if (rows.length) {
    document.documentElement.classList.add("js-velocity");
    const state = rows.map((row) => ({ track: row.querySelector<HTMLElement>(".track")!, dir: Number(row.dataset.velocity), x: 0, flip: 1 }));
    let smooth = 0;
    gsap.ticker.add((_, dt) => {
      smooth += (velocity - smooth) * 0.08;
      const factor = Math.min(6, Math.abs(smooth) / 6);
      state.forEach((s) => {
        if (smooth > 0.5) s.flip = 1; else if (smooth < -0.5) s.flip = -1;
        const w = s.track.scrollWidth / 4;
        s.x -= s.dir * s.flip * (60 + 60 * factor) * (dt / 1000);
        s.x = ((s.x % w) - w) % w;
        s.track.style.transform = `translate3d(${s.x.toFixed(1)}px,0,0)`;
      });
    });
  }

  /* manifesto: phrases light up as you read (colour, not opacity, keeps contrast AA) */
  document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
    const spans = split(el, 3, false);
    gsap.fromTo(spans, { color: "#86868b" }, { color: getComputedStyle(el).color, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true } });
  });

  /* headings: words rise from a mask */
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const words = split(el, 1, true);
    gsap.from(words, { yPercent: 110, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  /* expertise: pinned horizontal track on large screens */
  mm.add("(min-width: 1024px)", () => {
    const sec = document.querySelector<HTMLElement>("[data-hscroll]");
    const track = sec?.querySelector<HTMLElement>("[data-track]");
    if (!sec || !track) return;
    sec.classList.add("is-pinned");
    const dist = () => track.scrollWidth - track.clientWidth;
    gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
    return () => sec.classList.remove("is-pinned");
  });

  /* career log: the line draws with progress */
  document.querySelectorAll<HTMLElement>("[data-timeline]").forEach((el) => {
    const line = el.querySelector("[data-line]");
    if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: true } });
  });

  /* CountUp: metrics count once */
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const raw = el.textContent ?? "";
    const m = raw.match(/[\d.,]+/);
    if (!m) return;
    const target = parseFloat(m[0].replace(/,/g, ""));
    const decimals = (m[0].split(".")[1] ?? "").length;
    const fmt = (v: number) => raw.replace(m[0], v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
    const o = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(o, { v: target, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%" }, onUpdate: () => { el.textContent = fmt(o.v); } });
  });

  /* case study cover grows into place */
  document.querySelectorAll<HTMLElement>("[data-cover]").forEach((el) => {
    gsap.fromTo(el, { scale: 0.94 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 25%", scrub: true } });
  });

  addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
