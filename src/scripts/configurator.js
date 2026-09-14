/**
 * DIWEBA — pricing configurator.
 *
 * Loaded only on /pakete-preise/ (see base.njk's conditional script include),
 * never globally — keeps every other page's JS payload at the Phase 2
 * baseline (spec §13: "minimal JavaScript").
 *
 * PROGRESSIVE ENHANCEMENT: every control is a real <input type="radio">/
 * <input type="checkbox">, server-rendered with START pre-selected and no
 * add-ons checked -- a correct, complete default state. Without this script,
 * the controls remain fully operable (radios/checkboxes work natively with
 * no JS at all) and the surrounding page already states every price as plain
 * text elsewhere (package cards, compare table), so no pricing information
 * is JS-only. What JS adds is the LIVE recalculation in the summary panel —
 * genuinely dynamic content that cannot be precomputed server-side for an
 * unknown future selection.
 *
 * NO FAKE SUBMISSION. The configurator's summary ends in a real link to the
 * contact route (rendered server-side, in the template, not by this script)
 * rather than an inline form with a client-side-only "your request is on its
 * way" success message and no backend behind it — see the pricing page
 * template's header comment for why.
 */

(function () {
  "use strict";

  const root = document.querySelector("[data-configurator]");
  if (!root) return;

  const packageInputs = [...root.querySelectorAll('input[name="cfg-package"]')];
  const addonInputs = [...root.querySelectorAll('input[name="cfg-addon"]')];

  const totalOnceEl = root.querySelector("[data-total-once]");
  const totalMonEl = root.querySelector("[data-total-mon]");
  const totalDaysEl = root.querySelector("[data-total-days]");
  const summaryListEl = root.querySelector("[data-summary-list]");
  const hintEl = root.querySelector("[data-hint]");

  const lang = document.documentElement.lang === "en" ? "en" : "de";
  const fmtPrice = (n) =>
    lang === "de"
      ? n.toLocaleString("de-DE") + " €"
      : "€" + n.toLocaleString("en-US");

  function selectedPackage() {
    return packageInputs.find((el) => el.checked) || packageInputs[0];
  }

  function recalc() {
    const pkg = selectedPackage();
    const isPlus = pkg.value === "plus";

    let once = Number(pkg.dataset.once);
    let mon = Number(pkg.dataset.mon);
    let days = Number(pkg.dataset.days);
    const summary = [{ label: pkg.dataset.name, value: fmtPrice(once) + " · " + fmtPrice(mon) }];

    let messungChecked = false;
    let kiChecked = false;

    for (const addon of addonInputs) {
      const includedInPlus = addon.dataset.inPlus === "true" && isPlus;
      const row = addon.closest(".cfg-addon-row");
      const priceDisplay = row.querySelector("[data-price-display]");
      const inPlusNote = row.querySelector("[data-inplus-note]");

      // Add-ons marked "included in PLUS" lock to checked+disabled once PLUS
      // is selected -- they are already part of the package, not an optional
      // extra, and re-enabling them on START restores normal toggle behaviour.
      if (includedInPlus) {
        addon.checked = true;
        addon.disabled = true;
        if (priceDisplay) priceDisplay.hidden = true;
        if (inPlusNote) inPlusNote.hidden = false;
      } else {
        addon.disabled = false;
        if (priceDisplay) priceDisplay.hidden = false;
        if (inPlusNote) inPlusNote.hidden = true;
      }

      if (addon.checked && !includedInPlus) {
        once += Number(addon.dataset.once) || 0;
        mon += Number(addon.dataset.mon) || 0;
        days += Number(addon.dataset.days) || 0;
        summary.push({ label: addon.dataset.name, value: fmtPrice(Number(addon.dataset.once) || 0) });
      } else if (includedInPlus) {
        summary.push({ label: addon.dataset.name, value: addon.dataset.includedLabel });
      }

      if (addon.value === "messung" && addon.checked) messungChecked = true;
      if (addon.value === "ki" && addon.checked) kiChecked = true;
    }

    if (totalOnceEl) totalOnceEl.textContent = fmtPrice(once);
    if (totalMonEl) totalMonEl.textContent = fmtPrice(mon);
    if (totalDaysEl) totalDaysEl.textContent = String(days);

    if (summaryListEl) {
      summaryListEl.innerHTML = "";
      for (const item of summary) {
        const li = document.createElement("li");
        const name = document.createElement("span");
        name.textContent = item.label;
        const value = document.createElement("span");
        value.textContent = item.value;
        li.append(name, value);
        summaryListEl.appendChild(li);
      }
    }

    // Mathematically derived, not guessed: START (790) + Messung (290) +
    // KI-Sichtbarkeit (490) = 1570, against PLUS's flat 1490 -- exactly the
    // €80 the approved hint text names. Shown only when a visitor has
    // manually built up exactly that combination on START.
    if (hintEl) hintEl.hidden = !(pkg.value === "start" && messungChecked && kiChecked);
  }

  for (const el of [...packageInputs, ...addonInputs]) {
    el.addEventListener("change", recalc);
  }

  recalc();
})();
