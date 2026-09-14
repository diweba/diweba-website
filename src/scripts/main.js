/**
 * DIWEBA — site JavaScript.
 *
 * Deliberately minimal (spec §13). Everything essential works without it: all
 * navigation is real links, the contact form posts natively, and no content is
 * client-rendered. This file only enhances.
 *
 * Loaded with `defer`, so it never blocks rendering.
 */

(function () {
  "use strict";

  /* --- Mobile navigation ---------------------------------------------------
     The toggle button is the only nav element that needs JS. It is rendered
     with aria-expanded="false" and toggles both that and a class. If this
     script fails to load, the nav is still in the DOM and reachable. */
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("mobile-nav");

  if (toggle && nav) {
    const label = toggle.querySelector(".visually-hidden");

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) {
        label.textContent = open
          ? toggle.dataset.labelClose
          : toggle.dataset.labelOpen;
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Escape closes the menu and returns focus to the control that opened it.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }
})();
