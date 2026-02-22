/**
 * navigation.js — Mobile Menu Navigation
 * Handles hamburger toggle, close button, and link clicks.
 */

const Navigation = (() => {
    let mobileMenuEl;

    /**
     * Opens the mobile menu overlay.
     */
    function openMenu() {
        mobileMenuEl.classList.add("open");
    }

    /**
     * Closes the mobile menu overlay.
     */
    function closeMenu() {
        mobileMenuEl.classList.remove("open");
    }

    return {
        init() {
            const hamburgerBtn = document.getElementById("hamburger");
            const closeBtn = document.getElementById("mobileClose");
            mobileMenuEl = document.getElementById("mobileMenu");

            if (!hamburgerBtn || !closeBtn || !mobileMenuEl) return;

            hamburgerBtn.addEventListener("click", openMenu);
            closeBtn.addEventListener("click", closeMenu);

            // Close menu when any navigation link is clicked
            const menuLinks = mobileMenuEl.querySelectorAll(".mob-link");
            menuLinks.forEach((link) => {
                link.addEventListener("click", closeMenu);
            });
        },
    };
})();
