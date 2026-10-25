# Architectural Blueprint: Jana Soliman — "I'm Just a Girl" Coquette x Creative Tech Portfolio

> **Target Executor**: Coder Agent (Gemini 3.8 Flash)
> **Project Root**: `C:\omar\UNI\jana\`
> **Design Paradigm**: Awwwards-Level Interactive Web Experience · Coquette / Cherry-Girl Feminine Aesthetics (`#140408` / `#D91636` / `#FF4D6D` / `#FFB3C1` / `#FFF0F3`) meets High-FPS Creative Coding (GSAP 3 + ScrollTrigger + Lenis Smooth Scroll) + Automated GitHub Pages Deployment.

---

## 1. Directory & Asset Setup (`C:\omar\UNI\jana\`)

Execute the following file-system steps first:

1. **Create Project Directories**:
   - Create `C:\omar\UNI\jana\` and `C:\omar\UNI\jana\assets\`.
2. **Copy Tech Stack Logos & Icons**:
   - Inspect `C:\omar\UNI\DEBI\portfolio\` (including any asset/icon subdirectories) and copy all tech stack logos, SVGs, and icons into `C:\omar\UNI\jana\assets\`.
3. **Locate & Copy Jana's Profile Image**:
   - Search `C:\omar\UNI\`, `C:\omar\UNI\DEBI\portfolio\`, and parent/user directories for `1000338363.jpg` or `profile.jpg` (or any recently added portrait image).
   - Copy it to `C:\omar\UNI\jana\assets\jana_profile.jpg`.
   - Include a graceful inline SVG/styled fallback (`onerror`) on the `<img>` element so the arched glass frame always looks flawless.
4. **Core Application Files**:
   - `C:\omar\UNI\jana\index.html` — Semantic HTML5 document, Google Fonts (`Playfair Display`, `Syne`, `Plus Jakarta Sans`, `JetBrains Mono`, `Cairo`), CDN links for **GSAP 3.12.5**, **ScrollTrigger**, and **Lenis (`@studio-freight/lenis`)**, plus custom SVG definitions for 3D glossy hearts, satin ribbons, and sparkles.
   - `C:\omar\UNI\jana\style.css` — Complete CSS variables, velvet-cherry glassmorphism, arched portrait frame, custom scrollbar, responsive Bento/grid layouts, and keyframe animations.
   - `C:\omar\UNI\jana\script.js` — Preloader timeline, Lenis + `gsap.ticker` + `ScrollTrigger` sync, glowing heart cursor & click/hover particle spawner, magnetic buttons, heart-burst skill cards, and parallax scroll animations.

---

## 2. Aesthetic & Theme ("I'm Just a Girl" Coquette x Creative Tech)

### 2.1 Color Palette (`:root` Design Tokens)
```css
:root {
  --bg-velvet: #140408;          /* Deep Velvet Cherry (Primary Background) */
  --bg-velvet-surface: #1E070D;  /* Elevated Velvet Card Surface */
  --crimson-red: #D91636;        /* Crimson Red (Primary Glow & Core Accent) */
  --raspberry-pink: #FF4D6D;     /* Raspberry Pink (Interactive Highlights) */
  --blush-pink: #FFB3C1;         /* Soft Blush Pink (Secondary Accents & Borders) */
  --cream-white: #FFF0F3;        /* Cream White (Primary Typography) */
  --text-muted: rgba(255, 240, 243, 0.75);
  --glass-bg: rgba(255, 77, 109, 0.08);
  --glass-bg-hover: rgba(255, 77, 109, 0.16);
  --glass-border: 1px solid rgba(255, 77, 109, 0.35);
  --glass-shadow: 0 20px 50px rgba(217, 22, 54, 0.25), inset 0 1px 1px rgba(255, 240, 243, 0.25);
  --arch-radius: 220px 220px 36px 36px;
}
```

### 2.2 Signature Visual Elements
- **Floating 3D-Style SVG Hearts & Sparkles**:
  - Populate a fixed background layer (`#ambient-hearts`) with 15+ custom SVG hearts shaded with `<radialGradient>` and `<linearGradient>` (giving a 3D glossy cherry/glass appearance) plus 4-point sparkles (`✦`).
  - Animate continuously across the background and on scroll via GSAP with `force3D: true` for locked 60fps performance.
- **Interactive Glowing Heart Cursor Follower**:
  - Custom cursor (`#heart-cursor`) shaped as a glowing mini SVG heart that tracks the pointer via `gsap.quickTo`.
  - Spawns tiny floating hearts (`#FF4D6D`, `#FFB3C1`, `#D91636`) on click and when hovering interactive elements, floating upward and fading out smoothly via GSAP (`force3D: true`).
- **Coquette Glassmorphism Badges & Micro-Tags**:
  - Styled with cherry-red glowing borders (`1px solid rgba(255, 77, 109, 0.35)`), `backdrop-filter: blur(16px)`, bow/ribbon accents (`🎀`), and playful micro-tags:
    - `"✨ I'm just a girl who codes ✨"`
    - `"🍒 Fueled by coffee & pink aesthetics"`
    - `"💖 HNU CS Girl"`
- **Arched & Heart-Accented Hero Frame**:
  - Frame `assets/jana_profile.jpg` inside an elegant arched glowing glass frame (`border-radius: 220px 220px 36px 36px`) topped with a coquette ribbon badge (`🎀`) and surrounded by orbiting floating heart badges (`"💻 CS & IT @ HNU"`, `"✨ UI/UX & Motion"`, `"💖 60fps Web Dev"`).

---

## 3. Heart-Themed Preloader Screen (`#preloader`)

- **Design**: Full-screen velvet-red (`#140408`) overlay (`position: fixed; inset: 0; z-index: 9999`).
- **Animation Sequence**:
  - Centerpiece beating & liquid-filling SVG Heart animation (using SVG gradient + clip-path/mask or stroke/fill progression).
  - Playful loading text: `"Loading Jana's World... 💖"`.
  - Live numeric counter incrementing smoothly from `0%` to `100%`.
  - Upon completion, execute a smooth GSAP `expo.inOut` curtain reveal (sliding/splitting the preloader away) directly chained into the Hero section entrance animation.
  - Include a `4000ms` safety fallback so the preloader always reveals the site even if external network assets are slow.

---

## 4. 60fps Smooth Scroll & Animations (`script.js`)

1. **Lenis Smooth Scroll Integration**:
   - Load `@studio-freight/lenis` (with automatic fallback if CDN path varies) and synchronize with GSAP `ScrollTrigger`:
     ```javascript
     const lenis = new Lenis({
       duration: 1.2,
       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
       smoothWheel: true,
     });
     lenis.on('scroll', ScrollTrigger.update);
     gsap.ticker.add((time) => lenis.raf(time * 1000));
     gsap.ticker.lagSmoothing(0);
     ```
2. **Magnetic Hover Effects (`.magnetic`)**:
   - Apply magnetic pull on CTA buttons, navigation pills, and contact buttons using `gsap.to` with `force3D: true` and elastic return on `mouseleave`.
3. **Heart-Burst Hover Animations on Skill Cards (`.skill-card`)**:
   - Hovering any skill card triggers a burst of 6–8 miniature SVG hearts radiating outward with GSAP physics (`x`, `y`, `scale`, `rotation`, `autoAlpha`, `force3D: true`) alongside 3D card tilt.
4. **Smooth Parallax Scrolling**:
   - Use `ScrollTrigger` (`scrub: 1`) to parallax the floating 3D background hearts, decorative ribbons, and section headings.

---

## 5. Personal Information & Smart Content Strategy

### 5.1 Identity & Education
- **Name**: **Jana Soliman** (`جنى سليمان`)
- **Education**: Computer Science & IT Student @ **Helwan National University (HNU)** — Sophomore/Junior Cohort.
- **Smart Academic Standing Badge**:
  - Display prominently inside an aesthetic glowing cherry-glass badge in the About/Education section:
    `"Active CS Undergraduate @ HNU | Good Academic Standing (GPA: 2.5) | Focused on Practical UI/UX & Web Engineering"`

### 5.2 Direct Contact Details & Interactive Buttons
- **Phone / WhatsApp**: `01151194520`
  - Direct Call Button: `href="tel:01151194520"` (`"📞 Call: 01151194520"`)
  - Direct WhatsApp Button: `href="https://wa.me/201151194520"` (`"💬 WhatsApp: +20 115 119 4520"`, `target="_blank"`)
- **Email**: `Janamo16108@gmail.com` (strictly cleaned with no spaces)
  - Direct Email Button: `href="mailto:Janamo16108@gmail.com"` (`"✉️ Email: Janamo16108@gmail.com"`)
- Add one-click **"Copy"** helper buttons next to the phone and email with a cute floating toast notification (`"Copied to clipboard! 💖"`).

### 5.3 Skills & Tech Stack (Using Copied Logos from `C:\omar\UNI\DEBI\portfolio\`)
Render in two categorized glassmorphism grids using the copied logo files in `assets/` (plus crisp inline SVGs for any supplementary icons):
- **Frontend & Motion**:
  - `HTML5`, `CSS3`, `JavaScript (ES6+)`, `React`, `Vite`, `GSAP`, `Lenis Smooth Scroll`, `Responsive UI/UX`
- **Programming & Tech Foundations**:
  - `Python`, `Data Manipulation (Pandas)`, `Git & GitHub`, `AI Prompt Engineering & Generative AI Workflows`, `Cybersecurity Basics`

### 5.4 Creative Showcase / Academic Lab Cards (`#showcase`)
Build 3 interactive, richly styled showcase cards with live visual previews inside each card:
1. **Coquette Interactive Web Experience**:
   - *Subtitle*: High-fps motion web design using GSAP & Lenis.
   - *Highlights*: Choreographed `expo.inOut` transitions, custom SVG heart particle engine, and 60fps glassmorphic layouts.
   - *Tags*: `GSAP 3` · `Lenis` · `HTML5/CSS3` · `Interactive Motion`
2. **Python & Smart Automation Lab**:
   - *Subtitle*: Academic scripts and data workflows built at HNU.
   - *Highlights*: Practical Python automation scripts and Pandas dataframe processing pipelines developed during CS & IT coursework at Helwan National University.
   - *Tags*: `Python` · `Pandas` · `Data Manipulation` · `HNU CS Lab`
3. **Modern React Component System**:
   - *Subtitle*: Aesthetic, responsive glassmorphism UI components.
   - *Highlights*: Reusable coquette-inspired UI primitives, magnetic buttons, interactive badges, and responsive layouts powered by React & Vite.
   - *Tags*: `React` · `Vite` · `Glassmorphism` · `Responsive UI/UX`

---

## 6. Automated GitHub Repository & GitHub Pages Deployment

Once `index.html`, `style.css`, `script.js`, and `assets/` are completely built and verified locally:

1. **Initialize Local Git Repository in `C:\omar\UNI\jana\`**:
   ```powershell
   cd C:\omar\UNI\jana
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: Jana Soliman Portfolio"
   ```
2. **Authenticate & Push to GitHub via GitHub CLI (`gh`)**:
   - Check authentication status:
     ```powershell
     gh auth status
     ```
   - If authenticated, create the public repository `jana-soliman-portfolio` and push (or if it already exists under the user's account, set the remote and force-push `main`):
     ```powershell
     gh repo create jana-soliman-portfolio --public --source=. --remote=origin --push
     ```
3. **Enable GitHub Pages Automatically**:
   - Trigger GitHub Pages on the `main` branch root (`/`):
     ```powershell
     gh api repos/{owner}/jana-soliman-portfolio/pages -X POST -F build_type=legacy -F source[branch]=main -F source[path]=/
     ```
   - *(Fallback)*: If `gh` CLI is not authenticated or Pages API returns an error, deploy via `npx gh-pages -d .` or `npx surge . jana-soliman-portfolio.surge.sh` so the user is guaranteed a live public URL.
4. **Return Final Deliverables**:
   - Report the local path (`C:\omar\UNI\jana\index.html`), the GitHub repository URL, and the live GitHub Pages URL (`https://<owner>.github.io/jana-soliman-portfolio/`).
