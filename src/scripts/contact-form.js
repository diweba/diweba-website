/**
 * DIWEBA — contact form progressive enhancement.
 *
 * Loaded only on /kontakt/ and /en/contact/ (see base.njk's conditional
 * script include), never globally — same reasoning as configurator.js.
 *
 * WITHOUT this script: the form is a real <form method="post"> pointing at
 * /api/contact. It still submits (native navigation), the Worker still
 * validates and redirects to the real thank-you page on success (303, see
 * worker/index.ts). What is missing without JS is inline validation
 * messaging and a same-page "sending…" state — the submission itself does
 * not depend on JS.
 *
 * WITH this script: intercepts submit, runs the same required/email checks
 * the Worker enforces (worker/validate.ts) so a visitor sees the problem
 * immediately instead of after a round trip, then submits via fetch and
 * reacts to the Worker's actual response:
 *
 *   - Worker redirected (303 -> thank-you page): the only path that counts
 *     as success. Navigates there for real — there is no separate
 *     frontend-only "sent!" state (spec §9: "no fake frontend-only
 *     success").
 *   - Worker returned a JSON error body: mapped to one of the data-msg-*
 *     strings on the <form> (rendered from ui.js by contact-body.njk — see
 *     that file's header comment for why the strings live there, not here)
 *     and shown in the aria-live status region.
 *   - Network failure (fetch itself rejects): shown as the generic error.
 *
 * All user-facing strings are read from the form's own data attributes,
 * never hardcoded here — this file stays language-agnostic.
 */

(function () {
  "use strict";

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const statusEl = form.querySelector("[data-form-status]");
  const submitBtn = form.querySelector("[data-submit-btn]");
  const submitLabelEl = form.querySelector("[data-btn-label]");
  const msg = form.dataset;

  const fields = [
    { el: form.querySelector("#cf-name"), errorEl: document.getElementById("cf-name-error"), type: "required" },
    { el: form.querySelector("#cf-email"), errorEl: document.getElementById("cf-email-error"), type: "email" },
    { el: form.querySelector("#cf-message"), errorEl: document.getElementById("cf-message-error"), type: "required" },
  ];

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(field, text) {
    if (text) {
      field.el.setAttribute("aria-invalid", "true");
      field.errorEl.textContent = text;
      field.errorEl.hidden = false;
    } else {
      field.el.removeAttribute("aria-invalid");
      field.errorEl.textContent = "";
      field.errorEl.hidden = true;
    }
  }

  function validate() {
    let firstInvalid = null;

    for (const field of fields) {
      const value = field.el.value.trim();
      let error = "";

      if (!value) {
        error = msg.msgRequired;
      } else if (field.type === "email" && !EMAIL_RE.test(value)) {
        error = msg.msgEmail;
      }

      setFieldError(field, error);
      if (error && !firstInvalid) firstInvalid = field.el;
    }

    return firstInvalid;
  }

  function showStatus(kind, text) {
    statusEl.className = "form-status form-status--" + kind;
    statusEl.textContent = text;
    statusEl.hidden = false;
  }

  function hideStatus() {
    statusEl.hidden = true;
    statusEl.textContent = "";
  }

  function setSending(isSending) {
    submitBtn.disabled = isSending;
    submitLabelEl.textContent = isSending ? msg.sendingLabel : msg.submitLabel;
  }

  function directEmailLink(prefix) {
    const link = document.createElement("a");
    link.href = "mailto:" + msg.contactEmail;
    link.textContent = msg.contactEmail;
    const span = document.createElement("span");
    span.append(prefix + " ", link);
    return span;
  }

  function showErrorWithEmailFallback(text) {
    statusEl.className = "form-status form-status--error";
    statusEl.textContent = "";
    statusEl.append(directEmailLink(text));
    statusEl.hidden = false;
  }

  const ERROR_MESSAGES = {
    not_configured: () => showErrorWithEmailFallback(msg.msgNotConfigured),
    turnstile_failed: () => showStatus("error", msg.msgTurnstile),
    turnstile_unavailable: () => showStatus("error", msg.msgTurnstile),
    rate_limited: () => showStatus("error", msg.msgRateLimit),
    validation: () => showStatus("error", msg.msgGeneric),
    bad_request: () => showStatus("error", msg.msgGeneric),
    send_failed: () => showErrorWithEmailFallback(msg.msgSendFailed),
  };

  function resetTurnstile() {
    const widget = form.querySelector(".cf-turnstile");
    if (widget && window.turnstile) window.turnstile.reset(widget);
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    hideStatus();

    const firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const turnstileWidget = form.querySelector(".cf-turnstile");
    if (turnstileWidget) {
      const token = form.querySelector('[name="cf-turnstile-response"]');
      if (!token || !token.value) {
        showStatus("error", msg.msgTurnstile);
        return;
      }
    }

    setSending(true);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      let body = {};
      try {
        body = await response.json();
      } catch {
        // Non-JSON, non-redirect response -- fall through to the generic message.
      }

      const handler = ERROR_MESSAGES[body.error] || (() => showStatus("error", msg.msgGeneric));
      handler();
      resetTurnstile();
      setSending(false);
    } catch {
      showStatus("error", msg.msgGeneric);
      resetTurnstile();
      setSending(false);
    }
  });
})();
