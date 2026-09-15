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
  /** Destination for contact notifications. Confirmed: hello@diweba.de.
   *  Still supplied as a secret/env var, never hardcoded here — see
   *  .env.example. Phase 3B did not create a real .env; this stays unset
   *  in this environment, and the Worker's own "not_configured" check
   *  (index.ts) is what keeps the endpoint failing safely until it is. */
  CONTACT_NOTIFY_EMAIL?: string;

  // --- Non-secret configuration ---------------------------------------------
  SITE_URL?: string;
  SITE_ENV?: string;
}

/**
 * A contact submission after server-side validation has passed.
 *
 * No `phone` field — DIWEBA's public contact surface deliberately excludes
 * a telephone number (Phase 3B instruction, company.js's `phone: null`).
 * Removed from the type entirely rather than left as an always-empty
 * string, so a future form change can't silently start collecting it again
 * without this type visibly changing too.
 */
export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
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
