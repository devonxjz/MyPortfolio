/**
 * main.js — Application Entry Point
 * Initializes all portfolio modules after DOM is ready.
 *
 * Module dependency order:
 *   1. Scene3D     — 3D background (requires Three.js)
 *   2. CustomCursor — Cursor effects
 *   3. TypingEffect — Hero typing animation
 *   4. Animations  — Scroll-triggered animations
 *   5. Navigation  — Mobile menu
 */

document.addEventListener("DOMContentLoaded", () => {
    Scene3D.init();
    CustomCursor.init();
    TypingEffect.init();
    Animations.init();
    Navigation.init();
});
