/**
 * DIWEBA — Worker environment and shared types.
 *
 * Every secret is declared here as a binding, never read from a literal in
 * source. Values are supplied by:
 *   production — `wrangler secret put <NAME>`
 *   local dev  — `.dev.vars` (gitignored)
 */

export interface Env {
  /** Static assets binding, configured in wrangler.jsonc. */
  ASSETS: Fetcher;

  /** Per-IP submission throttle for the contact endpoint. */
  RATE_LIMIT: KVNamespace;

  // --- Secrets — never reach the browser ------------------------------------
  /** Turnstile server-side verification. */
  TURNSTILE_SECRET_KEY?: string;
  /** Brevo transactional email. */
  BREVO_API_KEY?: string;
  /** Verified Brevo sender. Domain needs SPF, DKIM and DMARC on diweba.de. */
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  /** Destination for contact notifications. Unresolved — see spec §1. */
  CONTACT_NOTIFY_EMAIL?: string;

  // --- Non-secret configuration ---------------------------------------------
  SITE_URL?: string;
  SITE_ENV?: string;
}

/** A contact submission after server-side validation has passed. */
export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone: string;
  packageInterest: string;
  message: string;
  lang: "de" | "en";
}

/** Field-level validation failure, returned to the client for display. */
export interface FieldError {
  field: string;
  code: "required" | "invalid" | "too_long";
}

export type ValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: FieldError[] };
