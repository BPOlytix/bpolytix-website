import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const {
      businessName,
      name,
      email,
      description,
      assetLink,
      requirements,
    } = await req.json();

    if (!businessName || !name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, name, email, description" },
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

    const text = [
      `Business name: ${businessName}`,
      `Contact name: ${name}`,
      `Email: ${email}`,
      ``,
      `What the business does:`,
      `${description}`,
      ``,
      `Assets / brand link: ${assetLink && String(assetLink).trim() ? assetLink : "(none provided)"}`,
      ``,
      `Specific requirements:`,
      `${requirements && String(requirements).trim() ? requirements : "(none provided)"}`,
    ].join("\n");

    const result = await resend.emails.send({
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: "mitesh@bpolytix.com",
      replyTo: email,
      subject: `New website brief from ${businessName} — ${name}`,
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
