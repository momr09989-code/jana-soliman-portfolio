/**
 * JANA SOLIMAN — "I'M JUST A GIRL WHO CODES" COQUETTE PORTFOLIO
 * High-FPS Creative Tech & Coquette Motion Engine
 * Powered by GSAP 3, ScrollTrigger & Lenis Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP Plugins safely
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Initialize Lenis Smooth Scroll with GSAP Ticker Sync
  initSmoothScroll();

  // 2. Spawn Ambient 3D Hearts & Parallax
  initAmbientHearts();

  // 3. Glowing Heart Cursor Follower & Particle Engine
  initHeartCursor();

  // 4. Preloader Timeline & Hero Reveal
  initPreloader();

  // 5. Magnetic Button Physics
  initMagneticPhysics();

  // 6. Skill Cards Heart-Burst & 3D Tilt
  initSkillCardBursts();

  // 7. Interactive Showcase Sandboxes
  initShowcaseInteractions();

  // 8. Contact Helpers & Clipboard Toast
  initContactFeatures();
});

/* ==========================================================================
   1. LENIS SMOOTH SCROLL & GSAP TICKER SYNC
   ========================================================================== */
let lenis = null;

function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (e) {
      console.warn('Lenis initialized with fallback standard scroll', e);
    }
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -40 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
}

/* ==========================================================================
   2. AMBIENT FLOATING 3D HEARTS & SPARKLES LAYER
   ========================================================================== */
function initAmbientHearts() {
  const container = document.getElementById('ambient-hearts');
  if (!container) return;

  const heartCount = 18;
  const colors = [
    'url(#cherryHeartGrad)',
    'url(#softBlushGrad)',
    'url(#glowGlowGrad)',
    '#FFB6C1',
    '#FF8DA1',
    '#FFC2D1',
    '#FFFFFF'
  ];

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'ambient-svg-heart';

    const size = Math.floor(Math.random() * 32) + 16;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const color = colors[i % colors.length];
    const initialRot = Math.random() * 60 - 30;

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${posX}vw`;
    heart.style.top = `${posY}vh`;
    heart.style.opacity = (Math.random() * 0.2 + 0.1).toFixed(2);

    heart.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:100%; height:100%;">
        <use href="#gloss-heart" fill="${color}"/>
      </svg>
    `;

    container.appendChild(heart);

    // Continuous floating animation with GSAP force3D
    if (typeof gsap !== 'undefined') {
      const duration = Math.random() * 6 + 6;
      const floatDist = Math.random() * 40 + 20;

      gsap.to(heart, {
        y: `-=${floatDist}`,
        x: `+=${Math.random() * 30 - 15}`,
        rotation: initialRot + (Math.random() * 40 - 20),
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true,
        delay: Math.random() * 2,
      });

      // Scroll parallax scrub
      if (typeof ScrollTrigger !== 'undefined') {
        const scrubSpeed = (Math.random() * 150 + 50) * (i % 2 === 0 ? 1 : -1);
        gsap.to(heart, {
          y: `+=${scrubSpeed}`,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      }
    }
  }

  // Add 12 ambient 4-point sparkles
  for (let s = 0; s < 12; s++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'ambient-sparkle';
    sparkle.textContent = '✦';
    sparkle.style.left = `${Math.random() * 95}vw`;
    sparkle.style.top = `${Math.random() * 95}vh`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(sparkle);
  }
}

/* ==========================================================================
   3. GLOWING HEART CURSOR FOLLOWER & PARTICLE SPAWNER
   ========================================================================== */
function initHeartCursor() {
  const cursor = document.getElementById('heart-cursor');
  if (!cursor) return;

  // Check if touch device
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let quickX, quickY;
  if (typeof gsap !== 'undefined') {
    quickX = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' });
    quickY = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' });
  }

  let mouseX = -100;
  let mouseY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (quickX && quickY) {
      quickX(mouseX);
      quickY(mouseY);
    } else {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  // Spawn heart on click
  window.addEventListener('click', (e) => {
    spawnMiniHeart(e.clientX, e.clientY, 3);
  });

  // Cursor hover expansions
  const hoverables = document.querySelectorAll('a, button, .skill-card, .bento-card, .coquette-badge, .orbit-badge');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      if (typeof gsap !== 'undefined') {
        gsap.to(cursor.querySelector('.cursor-svg'), { scale: 1.45, duration: 0.2, force3D: true });
      }
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      if (typeof gsap !== 'undefined') {
        gsap.to(cursor.querySelector('.cursor-svg'), { scale: 1, duration: 0.2, force3D: true });
      }
    });
  });
}

function spawnMiniHeart(x, y, count = 1) {
  const colors = ['#FFB6C1', '#FF8DA1', '#FFC2D1', '#FFFFFF'];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart-particle';

    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.floor(Math.random() * 12) + 12;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    heart.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:100%; height:100%;">
        <use href="#gloss-heart" fill="${color}"/>
      </svg>
    `;

    document.body.appendChild(heart);

    if (typeof gsap !== 'undefined') {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 60 + 20;
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist - 50; // Bias upward

      gsap.fromTo(
        heart,
        { scale: 0.2, autoAlpha: 1, rotation: Math.random() * 40 - 20 },
        {
          x: targetX,
          y: targetY,
          scale: Math.random() * 0.8 + 0.6,
          rotation: Math.random() * 80 - 40,
          autoAlpha: 0,
          duration: Math.random() * 0.6 + 0.8,
          ease: 'power2.out',
          force3D: true,
          onComplete: () => heart.remove(),
        }
      );
    } else {
      setTimeout(() => heart.remove(), 1000);
    }
  }
}

/* ==========================================================================
   4. PRELOADER SCREEN TIMELINE & HERO REVEAL
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const percentText = document.getElementById('preloader-percent');
  const progressBar = document.getElementById('preloader-bar');
  const liquidFill = document.getElementById('liquid-fill');
  const leftCurtain = document.querySelector('.left-curtain');
  const rightCurtain = document.querySelector('.right-curtain');

  if (!preloader) return;

  const progress = { value: 0 };
  let isDone = false;

  function finishPreloader() {
    if (isDone) return;
    isDone = true;

    if (typeof gsap !== 'undefined') {
      const exitTL = gsap.timeline({
        onComplete: () => {
          preloader.style.display = 'none';
          triggerHeroEntrance();
        },
      });

      exitTL
        .to('.preloader-content', {
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'power2.in',
        })
        .to(leftCurtain, {
          xPercent: -100,
          duration: 0.85,
          ease: 'expo.inOut',
        }, '-=0.2')
        .to(rightCurtain, {
          xPercent: 100,
          duration: 0.85,
          ease: 'expo.inOut',
        }, '<');
    } else {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        preloader.style.display = 'none';
        triggerHeroEntrance();
      }, 600);
    }
  }

  // Preloader counter animation via GSAP
  if (typeof gsap !== 'undefined') {
    gsap.to(progress, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progress.value);
        if (percentText) percentText.textContent = val;
        if (progressBar) progressBar.style.width = `${val}%`;
        if (liquidFill) {
          // Heart liquid fills up from y=90 to y=0
          const liquidY = 90 - (val / 100) * 90;
          liquidFill.setAttribute('y', liquidY);
        }
      },
      onComplete: finishPreloader,
    });
  } else {
    // Vanilla fallback
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      if (percentText) percentText.textContent = p;
      if (progressBar) progressBar.style.width = `${p}%`;
      if (p >= 100) {
        clearInterval(interval);
        finishPreloader();
      }
    }, 25);
  }

  // Safety Fallback after 4000ms
  setTimeout(() => {
    if (!isDone) finishPreloader();
  }, 4000);
}

function triggerHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } });

  heroTL
    .from('.site-header', {
      y: -50,
      autoAlpha: 0,
      duration: 0.8,
    })
    .from('.hero-badge-container .coquette-badge', {
      y: 25,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.6,
    }, '-=0.4')
    .from('.hero-title .title-line', {
      y: 40,
      autoAlpha: 0,
      stagger: 0.15,
      duration: 0.8,
    }, '-=0.3')
    .from('.hero-bio', {
      y: 25,
      autoAlpha: 0,
      duration: 0.7,
    }, '-=0.5')
    .from('.hero-academic-pill', {
      scale: 0.9,
      autoAlpha: 0,
      duration: 0.5,
    }, '-=0.4')
    .from('.hero-actions .magnetic', {
      y: 20,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.6,
    }, '-=0.3')
    .from('.arched-frame-wrapper', {
      scale: 0.88,
      autoAlpha: 0,
      duration: 1,
      ease: 'back.out(1.4)',
    }, '-=0.8')
    .from('.orbit-badge', {
      scale: 0,
      autoAlpha: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(1.8)',
    }, '-=0.5')
    .from('.corner-heart-badge', {
      scale: 0,
      autoAlpha: 0,
      rotation: -25,
      stagger: 0.1,
      duration: 0.55,
      ease: 'back.out(2)',
    }, '-=0.45');

  // Continuous GSAP floating animation for corner SVG heart badges
  gsap.utils.toArray('.corner-heart-badge').forEach((badge, idx) => {
    gsap.to(badge, {
      y: idx % 2 === 0 ? -12 : 12,
      x: idx % 2 === 0 ? 5 : -5,
      rotation: idx % 2 === 0 ? 12 : -12,
      scale: 1.08,
      duration: 2.2 + idx * 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      force3D: true,
    });
  });

  // Trigger scroll-based reveal animations
  initScrollAnimations();
}

/* ==========================================================================
   5. SCROLL TRIGGER ANIMATIONS & SECTION HEADINGS
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Reveal all section headers
  gsap.utils.toArray('.section-header').forEach((header) => {
    gsap.from(header.children, {
      y: 35,
      autoAlpha: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Academic Spotlight Card Reveal
  gsap.from('.academic-spotlight-card', {
    y: 50,
    autoAlpha: 0,
    scale: 0.95,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.academic-spotlight-card',
      start: 'top 85%',
    },
  });

  // Bento Cards Stagger
  gsap.from('.bento-card', {
    y: 40,
    autoAlpha: 0,
    stagger: 0.18,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-bento-grid',
      start: 'top 80%',
    },
  });

  // Skill Cards Stagger
  gsap.utils.toArray('.skills-grid').forEach((grid) => {
    gsap.from(grid.querySelectorAll('.skill-card'), {
      y: 30,
      autoAlpha: 0,
      scale: 0.92,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
      },
    });
  });

  // Showcase Cards Parallax Entrance
  gsap.utils.toArray('.showcase-card').forEach((card, idx) => {
    gsap.from(card, {
      y: 60,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
    });
  });

  // Contact Cards Stagger
  gsap.from('.contact-pill-card', {
    x: -40,
    autoAlpha: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-cards-col',
      start: 'top 85%',
    },
  });

  gsap.from('.coquette-message-card', {
    x: 40,
    autoAlpha: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.coquette-message-card',
      start: 'top 85%',
    },
  });
}

/* ==========================================================================
   6. MAGNETIC BUTTON PHYSICS
   ========================================================================== */
function initMagneticPhysics() {
  const magnets = document.querySelectorAll('.magnetic');

  magnets.forEach((el) => {
    const strength = parseFloat(el.getAttribute('data-magnetic-strength')) || 0.25;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;

      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: x,
          y: y,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true,
        });
      } else {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1.1, 0.4)',
          force3D: true,
        });
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    });
  });
}

/* ==========================================================================
   7. SKILL CARDS HEART-BURST & 3D TILT
   ========================================================================== */
function initSkillCardBursts() {
  const cards = document.querySelectorAll('.skill-card');

  cards.forEach((card) => {
    // 3D Card Tilt
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 800,
          duration: 0.3,
          ease: 'power1.out',
          force3D: true,
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out',
          force3D: true,
        });
      }
    });

    // Heart Burst on Hover (Radiates 6-8 miniature hearts)
    let hasBurstRecently = false;
    card.addEventListener('mouseenter', (e) => {
      if (hasBurstRecently) return;
      hasBurstRecently = true;
      setTimeout(() => (hasBurstRecently = false), 800);

      const rect = card.getBoundingClientRect();
      const burstContainer = card.querySelector('.skill-burst-container');
      if (!burstContainer) return;

      const colors = ['#FFB6C1', '#FF8DA1', '#FFC2D1', '#FFFFFF'];
      const burstCount = Math.floor(Math.random() * 3) + 6;

      for (let i = 0; i < burstCount; i++) {
        const miniHeart = document.createElement('div');
        miniHeart.className = 'floating-heart-particle';
        const color = colors[i % colors.length];
        const size = Math.floor(Math.random() * 8) + 12;

        miniHeart.style.position = 'absolute';
        miniHeart.style.left = '50%';
        miniHeart.style.top = '35%';
        miniHeart.style.width = `${size}px`;
        miniHeart.style.height = `${size}px`;

        miniHeart.innerHTML = `
          <svg viewBox="0 0 24 24" style="width:100%; height:100%;">
            <use href="#gloss-heart" fill="${color}"/>
          </svg>
        `;

        burstContainer.appendChild(miniHeart);

        if (typeof gsap !== 'undefined') {
          const angle = (i / burstCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
          const distance = Math.random() * 50 + 40;
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance;

          gsap.fromTo(
            miniHeart,
            { scale: 0, autoAlpha: 1, x: 0, y: 0 },
            {
              x: targetX,
              y: targetY,
              scale: Math.random() * 0.6 + 0.6,
              rotation: Math.random() * 90 - 45,
              autoAlpha: 0,
              duration: 0.75,
              ease: 'power2.out',
              force3D: true,
              onComplete: () => miniHeart.remove(),
            }
          );
        } else {
          setTimeout(() => miniHeart.remove(), 750);
        }
      }
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE SHOWCASE SANDBOXES
   ========================================================================== */
function initShowcaseInteractions() {
  // Demo 1: Python Lab Pipeline Simulator
  const runDemoBtn = document.querySelector('.run-demo-btn');
  const termOutput = document.getElementById('term-output');
  const termStatus = document.getElementById('term-status');

  if (runDemoBtn && termOutput) {
    runDemoBtn.addEventListener('click', () => {
      if (termStatus) {
        termStatus.textContent = 'RUNNING...';
        termStatus.style.background = 'rgba(251, 191, 36, 0.2)';
        termStatus.style.borderColor = '#FBBF24';
        termStatus.style.color = '#FDE68A';
      }

      termOutput.innerHTML = `&gt; [INIT] Initializing Pandas DataFrame pipeline...<br>&gt; [LOAD] Reading HNU datasets (2,450 rows)...`;

      setTimeout(() => {
        termOutput.innerHTML += `<br>&gt; [PROCESS] Normalizing features & imputing values...`;
      }, 500);

      setTimeout(() => {
        termOutput.innerHTML += `<br>&gt; [SUCCESS] Pipeline execution complete in 0.042s ✨<br>&gt; Accuracy: 99.8% | Memory saved: 34% 💖`;
        if (termStatus) {
          termStatus.textContent = 'SUCCESS';
          termStatus.style.background = 'rgba(16, 185, 129, 0.2)';
          termStatus.style.borderColor = '#10B981';
          termStatus.style.color = '#6EE7B7';
        }
        showToast('Python pipeline executed flawlessly! 💖');
      }, 1100);
    });
  }

  // Demo 2: React Component Heart Sandbox Counter
  const sandboxCounterBtn = document.getElementById('sandbox-counter-btn');
  const countDisplay = document.getElementById('heart-count-display');
  const stateBadge = document.getElementById('sandbox-state-badge');

  let loveCount = 42;

  if (sandboxCounterBtn && countDisplay) {
    sandboxCounterBtn.addEventListener('click', (e) => {
      loveCount++;
      countDisplay.textContent = `Love it: ${loveCount}`;

      if (stateBadge) {
        stateBadge.textContent = `Updated #${loveCount}`;
      }

      const rect = sandboxCounterBtn.getBoundingClientRect();
      spawnMiniHeart(rect.left + rect.width / 2, rect.top, 4);

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(
          sandboxCounterBtn,
          { scale: 0.92 },
          { scale: 1, duration: 0.35, ease: 'back.out(2)' }
        );
      }
    });
  }

  // Demo 3: Interactive Pill Button in Project 3
  const interactivePillBtn = document.querySelector('.interactive-pill-btn');
  if (interactivePillBtn) {
    interactivePillBtn.addEventListener('click', (e) => {
      if (sandboxCounterBtn) {
        sandboxCounterBtn.click();
      }
    });
  }
}

/* ==========================================================================
   9. CONTACT HELPERS, FORM HANDLER & CLIPBOARD TOAST
   ========================================================================== */
function initContactFeatures() {
  // One-click Copy Helper
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard! 💖`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  // Global window handler for contact form
  window.handleFormSubmit = function () {
    const name = document.getElementById('form-name')?.value.trim() || 'Visitor';
    const email = document.getElementById('form-email')?.value.trim() || '';
    const message = document.getElementById('form-message')?.value.trim() || '';

    const banner = document.getElementById('form-success-banner');
    if (banner) {
      banner.style.display = 'flex';
    }

    const encodedText = encodeURIComponent(
      `Hi Jana! 🎀\n\nI'm ${name} (${email}).\n${message}\n\nSent from your portfolio website 💖`
    );

    const whatsappUrl = `https://wa.me/201151194520?text=${encodedText}`;

    showToast("Opening WhatsApp with your message! 💖");

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied "${text}" to clipboard! 💖`);
  } catch (err) {
    showToast('Failed to copy automatically');
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
