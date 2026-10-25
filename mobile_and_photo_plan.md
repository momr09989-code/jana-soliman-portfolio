# Architectural Update Plan: Profile Photo Fix, Soft Baby Pink Theme & 100% Mobile-First Optimization

> **Target Executor**: Coder Agent (Gemini 3.8 Flash)
> **Project Root**: `C:\omar\UNI\jana\`
> **Objective**: Ensure Jana's real uploaded portrait (`jana_profile.jpg`) displays with zero caching/fallback issues, enforce the Soft Baby Pink Coquette aesthetic across every component, and implement 100% Mobile-First responsiveness with 60fps touch performance.

---

## Step 1: Bulletproof Image Hunting, Verification & Cache-Busting (CRITICAL FIX)

1. **Extract & Verify Real Uploaded Photo**:
   - Check the uploaded chat image at:
     - Framed portrait: `C:\Users\user\.gemini\antigravity\brain\047254d1-314f-4cb0-8473-0d08f061887d\scratch\cropped_preview.jpg`
     - Original upload: `C:\Users\user\.gemini\antigravity\brain\047254d1-314f-4cb0-8473-0d08f061887d\.user_uploaded\media_1792927228983_31ad87f1.jpg`
   - Also run a PowerShell search across `C:\omar\`, `$env:USERPROFILE\Downloads`, `$env:USERPROFILE\Desktop`, and `$env:USERPROFILE\Pictures` for `1000338363*`, `*jana*`, `*profile*`, or recent `.jpg`/`.jpeg`/`.png` files.
   - Copy the real photo directly to `C:\omar\UNI\jana\assets\jana_profile.jpg` and verify its file size is ~144KB–153KB (NOT the old 20KB synthetic SVG/placeholder image).
2. **HTML Image Tag & Cache-Busting Fix (`index.html`)**:
   - Inspect `C:\omar\UNI\jana\index.html` and ensure every portrait `<img>` tag (`class="arch-portrait-img"` and `class="about-mini-portrait"`) points strictly to `assets/jana_profile.jpg?v=3` (using `?v=3` cache-busting query string so mobile browsers and GitHub Pages CDN immediately discard any cached placeholder image).
   - Remove any inline SVG placeholder `onerror` overrides that could accidentally trigger or mask the image, and update `<meta property="og:image" content="assets/jana_profile.jpg?v=3">`.

---

## Step 2: Soft Baby Pink "I'm Just a Girl" Aesthetic (`style.css` & `index.html`)

Ensure every section, card, badge, and interactive element strictly uses the Soft Baby Pink Coquette palette with zero dark leftovers:

- **Backgrounds**:
  - Primary Background: Soft Milk Pink (`#FFF5F8`) and Baby Pink (`#FFE4EC`).
  - Secondary / Section Gradients: `linear-gradient(135deg, #FFF0F5 0%, #FFD6E4 100%)`.
- **Glassmorphism Cards**:
  - Background: `rgba(255, 255, 255, 0.72)`
  - Blur: `backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);`
  - Border: `1px solid #FFB6C1`
  - Shadow: `0 12px 32px rgba(255, 141, 161, 0.18)`
- **Accents & Typography**:
  - Primary Accents: Sweet Baby Pink (`#FF8DA1`) and Pastel Rose (`#FFB3C6`).
  - Primary Text / Headings: Deep Rose-Charcoal (`#4A2531`) for crystal-clear readability on light pink backgrounds.
  - Subtitles / Muted Copy: Muted Berry (`#8C5365`).
  - Audit all terminal/sandbox/footer/modal surfaces so they harmonize with the light baby-pink aesthetic.

---

## Step 3: 100% Mobile-First Optimization & Touch Smoothness (`style.css` & `script.js`)

### 3.1 Viewport & Horizontal Overflow Lock
```css
html, body {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
```
Ensure `.coquette-ticker-wrapper`, ambient glow orbs, and orbiting badges never push horizontal scroll width beyond `100vw`.

### 3.2 Responsive Breakpoints (`@media (max-width: 768px)` and `@media (max-width: 480px)`)
1. **Hero Section Vertical Stacking**:
   - Stack `.hero-container` vertically (`display: flex; flex-direction: column-reverse; align-items: center; text-align: center;` or `column` with the portrait centered prominently at the top of the Hero).
   - Style Jana's portrait frame on mobile with:
     ```css
     max-width: 280px;
     width: 85vw;
     aspect-ratio: 3 / 4;
     height: auto;
     margin: 0 auto;
     ```
   - Ensure `.arch-portrait-img` uses:
     ```css
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: center top;
     ```
   - Reposition `.orbit-badge` and `.corner-heart-badge` elements on mobile (`left: -4%` / `right: -4%`, compact font sizes) so they frame the photo cleanly without overflowing the screen edges.
2. **Fluid Typography & Badges (`clamp()`)**:
   - Use fluid `clamp()` sizing on `.hero-title`, `.section-title`, `.coquette-badge`, and the Academic Standing GPA badge (`"Active CS Undergraduate @ HNU | Good Academic Standing (GPA: 2.5) | Focused on Practical UI/UX & Web Engineering"`) so they wrap gracefully on `320px–430px` phone screens.
3. **Compact Mobile Navigation Pill**:
   - On `@media (max-width: 768px)`, style `.site-header` and `.nav-container` as a sleek, compact floating glass pill bar with horizontally scrollable or compact icon+label links that fit narrow screens without overlapping the Hero content.
4. **Touch-Friendly Grids & CTA Buttons**:
   - Stack `.about-bento-grid`, `.skills-grid` (`grid-template-columns: repeat(2, 1fr)` on tablet/large phone, `1fr` on `<380px`), `.showcase-body`, and `.contact-grid` cleanly.
   - Enforce `min-height: 48px` and generous tap targets on all interactive CTA buttons (WhatsApp `01151194520`, Phone `tel:01151194520`, Email `Janamo16108@gmail.com`, and Copy buttons).

### 3.3 Mobile GPU & Lenis Tuning (`script.js` & `style.css`)
1. **Disable Custom Cursor on Touch Devices**:
   - In CSS:
     ```css
     @media (hover: none) and (pointer: coarse) {
       #heart-cursor, .heart-cursor {
         display: none !important;
       }
     }
     ```
   - In `script.js`: Skip `mousemove` cursor listeners and 3D tilt listeners when `window.matchMedia('(hover: none) and (pointer: coarse)').matches`.
2. **Reduce Ambient GSAP Hearts on Mobile**:
   - In `initAmbientHearts()` inside `script.js`, check `const isMobile = window.innerWidth <= 768;`.
   - Use `heartCount = isMobile ? 8 : 18` and `sparkleCount = isMobile ? 5 : 12` to guarantee locked 60fps scrolling on mobile phone GPUs.

---

## Step 4: Verify & Push to GitHub

1. Verify `C:\omar\UNI\jana\assets\jana_profile.jpg` exists, is non-empty (~150KB), and is tracked by Git:
   ```powershell
   Get-Item C:\omar\UNI\jana\assets\jana_profile.jpg
   ```
2. Commit and push all updates to `main`:
   ```powershell
   cd C:\omar\UNI\jana
   git add .
   git commit -m "Fix profile image, apply Baby Pink theme, and optimize mobile responsiveness"
   git push
   ```
3. Verify the live GitHub Pages deployment at `https://momr09989-code.github.io/jana-soliman-portfolio/`.
