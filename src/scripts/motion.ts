// Scroll choreography. Only loaded when motion is allowed; every effect is decorative.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Wraps words in spans, grouped by three (reads as phrases, not robotic word-by-word). */
/** Keeps the original text for assistive tech in a visually hidden copy; the animated pieces are aria-hidden. */
function srCopy(el: HTMLElement, text: string) {
  const sr = document.createElement("span");
  sr.className = "visually-hidden";
  sr.textContent = text;
  el.append(sr);
}

function splitWords(el: HTMLElement, group = 3) {
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";
  srCopy(el, words.join(" "));
  const spans: HTMLElement[] = [];
  for (let i = 0; i < words.length; i += group) {
    const s = document.createElement("span");
    s.setAttribute("aria-hidden", "true");
    s.className = "w";
    s.textContent = words.slice(i, i + group).join(" ") + " ";
    el.append(s);
    spans.push(s);
  }
  return spans;
}

function splitLines(el: HTMLElement) {
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";
  words.forEach((w, i) => {
    const mask = document.createElement("span");
    mask.className = "mask";
    mask.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "w";
    inner.textContent = w;
    mask.append(inner);
    el.append(mask, i < words.length - 1 ? " " : "");
  });
  srCopy(el, words.join(" "));
  return [...el.querySelectorAll<HTMLElement>(".w")];
}

export function init(finePointer: boolean) {
  if (finePointer) {
    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const mm = gsap.matchMedia();

  /* hero: the name compresses and the video retracts into a frame */
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (hero) {
    const name = hero.querySelector<HTMLElement>("[data-hero-name]");
    const media = hero.querySelector<HTMLElement>("[data-hero-media]");
    const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
    if (name) tl.fromTo(name, { fontStretch: "125%" }, { fontStretch: "62%", ease: "none" }, 0);
    if (media) tl.fromTo(media, { scale: 1, borderRadius: 0 }, { scale: 0.9, borderRadius: 8, ease: "none" }, 0);
    tl.to(hero.querySelectorAll("[data-hero-fade]"), { opacity: 0, y: -40, ease: "none" }, 0);
  }

  /* manifesto: phrase-by-phrase reading, scrubbed */
  document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
    const spans = splitWords(el);
    // colour (not opacity) keeps unread phrases above WCAG AA contrast
    const from = getComputedStyle(el).getPropertyValue("--fg-muted").trim() || "#5c5a54";
    const to = getComputedStyle(el).color;
    gsap.fromTo(spans, { color: from }, {
      color: to, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  });

  /* big headings: words rise from a mask */
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const words = splitLines(el);
    gsap.from(words, { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  /* expertise panels: horizontal pinned track on large screens */
  mm.add("(min-width: 1024px)", () => {
    const sec = document.querySelector<HTMLElement>("[data-hscroll]");
    const track = sec?.querySelector<HTMLElement>("[data-track]");
    if (!sec || !track) return;
    sec.classList.add("is-pinned");
    const dist = () => track.scrollWidth - track.clientWidth;
    gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    return () => sec.classList.remove("is-pinned");
  });

  /* career log: the line draws with progress */
  document.querySelectorAll<HTMLElement>("[data-timeline]").forEach((el) => {
    const line = el.querySelector("[data-line]");
    if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: true } });
  });

  /* metrics count up once */
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const raw = el.textContent ?? "";
    const m = raw.match(/[\d.,]+/);
    if (!m) return;
    const target = parseFloat(m[0].replace(/,/g, ""));
    const decimals = (m[0].split(".")[1] ?? "").length;
    const fmt = (v: number) => raw.replace(m[0], v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
    const o = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(o, { v: target, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => { el.textContent = fmt(o.v); } });
  });

  /* parallax on tagged media */
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
