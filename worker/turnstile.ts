/**
 * DIWEBA — Cloudflare Turnstile verification.
 *
 * SERVER-SIDE VERIFICATION IS MANDATORY (spec §9). The widget rendering in the
 * browser proves nothing on its own: a client can post any value it likes. The
 * token is only meaningful once exchanged with Cloudflare's siteverify endpoint
 * using the SECRET key, which exists solely as a Worker binding and never
 * reaches the browser.
 *
 * The site key is public and is rendered into the form by the build. The secret
 * key is set with `wrangler secret put TURNSTILE_SECRET_KEY`.
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  success: boolean;
  /** Present when verification could not be attempted at all. */
  unavailable?: boolean;
}

/**
 * Verify a Turnstile token.
 *
 * @param token   the `cf-turnstile-response` value from the submitted form
 * @param secret  TURNSTILE_SECRET_KEY binding
 * @param ip      the connecting IP, from the CF-Connecting-IP header
 */
export async function verifyTurnstile(
  token: string | null,
  secret: string | undefined,
  ip: string | null
): Promise<TurnstileResult> {
  // No secret configured. Fail CLOSED, never open: treating an unconfigured
  // Turnstile as "passed" would silently disable bot protection in production.
  if (!secret) {
    return { success: false, unavailable: true };
  }

  if (!token) {
    return { success: false };
  }

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const response = await fetch(SITEVERIFY_URL, { method: "POST", body });
    if (!response.ok) return { success: false, unavailable: true };

    const result = (await response.json()) as { success?: boolean };
    return { success: result.success === true };
  } catch {
    // Network failure reaching Cloudflare. Fail closed.
    return { success: false, unavailable: true };
  }
}
