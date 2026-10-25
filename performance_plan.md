# Architectural Performance Optimization Plan: 60fps/120fps PC Smooth Scroll & GSAP Render Loop Fix

> **Target Executor**: Coder Agent (Gemini 3.8 Flash)
> **Project Root**: `C:\omar\UNI\jana\`
> **Objective**: Eliminate PC wheel-scrolling lag/stutter by fixing the Lenis + CSS `scroll-behavior` conflict, eliminating competing GSAP `y` tweens on floating hearts, reducing GPU compositing overhead (`drop-shadow` / `blur`), and enforcing hardware-accelerated `force3D: true` transforms.

---

## Step 1: Fix Lenis Smooth Scroll Integration & CSS Conflict (The Core Issue)

### 1.1 Verify Lenis CDN in `index.html`
- Open `C:\omar\UNI\jana\index.html` and ensure the official Lenis CDN script is loaded before `script.js`:
  ```html
  <script src="https://unpkg.com/@studio-freight/lenis@1.0.39/dist/lenis.min.js"></script>
  ```

### 1.2 Fix Lenis Initialization & GSAP Ticker Sync in `script.js`
- In `C:\omar\UNI\jana\script.js`, initialize Lenis cleanly and sync it strictly with GSAP `ScrollTrigger`:
  ```javascript
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  ```

### 1.3 Eliminate Native `scroll-behavior: smooth` Conflict in `style.css`
- **Root Cause #1 of PC Scroll Lag**: Having `scroll-behavior: smooth;` on `html` causes the browser's native smooth scroll to fight Lenis's per-frame `window.scrollTo` updates on every mouse-wheel tick!
- Remove `scroll-behavior: smooth;` from `html` in `C:\omar\UNI\jana\style.css` and add the standard Lenis CSS rules:
  ```css
  html.lenis,
  html.lenis body {
    height: auto;
    width: 100vw;
    overflow-x: hidden;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }
  ```

---

## Step 2: Optimize GSAP Render Loop, Floating Hearts & GPU Compositing

### 2.1 Reduce Ambient Heart Count & Fix Competing GSAP Tweens (`script.js`)
- **Root Cause #2 of PC Scroll Lag**: In `initAmbientHearts()`, each `.ambient-svg-heart` previously had **two simultaneous GSAP tweens targeting `y` on the same element** (an infinite `repeat: -1, yoyo: true` tween on `y` AND a `ScrollTrigger` `scrub` tween on `y`), causing transform thrashing on every scroll frame.
- Fix in `initAmbientHearts()`:
  1. Cap ambient heart count to **10 on desktop** (`<= 10`) and **5 on mobile** (`window.innerWidth <= 768 ? 5 : 10`), and cap ambient sparkles to **6 on desktop / 3 on mobile**.
  2. Do **NOT** attach per-element `ScrollTrigger` scrub tweens to every individual ambient heart, OR if parallax is used, wrap the inner SVG in `.ambient-heart-inner` so the infinite float animates `yPercent` on the child while any scroll effect only touches the parent container once. Even better: keep the ambient hearts purely on lightweight CSS/GSAP `force3D: true` float without 18 separate `ScrollTrigger` instances recalculating on every wheel tick!

### 2.2 Hardware Acceleration & Compositing Layer Optimization (`style.css` & `script.js`)
- Ensure every animated element (`.ambient-svg-heart`, `.ambient-sparkle`, `.corner-heart-badge`, `.orbit-badge`, `.arch-portrait-img`, `.skill-card`, `.showcase-card`) has:
  ```css
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  ```
- Remove expensive per-frame `filter: drop-shadow(...)` from `.ambient-svg-heart` (SVG gradients already provide 3D depth without forcing GPU rasterization filters on 10+ moving layers).
- Promote `.hero-bg-glow` elements to isolated GPU layers (`transform: translate3d(0, 0, 0); will-change: transform;`) and reduce excessive blur radius from `130px` to `80px` so the browser compositor never drops frames during scroll.
- Throttle or use passive event listeners (`{ passive: true }`) on global `mousemove` / `scroll` listeners, and avoid calling `getBoundingClientRect()` inside `mousemove` without caching or hovering state.
- Force hardware acceleration in all GSAP animations by explicitly setting `force3D: true` in tween parameters.

---

## Step 3: Verify & Push to GitHub

1. Verify that `index.html`, `style.css`, and `script.js` have zero syntax errors and all Lenis + GSAP optimizations are active.
2. Stage, commit, and push all updates from `C:\omar\UNI\jana\`:
   ```powershell
   cd C:\omar\UNI\jana
   git add .
   git commit -m "Performance fix: Integrate Lenis smooth scroll and optimize GSAP render loop"
   git push
   ```
3. Confirm the live deployment at `https://momr09989-code.github.io/jana-soliman-portfolio/`.
