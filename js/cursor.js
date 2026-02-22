/**
 * cursor.js — Custom Cyberpunk Cursor
 * Renders a glowing dot + trailing ring that follows the mouse.
 */

const CustomCursor = (() => {
    let cursorEl, trailEl;
    let targetX = 0;
    let targetY = 0;
    let trailX = 0;
    let trailY = 0;

    const TRAIL_SMOOTHING = 0.15;

    /**
     * Updates cursor position instantly on mouse move.
     * @param {MouseEvent} event
     */
    function onMouseMove(event) {
        targetX = event.clientX;
        targetY = event.clientY;
        cursorEl.style.left = targetX + "px";
        cursorEl.style.top = targetY + "px";
    }

    /**
     * Smoothly animates the trailing ring toward current mouse position.
     */
    function animateTrail() {
        trailX += (targetX - trailX) * TRAIL_SMOOTHING;
        trailY += (targetY - trailY) * TRAIL_SMOOTHING;
        trailEl.style.left = trailX + "px";
        trailEl.style.top = trailY + "px";
        requestAnimationFrame(animateTrail);
    }

    return {
        init() {
            cursorEl = document.getElementById("cursor");
            trailEl = document.getElementById("cursor-trail");

            if (!cursorEl || !trailEl) return;

            document.addEventListener("mousemove", onMouseMove);
            animateTrail();
        },
    };
})();
