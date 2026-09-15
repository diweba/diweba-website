/**
 * DIWEBA — server-side form validation.
 *
 * THE SERVER IS THE ONLY AUTHORITY (spec §9). Client-side validation exists to
 * give fast feedback; it is trivially bypassed and is never trusted. Every field
 * is re-checked here regardless of what the browser claims to have validated.
 */

import type { ContactSubmission, FieldError, ValidationResult } from "./types";

const LIMITS = {
  name: 120,
  email: 254, // RFC 5321 maximum
  company: 160,
  packageInterest: 40,
  message: 5000,
} as const;

/** Deliberately permissive. Real deliverability is proven by sending, not regex. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_PACKAGES = new Set(["start", "plus", "unsure", ""]);

/**
 * FormData.get() returns `string | File | null` in the Workers runtime.
 * `FormDataEntryValue` is a DOM lib type and is not available here, so the union
 * is written out rather than imported from a lib this project does not include.
 */
function clean(value: string | File | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(form: FormData): ValidationResult {
  const errors: FieldError[] = [];

  const name = clean(form.get("name"));
  const email = clean(form.get("email"));
  const company = clean(form.get("company"));
  const packageInterest = clean(form.get("package")).toLowerCase();
  const message = clean(form.get("message"));
  const lang = clean(form.get("lang")) === "en" ? "en" : "de";

  if (!name) errors.push({ field: "name", code: "required" });
  else if (name.length > LIMITS.name)
    errors.push({ field: "name", code: "too_long" });

  if (!email) errors.push({ field: "email", code: "required" });
  else if (email.length > LIMITS.email)
    errors.push({ field: "email", code: "too_long" });
  else if (!EMAIL_PATTERN.test(email))
    errors.push({ field: "email", code: "invalid" });

  if (!message) errors.push({ field: "message", code: "required" });
  else if (message.length > LIMITS.message)
    errors.push({ field: "message", code: "too_long" });

  if (company.length > LIMITS.company)
    errors.push({ field: "company", code: "too_long" });

  // Reject unexpected values rather than passing them through to the email body.
  if (!ALLOWED_PACKAGES.has(packageInterest))
    errors.push({ field: "package", code: "invalid" });

  if (errors.length) return { ok: false, errors };

  const data: ContactSubmission = {
    name,
    email,
    company,
    packageInterest,
    message,
    lang,
  };

  return { ok: true, data };
}

/**
 * Honeypot. A hidden field no human can see; bots fill it because it is in the
 * DOM. A filled honeypot is silently accepted from the bot's point of view — it
 * receives a normal-looking response — so it gets no signal to retry differently.
 */
export function isHoneypotTripped(form: FormData): boolean {
  return clean(form.get("website")) !== "";
}
