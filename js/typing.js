/**
 * typing.js — Typing / Deleting Text Effect
 * Cycles through an array of phrases with a typewriter animation.
 */

const TypingEffect = (() => {
    const PHRASES = [
        "Full-Stack Developer",
        "AI Integration Enthusiast",
        "Cybersecurity Learner",
        "Penetration Tester",
        "Problem Solver",
        "UTE Student · Year 2",
    ];

    const TYPING_SPEED = 85;     // ms per character when typing
    const DELETING_SPEED = 45;   // ms per character when deleting
    const PAUSE_DURATION = 2000; // ms to pause after full phrase

    let targetEl;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    /**
     * Runs one step of the type/delete loop, then schedules the next.
     */
    function tick() {
        const currentPhrase = PHRASES[phraseIndex];

        if (!isDeleting) {
            // Typing forward
            charIndex++;
            targetEl.textContent = currentPhrase.slice(0, charIndex);

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(tick, PAUSE_DURATION);
                return;
            }
        } else {
            // Deleting backward
            charIndex--;
            targetEl.textContent = currentPhrase.slice(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % PHRASES.length;
            }
        }

        setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }

    return {
        init() {
            targetEl = document.getElementById("typing");
            if (!targetEl) return;
            tick();
        },
    };
})();
