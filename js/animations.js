/**
 * animations.js — Scroll-triggered Animations
 * Handles: reveal-on-scroll, skill bar fills, stat counter animations, glitch retrigger.
 */

const Animations = (() => {
    /**
     * Initializes IntersectionObserver for .reveal elements.
     * Applies staggered fade-in when elements enter the viewport.
     */
    function initScrollReveal() {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add("visible"), index * 80);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => observer.observe(el));
    }

    /**
     * Initializes IntersectionObserver for skill bar fill animations.
     * Triggers CSS width transition when skill cards come into view.
     */
    function initSkillBars() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const bars = entry.target.querySelectorAll(".skill-bar-fill");
                        bars.forEach((bar) => {
                            bar.style.width = bar.dataset.width + "%";
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        document.querySelectorAll(".skill-card").forEach((card) => observer.observe(card));
    }

    /**
     * Initializes IntersectionObserver for stat counters.
     * Animates numbers from 0 to their data-count value.
     */
    function initCounters() {
        const STEPS = 40;
        const INTERVAL_MS = 35;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const counters = entry.target.querySelectorAll("[data-count]");

                        counters.forEach((el) => {
                            const target = parseInt(el.dataset.count, 10);
                            const step = target / STEPS;
                            let current = 0;
                            const suffix = target === 100 ? "%" : "+";

                            const interval = setInterval(() => {
                                current = Math.min(current + step, target);
                                el.textContent = Math.round(current) + suffix;
                                if (current >= target) clearInterval(interval);
                            }, INTERVAL_MS);
                        });

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        document.querySelectorAll(".about-avatar-wrap").forEach((el) => observer.observe(el));
    }

    /**
     * Periodically re-triggers the glitch animation on the hero text
     * by resetting and re-applying its CSS animation.
     */
    function initGlitchRetrigger() {
        const INTERVAL_MS = 5000;

        setInterval(() => {
            const glitchEl = document.querySelector(".glitch");
            if (!glitchEl) return;
            glitchEl.style.animation = "none";
            setTimeout(() => (glitchEl.style.animation = ""), 50);
        }, INTERVAL_MS);
    }

    return {
        init() {
            initScrollReveal();
            initSkillBars();
            initCounters();
            initGlitchRetrigger();
        },
    };
})();
