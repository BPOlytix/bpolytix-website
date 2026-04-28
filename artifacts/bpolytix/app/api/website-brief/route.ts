import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const businessName = getStringField(formData, "businessName");
    const name = getStringField(formData, "name");
    const email = getStringField(formData, "email");
    const password = getStringField(formData, "password");
    const description = getStringField(formData, "description");
    const assetLink = getStringField(formData, "assetLink");
    const requirements = getStringField(formData, "requirements");
    const attachment = formData.get("attachment");

    if (!businessName || !name || !email || !password || !description) {
      return NextResponse.json(
        { error: "Missing required fields: businessName, name, email, password, description" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoConfirmUser: true } as never }
    );

    const formEmail = email;
    const formPassword = password;
    const formName = name;
    const formCompany = businessName;
    const formPhone = "";

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: formEmail,
        password: formPassword,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 }
      );
    }

    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: authData.user.id,
      email: formEmail,
      full_name: formName,
      company: formCompany,
      phone: formPhone,
      role: "client",
    });

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message || "Failed to create profile" },
        { status: 500 }
      );
    }

    const { data: projectData, error: projectError } = await supabaseAdmin
      .from("projects")
      .insert({
        user_id: authData.user.id,
        type: "web-build",
        status: "in-progress",
      })
      .select()
      .single();

    if (projectError || !projectData) {
      return NextResponse.json(
        { error: projectError?.message || "Failed to create project" },
        { status: 500 }
      );
    }

    const { error: stagesError } = await supabaseAdmin.from("project_stages").insert([
      {
        project_id: projectData.id,
        stage_name: "Details Received",
        stage_order: 1,
        status: "complete",
        completed_at: new Date().toISOString(),
      },
      { project_id: projectData.id, stage_name: "Planning & Sitemap", stage_order: 2, status: "pending" },
      { project_id: projectData.id, stage_name: "Design Mockup", stage_order: 3, status: "pending" },
      { project_id: projectData.id, stage_name: "Development", stage_order: 4, status: "pending" },
      { project_id: projectData.id, stage_name: "Client Review", stage_order: 5, status: "pending" },
      { project_id: projectData.id, stage_name: "Revisions", stage_order: 6, status: "pending" },
      { project_id: projectData.id, stage_name: "Go Live", stage_order: 7, status: "pending" },
    ]);

    if (stagesError) {
      return NextResponse.json(
        { error: stagesError.message || "Failed to create project stages" },
        { status: 500 }
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
      const originalName = attachment.name || "details-upload";
      const fileName = `${Date.now()}_${sanitizeFileName(originalName)}`;
      const fileBuffer = Buffer.from(await attachment.arrayBuffer());
      const contentType = attachment.type || "application/octet-stream";

      const { data, error } = await supabaseAdmin.storage
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

    const adminEmailPayload: Parameters<typeof resend.emails.send>[0] = {
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: "info@bpolytix.com",
      replyTo: email,
      subject: `New website details from ${businessName} — ${name}`,
      text,
    };

    const adminResult = await resend.emails.send(adminEmailPayload);

    if (adminResult.error) {
      return NextResponse.json(
        { error: adminResult.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    const confirmationResult = await resend.emails.send({
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: email,
      replyTo: "info@bpolytix.com",
      subject: "We've received your website details",
      html: buildConfirmationHtml(name, email),
    });

    if (confirmationResult.error) {
      return NextResponse.json(
        { error: confirmationResult.error.message || "Failed to send confirmation email" },
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

  return safeName || "details-upload";
}

function buildConfirmationHtml(clientName: string, clientEmail: string) {
  return `
    <div style="margin:0;padding:32px;background:#0D1B2A;color:#F5F7FA;font-family:'DM Sans',sans-serif;line-height:1.6;">
      <p style="margin:0 0 18px;">Hi ${escapeHtml(clientName)},</p>
      <p style="margin:0 0 18px;">We've received your website details. Your website is now in progress.</p>
      <p style="margin:0 0 10px;">You now have access to Your Website, where you can:</p>
      <ul style="margin:0 0 18px 20px;padding:0;">
        <li>Track your website progress over the next 72 hours</li>
        <li>Preview your website when it's ready</li>
        <li>Request changes</li>
        <li>Confirm the build to go live</li>
      </ul>
      <p style="margin:0 0 18px;">Log in to your portal: <a href="https://bpolytix.com/login" style="color:#1B77F2;">https://bpolytix.com/login</a></p>
      <p style="margin:0 0 6px;">Your login email: ${escapeHtml(clientEmail)}</p>
      <p style="margin:0 0 18px;">Your password: the one you created when submitting your details.</p>
      <p style="margin:0 0 18px;">If you have any questions, reply to this email or WhatsApp us at +27 78 179 0363.</p>
      <p style="margin:0;">&mdash; The BPOLytix Build Team</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
