import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const businessName = getStringField(formData, "businessName");
    const name = getStringField(formData, "name");
    const email = getStringField(formData, "email");
    const description = getStringField(formData, "description");
    const assetLink = getStringField(formData, "assetLink");
    const requirements = getStringField(formData, "requirements");
    const attachment = formData.get("attachment");

    if (!businessName || !name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, name, email, description" },
        { status: 400 }
      );
    }

    let uploadedFile:
      | {
          originalName: string;
          path: string;
          contentType: string;
          size: number;
        }
      | null = null;

    if (attachment instanceof File && attachment.size > 0) {
      const supabase = await createClient();
      const originalName = attachment.name || "brief-upload";
      const fileName = `${Date.now()}_${sanitizeFileName(originalName)}`;
      const fileBuffer = Buffer.from(await attachment.arrayBuffer());
      const contentType = attachment.type || "application/octet-stream";

      const { data, error } = await supabase.storage
        .from("website-briefs")
        .upload(fileName, fileBuffer, {
          contentType,
          upsert: false,
        });

      if (error) {
        return NextResponse.json(
          { error: error.message || "Failed to upload file" },
          { status: 500 }
        );
      }

      uploadedFile = {
        originalName,
        path: data.path,
        contentType,
        size: attachment.size,
      };
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
      ``,
      `Uploaded file:`,
      uploadedFile
        ? [
            `Original filename: ${uploadedFile.originalName}`,
            `Storage bucket: website-briefs`,
            `Storage path: ${uploadedFile.path}`,
            `Content type: ${uploadedFile.contentType}`,
            `Size: ${uploadedFile.size} bytes`,
          ].join("\n")
        : "(none provided)",
    ].join("\n");

    const emailPayload: Parameters<typeof resend.emails.send>[0] = {
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: "mitesh@bpolytix.com",
      replyTo: email,
      subject: `New website brief from ${businessName} — ${name}`,
      text,
    };

    const result = await resend.emails.send(emailPayload);

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

function getStringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeFileName(fileName: string) {
  const safeName = fileName
    .replace(/[\\/]/g, "_")
    .replace(/\0/g, "")
    .trim();

  return safeName || "brief-upload";
}
