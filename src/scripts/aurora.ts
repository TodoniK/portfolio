// Vanilla WebGL2 port of React Bits "Aurora" (shader kept as upstream, light mode and React glue removed).
// Loaded lazily by app.ts only when motion is allowed and Save-Data is off.
const STOPS = ["#0090f7", "#ba62fc", "#f2416b"];
const SETTINGS = { amplitude: 1, blend: 0.55, height: 0.42, scale: 1, glow: 0.6, brightness: 0.85, layers: 2, speed: 0.6, opacity: 0.7 };
const RESOLUTION = 0.6; // the effect is a soft gradient: rendering below CSS size is invisible and much cheaper
const INTRO_SECONDS = 2.4;

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uStops[3];
uniform float uAmplitude, uBlend, uHeight, uScale, uGlow, uBrightness, uReveal, uOpacity;
uniform int uLayers;
uniform vec3 uPointer;
out vec4 outColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float smootherstep(float e0, float e1, float x) {
  float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
vec3 oklabToLinear(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 toSrgb(vec3 c) { c = clamp(c, 0.0, 1.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
vec3 ramp(float t) {
  float x = clamp(t, 0.0, 1.0) * 2.0;
  int i = int(min(floor(x), 1.0));
  float f = x - float(i);
  f = f * f * (3.0 - 2.0 * f);
  vec3 lch = mix(uStops[i], uStops[i + 1], f);
  return toSrgb(oklabToLinear(vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z))));
}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  float y = 1.0 - frag.y / uResolution.y;
  float u = frag.x / uResolution.x;
  float X = (frag.x - uResolution.x * 0.5) / uResolution.y;
  float t = uTime;
  float reach = uPointer.z * exp(-pow((X - uPointer.x) / 0.38, 2.0));
  vec3 glow = vec3(0.0);
  float cover = 0.0;
  for (int k = 0; k < 3; k++) {
    if (k >= uLayers) break;
    float layer = float(k);
    float seed = layer * 13.7;
    float pace = t * (1.0 - layer * 0.18);
    float warp = snoise(vec2(X * 0.45 * uScale + pace * 0.02 + seed, pace * 0.05 + seed));
    float wave = snoise(vec2(X * 0.75 * uScale + warp * 0.35 - pace * 0.03 + seed, pace * 0.07 - seed)) * 0.72
      + snoise(vec2(X * 1.6 * uScale + warp * 0.5 + pace * 0.04 - seed, pace * 0.1 + seed * 0.5)) * 0.28;
    float hem = uHeight + layer * 0.07 + wave * 0.15 * uAmplitude;
    hem += reach * 0.08 * (layer < 0.5 ? 1.0 : 0.4);
    hem = mix(-0.25, hem, uReveal);
    float soft = (0.04 + uBlend * 0.16) * (1.0 + layer * 0.9);
    float rise = hem - y;
    float body = pow(smootherstep(-soft - uGlow * 0.14, 0.26 + soft * 0.6, rise), 1.5 + uGlow * 0.6);
    float lobes = 0.86 + 0.14 * snoise(vec2(X * 0.9 * uScale - pace * 0.025 + seed, y * 0.3 + pace * 0.04));
    float alpha = body * lobes * (layer < 0.5 ? 1.0 : 0.32 / layer);
    alpha = clamp(alpha * (1.0 + reach * 0.25 * smootherstep(0.9, 0.0, abs(y - hem))), 0.0, 1.0);
    vec3 tint = ramp(u + 0.05 * sin(pace * 0.08 + layer * 2.3) + layer * 0.1 + max(rise, 0.0) * 0.05);
    glow = 1.0 - (1.0 - glow) * (1.0 - tint * alpha);
    cover = 1.0 - (1.0 - cover) * (1.0 - alpha);
  }
  float fade = smootherstep(0.0, 0.7, uReveal) * uOpacity;
  float strength = clamp(uBrightness, 0.0, 2.0);
  glow *= fade * min(strength, 1.0);
  cover *= fade * min(strength, 1.0);
  glow = 1.0 - pow(1.0 - glow, vec3(max(strength, 1.0)));
  float dither = (hash(frag) - 0.5) / 255.0;
  outColor = vec4(glow + dither, clamp(cover + dither, 0.0, 1.0));
}`;

const hexToOklch = (hex: string): number[] => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, Math.hypot(a, bb), Math.atan2(bb, a)];
};

/** Unwrap hues so the ramp takes the short way round the colour wheel. */
function palette(): Float32Array {
  let prev = 0;
  const out = new Float32Array(9);
  STOPS.map(hexToOklch).forEach(([L, C, h], i) => {
    let hue = h!;
    if (i > 0) { while (hue - prev > Math.PI) hue -= Math.PI * 2; while (hue - prev < -Math.PI) hue += Math.PI * 2; }
    prev = hue;
    out.set([L!, C!, hue], i * 3);
  });
  return out;
}

/** Compiles without blocking the main thread when KHR_parallel_shader_compile is available. */
async function program(gl: WebGL2RenderingContext) {
  const parallel = gl.getExtension("KHR_parallel_shader_compile");
  const p = gl.createProgram();
  for (const [type, src] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    gl.attachShader(p, s);
    gl.deleteShader(s);
  }
  gl.bindAttribLocation(p, 0, "aPosition");
  gl.linkProgram(p);
  if (parallel) while (!gl.isContextLost() && !gl.getProgramParameter(p, parallel.COMPLETION_STATUS_KHR)) await new Promise(requestAnimationFrame);
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
}

/** Software rasterisers (SwiftShader, llvmpipe) would run the shader on the CPU and freeze the page. */
function isSoftware(gl: WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

export async function mount(box: HTMLElement, interactive: boolean) {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
  const off = (why: string) => { box.dataset.auroraState = why; };
  if (!gl) return off("no-webgl2");
  if (isSoftware(gl)) return off("software");
  const prog = await program(gl);
  if (!prog) return off("shader-error");
  canvas.setAttribute("aria-hidden", "true");
  box.append(canvas);
  const loc = (n: string) => gl.getUniformLocation(prog, n);
  const U = Object.fromEntries(["uResolution", "uTime", "uStops", "uAmplitude", "uBlend", "uHeight", "uScale", "uGlow", "uBrightness", "uReveal", "uOpacity", "uLayers", "uPointer"].map((n) => [n, loc(n)]));
  gl.useProgram(prog);
  gl.bindVertexArray(gl.createVertexArray());
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.uniform3fv(U.uStops!, palette());
  const S = SETTINGS;
  gl.uniform1f(U.uAmplitude!, S.amplitude); gl.uniform1f(U.uBlend!, S.blend); gl.uniform1f(U.uHeight!, S.height);
  gl.uniform1f(U.uScale!, S.scale); gl.uniform1f(U.uGlow!, S.glow); gl.uniform1f(U.uBrightness!, S.brightness);
  gl.uniform1f(U.uOpacity!, S.opacity); gl.uniform1i(U.uLayers!, S.layers);

  const view = { w: 1, h: 1 };
  const pointer = { x: 0, y: 0, inside: false };
  const st = { clock: 0, px: 0, py: 0.5, reach: 0, reveal: 0 };
  let raf = 0, last = 0, visible = true;

  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) { last = 0; return; }
    const dt = last ? Math.min(0.05, Math.max(0.0005, (now - last) / 1000)) : 1 / 60;
    last = now;
    st.clock += dt * S.speed;
    const follow = 1 - Math.exp(-dt / 0.6);
    if (pointer.inside) {
      st.px += ((pointer.x - view.w / 2) / view.h - st.px) * follow;
      st.py += (pointer.y / view.h - st.py) * follow;
    }
    st.reach += ((pointer.inside ? 1 : 0) - st.reach) * (1 - Math.exp(-dt / (pointer.inside ? 0.9 : 1.4)));
    st.reveal = Math.min(1, st.reveal + dt / INTRO_SECONDS);
    gl.uniform1f(U.uTime!, st.clock);
    gl.uniform3f(U.uPointer!, st.px, st.py, st.reach);
    gl.uniform1f(U.uReveal!, 1 - (1 - st.reveal) ** 3);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };
  const resize = () => {
    view.w = Math.max(1, box.clientWidth);
    view.h = Math.max(1, box.clientHeight);
    canvas.width = Math.round(view.w * RESOLUTION);
    canvas.height = Math.round(view.h * RESOLUTION);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.uResolution!, canvas.width, canvas.height);
  };
  new ResizeObserver(resize).observe(box);
  new IntersectionObserver((e) => { visible = e.some((x) => x.isIntersecting); wake(); }).observe(box);
  document.addEventListener("visibilitychange", wake);
  if (interactive) {
    addEventListener("pointermove", (e) => {
      const r = box.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height;
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => { pointer.inside = false; });
  }
  resize();
  wake();
  requestAnimationFrame(() => { box.classList.add("is-live"); off("live"); });
}
