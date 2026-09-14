/**
 * DIWEBA — Brevo transactional email boundary.
 *
 * THE API KEY NEVER REACHES THE BROWSER. It exists only as a Worker secret,
 * set with `wrangler secret put BREVO_API_KEY`. All Brevo traffic originates
 * here, server-side. No Brevo SDK is loaded on the client, ever.
 *
 * LOGGING POLICY
 * Submissions contain personal data. This module logs only:
 *   - the outcome (sent / failed)
 *   - the HTTP status from Brevo
 *   - a short error string from Brevo
 * It never logs the message body, the sender's email, the name, or the API key.
 * Worker logs are operational telemetry, not a store of customer data.
 *
 * DELIVERABILITY PREREQUISITE
 * The sender domain must have SPF, DKIM and DMARC configured on diweba.de and
 * be verified in Brevo before sending is reliable. DNS propagation and Brevo
 * verification both take time — start this early (spec §9).
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export interface BrevoSendResult {
  ok: boolean;
  status?: number;
  error?: string;
}

interface BrevoParty {
  email: string;
  name?: string;
}

interface SendArgs {
  apiKey: string;
  sender: BrevoParty;
  to: BrevoParty[];
  replyTo?: BrevoParty;
  subject: string;
  /** Plain text only. No HTML email templates at this stage. */
  textContent: string;
}

/**
 * Send one transactional email.
 *
 * Returns a result rather than throwing: a failed notification must not turn
 * into a 500 for the visitor, who has already submitted a valid form and should
 * still reach the thank-you page. The caller decides how to surface it.
 */
export async function sendTransactional(
  args: SendArgs
): Promise<BrevoSendResult> {
  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": args.apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: args.sender,
        to: args.to,
        replyTo: args.replyTo,
        subject: args.subject,
        textContent: args.textContent,
      }),
    });

    if (!response.ok) {
      // Brevo's error body is small and contains no submission content.
      const detail = await response.text().catch(() => "");
      return {
        ok: false,
        status: response.status,
        error: detail.slice(0, 200),
      };
    }

    return { ok: true, status: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown transport error",
    };
  }
}
