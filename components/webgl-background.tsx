'use client';

import { useEffect, useRef } from 'react';

/* -------------------------------------------------------------------------- */
/*  Shaders                                                                    */
/* -------------------------------------------------------------------------- */

const VERT = /* glsl */ `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

/**
 * Domain-warped fBm noise rendered as isocontour lines.
 * Three uniforms drive the scroll reaction:
 *   u_scroll  – normalised page position [0, 1]
 *   u_vel     – instantaneous scroll speed (decays to 0)
 *   u_dark    – 1.0 in dark mode, 0.0 in light mode
 */
const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  u_res;
  uniform float u_time;
  uniform float u_scroll;
  uniform float u_vel;
  uniform float u_dark;

  /* ---- helpers ---- */
  mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  /* Value noise with smooth interpolation */
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  /* Fractal Brownian motion — 6 octaves */
  float fbm(vec2 p) {
    float v   = 0.0;
    float amp = 0.52;
    for (int i = 0; i < 6; i++) {
      v   += amp * vnoise(p);
      p    = rot2(0.44) * p * 2.07;
      amp *= 0.47;
    }
    return v;
  }

  void main() {
    vec2 uv     = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;

    /* Centre and apply aspect ratio */
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.8;

    /* --- Scroll reaction --- */
    /* Translate the noise space upward as we scroll down the page */
    p.y += u_scroll * 1.6;
    /* Scroll velocity adds a brief vertical warp */
    p.y += u_vel * 0.55;

    /* Slow ambient drift so the canvas is never static */
    p += vec2(u_time * 0.018, u_time * 0.012);

    /* --- Domain warping (two levels) --- */
    vec2 q = vec2(
      fbm(p + vec2(0.0,  0.0)  + 0.07 * u_time),
      fbm(p + vec2(5.24, 1.31) + 0.06 * u_time)
    );

    vec2 r = vec2(
      fbm(p + 1.5 * q + vec2(1.71, 9.23) + 0.10 * u_time),
      fbm(p + 1.5 * q + vec2(8.30, 2.84) + 0.09 * u_time)
    );

    float f = fbm(p + 1.5 * r);

    /* --- Isocontour lines --- */
    /* Sharp ridges — pow(12) keeps lines crisp but visible */
    float lines = abs(sin(f * 10.0 - u_time * 0.12));
    lines = pow(lines, 12.0);

    /* Broad luminous glow beneath the lines */
    float glow = (1.0 - smoothstep(0.0, 0.28, abs(f - 0.5))) * 0.04;

    /* Fade edges so the canvas blends smoothly into the page background */
    float edgeFade = smoothstep(0.0, 0.10, uv.y) *
                     smoothstep(0.0, 0.10, 1.0 - uv.y) *
                     smoothstep(0.0, 0.05, uv.x) *
                     smoothstep(0.0, 0.05, 1.0 - uv.x);

    float alpha = (lines * 0.11 + glow) * edgeFade;

    /* Ink colour — adapts to dark / light mode */
    vec3 col = mix(vec3(0.04), vec3(0.94), u_dark);

    gl_FragColor = vec4(col, alpha);
  }
`;

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Prefer WebGL2, fall back to WebGL1 */
    const gl = (
      canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false }) ??
      canvas.getContext('webgl',  { alpha: true, premultipliedAlpha: false })
    ) as WebGLRenderingContext | null;
    if (!gl) return;

    /* Build program */
    const vert = compileShader(gl, gl.VERTEX_SHADER,   VERT);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    /* Full-screen triangle strip */
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* Uniform locations */
    const uRes    = gl.getUniformLocation(prog, 'u_res');
    const uTime   = gl.getUniformLocation(prog, 'u_time');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');
    const uVel    = gl.getUniformLocation(prog, 'u_vel');
    const uDark   = gl.getUniformLocation(prog, 'u_dark');

    /* Blending */
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    /* Mutable state */
    let scrollTarget  = 0;
    let scrollCurrent = 0;
    let scrollVel     = 0;
    let lastScrollY   = window.scrollY;
    let rafId         = 0;
    const t0          = performance.now();

    /* Resize handler — respects device pixel ratio (cap at 2× for perf) */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w   = window.innerWidth;
      const h   = window.innerHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    /* Scroll handler — computes normalised position + instantaneous velocity */
    function onScroll() {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollTarget    = window.scrollY / maxScroll;
      scrollVel       = (window.scrollY - lastScrollY) / maxScroll;
      lastScrollY     = window.scrollY;
    }

    /* Detect dark mode */
    function darkMode() {
      return document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
    }

    /* Render loop */
    function render() {
      /* Smooth scroll interpolation so snap-jumps animate gracefully */
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.045;
      /* Velocity decays between scroll events */
      scrollVel *= 0.88;

      const t = (performance.now() - t0) / 1000;

      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform2f(uRes,    canvas!.width, canvas!.height);
      gl!.uniform1f(uTime,   t);
      gl!.uniform1f(uScroll, scrollCurrent);
      gl!.uniform1f(uVel,    scrollVel);
      gl!.uniform1f(uDark,   darkMode());

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(render);
    }

    /* Observe theme class changes (dark ↔ light toggle) */
    const mo = new MutationObserver(() => { /* darkMode() reads live */ });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    /* Observe container resize */
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    /* Respect prefers-reduced-motion */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;          // skip entirely if user opted out

    resize();
    onScroll();
    render();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      mo.disconnect();
      gl?.deleteProgram(prog);
      gl?.deleteShader(vert);
      gl?.deleteShader(frag);
      gl?.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
