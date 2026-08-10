import { NextResponse } from "next/server";
import { z } from "zod";

import { resend, RESEND_FROM } from "@/lib/resend";
import { SITE } from "@/lib/data";

/* Server-side validation — never trust the client, even though the form
   validates with the same rules via react-hook-form + zod. */
const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please fill in the form correctly." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Demo mode: no API key configured yet. Let the UI show its hint instead
    // of failing, so the form remains fully testable before adding a key.
    if (!resend) {
      console.info(
        "[contact] Demo mode — RESEND_API_KEY not set. Ignoring message:",
        { name, email, subject }
      );
      return NextResponse.json({ emailProviderConfigured: false });
    }

    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: process.env.CONTACT_EMAIL || SITE.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { message: "We couldn't send your message right now. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emailProviderConfigured: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { message: "Something went wrong sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
