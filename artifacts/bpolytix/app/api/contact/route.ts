import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, company, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 500 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const companyLabel = company && String(company).trim() ? company : "no company";

    const text = [
      `Name: ${name}`,
      `Company: ${company || "(not provided)"}`,
      `Email: ${email}`,
      `Service: ${service || "(not specified)"}`,
      ``,
      `Message:`,
      `${message}`,
    ].join("\n");

    const result = await resend.emails.send({
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: "mitesh@bpolytix.com",
      replyTo: email,
      subject: `New enquiry from ${name} — ${companyLabel}`,
      text,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
