/**
 * DIWEBA — Cloudflare Worker entry point.
 *
 * Responsibilities:
 *   1. POST /api/contact — form handling (Turnstile, validation, rate limit, Brevo)
 *   2. Correct 404 status for unmatched routes
 *   3. Everything else passes through to static assets
 *
 * WHY worker/ AND NOT functions/
 * Cloudflare Pages Functions use a functions/ directory with file-based routing.
 * This project deploys as a WORKER with static assets, which has a single entry
 * point instead — one fetch handler that decides between API routes and assets.
 * Pages is in maintenance mode; Workers is Cloudflare's current recommendation
 * and is what the spec selected (§7).
 *
 * PHASE 1 SCOPE
 * The contact endpoint's structure, validation and boundaries are complete, but
 * it is INACTIVE until secrets exist: it returns 503 while unconfigured rather
 * than pretending to accept submissions. There is no stub that swallows a
 * message and reports success.
 */

import type { Env } from "./types";
import { verifyTurnstile } from "./turnstile";
import { validateContact, isHoneypotTripped } from "./validate";
import { sendTransactional } from "./brevo";

/** Rate limit: submissions allowed per IP per window. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;

/** Thank-you routes, mirroring src/_data/routes.js. */
const THANKS_PATH = {
  de: "/kontakt/danke/",
  en: "/en/contact/thank-you/",
} as const;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { allow: "POST" },
        });
      }
      return handleContact(request, env, ctx);
    }

    // Static assets. The binding resolves directories to index.html and returns
    // 404 for anything missing, which we convert into the real 404 page below.
    const response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      const notFound = await env.ASSETS.fetch(
        new Request(new URL("/404.html", url.origin), request)
      );
      // Genuine 404 status — serving the error page as 200 would let it be
      // indexed as a real page (spec §10).
      return new Response(notFound.body, {
        status: 404,
        headers: notFound.headers,
      });
    }

    return response;
  },
} satisfies ExportedHandler<Env>;

async function handleContact(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  // Refuse to pretend. Without secrets the endpoint cannot verify a human or
  // send mail, so it reports unavailable rather than accepting and discarding.
  if (!env.TURNSTILE_SECRET_KEY || !env.BREVO_API_KEY || !env.CONTACT_NOTIFY_EMAIL) {
    return json(
      { ok: false, error: "not_configured" },
      503,
      "Contact endpoint is not configured yet. See .env.example and docs/DIWEBA_PHASE_0_SPEC.md §9."
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const lang = form.get("lang") === "en" ? "en" : "de";

  // Honeypot: respond as though accepted so the bot learns nothing, but do no work.
  if (isHoneypotTripped(form)) {
    return redirectTo(THANKS_PATH[lang], request);
  }

  const ip = request.headers.get("CF-Connecting-IP");

  const turnstile = await verifyTurnstile(
    typeof form.get("cf-turnstile-response") === "string"
      ? (form.get("cf-turnstile-response") as string)
      : null,
    env.TURNSTILE_SECRET_KEY,
    ip
  );

  if (!turnstile.success) {
    return json(
      { ok: false, error: turnstile.unavailable ? "turnstile_unavailable" : "turnstile_failed" },
      turnstile.unavailable ? 503 : 403
    );
  }

  if (ip && (await isRateLimited(env, ip))) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const result = validateContact(form);
  if (!result.ok) {
    return json({ ok: false, error: "validation", errors: result.errors }, 422);
  }

  const submission = result.data;

  const notification = await sendTransactional({
    apiKey: env.BREVO_API_KEY,
    sender: {
      email: env.BREVO_SENDER_EMAIL ?? "",
      name: env.BREVO_SENDER_NAME ?? "DIWEBA",
    },
    to: [{ email: env.CONTACT_NOTIFY_EMAIL }],
    replyTo: { email: submission.email, name: submission.name },
    subject: `Anfrage über diweba.de — ${submission.name}`,
    textContent: buildNotificationText(submission),
  });

  if (!notification.ok) {
    // Log the outcome only — never the submission content (see brevo.ts).
    console.error("contact: notification failed", {
      status: notification.status,
      error: notification.error,
    });
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return redirectTo(THANKS_PATH[submission.lang], request);
}

function buildNotificationText(s: {
  name: string;
  email: string;
  company: string;
  packageInterest: string;
  message: string;
  lang: string;
}): string {
  return [
    `Name:      ${s.name}`,
    `E-Mail:    ${s.email}`,
    `Firma:     ${s.company || "—"}`,
    `Interesse: ${s.packageInterest || "—"}`,
    `Sprache:   ${s.lang}`,
    "",
    s.message,
  ].join("\n");
}

async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  const key = `contact:${ip}`;
  const current = Number((await env.RATE_LIMIT.get(key)) ?? "0");

  if (current >= RATE_LIMIT_MAX) return true;

  await env.RATE_LIMIT.put(key, String(current + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return false;
}

function redirectTo(path: string, request: Request): Response {
  const origin = new URL(request.url).origin;
  return Response.redirect(`${origin}${path}`, 303);
}

function json(
  body: Record<string, unknown>,
  status: number,
  hint?: string
): Response {
  return new Response(JSON.stringify(hint ? { ...body, hint } : body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
