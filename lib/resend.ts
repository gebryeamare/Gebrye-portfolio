import { Resend } from "resend";

/**
 * Resend client for the contact form.
 *
 * When `RESEND_API_KEY` is not configured the client is `null`, which the
 * contact route reports back to the UI so it can show its demo-mode message.
 */
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** Verified "from" address used for outgoing messages. */
export const RESEND_FROM =
  process.env.RESEND_EMAIL_FROM ?? "Portfolio <onboarding@resend.dev>";
