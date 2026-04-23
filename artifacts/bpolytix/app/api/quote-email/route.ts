import { NextResponse } from "next/server";
import { Resend } from "resend";

type ServicePayload = {
  label: string;
  inHouse: number;
  bpolytixFee: number;
  saving: number;
  savingPercent?: number;
  kind: "monthly" | "project";
};

type Body = {
  name?: string;
  email?: string;
  company?: string;
  industry?: string;
  quoteRef?: string;
  date?: string;
  services?: ServicePayload[];
  totalAnnualSaving?: number;
  currency?: "ZAR" | "GBP";
};

function symbol(currency: "ZAR" | "GBP"): string {
  return currency === "GBP" ? "£" : "R";
}

function fmt(value: number, currency: "ZAR" | "GBP"): string {
  return `${symbol(currency)}${Math.round(value).toLocaleString("en-ZA")}`;
}

function suffix(kind: "monthly" | "project"): string {
  return kind === "monthly" ? "/mo" : " project";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildAdminText(b: Required<Body>): string {
  const lines: string[] = [
    `New calculator quote`,
    ``,
    `Quote ref: ${b.quoteRef}`,
    `Date: ${b.date}`,
    `Industry: ${b.industry}`,
    ``,
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `Company: ${b.company || "(not provided)"}`,
    ``,
    `Services:`,
  ];
  for (const s of b.services) {
    lines.push(
      `  - ${s.label}: in-house ${fmt(s.inHouse, b.currency)}${suffix(s.kind)}, ` +
        `BPOLytix ${fmt(s.bpolytixFee, b.currency)}${suffix(s.kind)}, ` +
        `saving ${fmt(s.saving, b.currency)}${suffix(s.kind)}`,
    );
  }
  lines.push(``, `Total annual saving: ${fmt(b.totalAnnualSaving, b.currency)}`);
  return lines.join("\n");
}

function buildProspectHtml(b: Required<Body>): string {
  const rows = b.services
    .map((s) => {
      const sfx = suffix(s.kind);
      const pct =
        typeof s.savingPercent === "number"
          ? ` &nbsp;<span style="color:#8892A4;font-size:12px;">(${s.savingPercent.toFixed(0)}%)</span>`
          : "";
      return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #1E2D3D;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#F5F7FA;font-weight:500;">
              ${escapeHtml(s.label)}
            </div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8892A4;margin-top:2px;">
              In-house: ${fmt(s.inHouse, b.currency)}${sfx} &nbsp;|&nbsp;
              BPOLytix: ${fmt(s.bpolytixFee, b.currency)}${sfx}
            </div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #1E2D3D;text-align:right;vertical-align:top;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#00D4AA;font-weight:700;">
              ${fmt(s.saving, b.currency)}${sfx}
            </div>${pct}
          </td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#0D1B2A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D1B2A;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#111F2E;border:1px solid #1E2D3D;border-radius:16px;padding:28px;max-width:600px;">
            <tr>
              <td>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;">
                      <span style="font-size:18px;font-weight:700;color:#F5F7FA;">BPOLytix</span>
                      <span style="font-size:12px;color:#8892A4;margin-left:8px;">Cost Analysis &amp; Quote</span>
                    </td>
                    <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8892A4;">
                      ${escapeHtml(b.quoteRef)}<br/>
                      ${escapeHtml(b.date)}<br/>
                      <span style="color:#1B77F2;">${escapeHtml(b.industry)}</span>
                    </td>
                  </tr>
                </table>

                <hr style="border:0;border-top:1px solid #1E2D3D;margin:20px 0;" />

                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#F5F7FA;line-height:1.6;margin:0 0 16px 0;">
                  Hi ${escapeHtml(b.name)},
                </p>
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#8892A4;line-height:1.6;margin:0 0 20px 0;">
                  Here is the cost analysis you generated. Reference this quote when you'd like to take the next step — we're standing by.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#F5F7FA;font-weight:700;">
                      Total annual saving
                    </td>
                    <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:32px;color:#00D4AA;font-weight:700;line-height:1;">
                      ${fmt(b.totalAnnualSaving, b.currency)}
                    </td>
                  </tr>
                </table>

                <hr style="border:0;border-top:1px solid #1E2D3D;margin:20px 0;" />

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8892A4;">
                      No invoice until you're satisfied.
                    </td>
                    <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8892A4;">
                      You own it after 12 months.
                    </td>
                  </tr>
                </table>

                <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#F5F7FA;line-height:1.6;margin:24px 0 0 0;">
                  We'll be in touch within 1 business day.<br/>
                  No invoice until you're satisfied.
                </p>
                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8892A4;line-height:1.6;margin:16px 0 0 0;">
                  — The BPOLytix team<br/>
                  <a href="https://bpolytix.com" style="color:#1B77F2;text-decoration:none;">bpolytix.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as Body;

    const name = (raw.name || "").trim();
    const email = (raw.email || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, email" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const body: Required<Body> = {
      name,
      email,
      company: raw.company || "",
      industry: raw.industry || "(not specified)",
      quoteRef: raw.quoteRef || "BPQ-?",
      date: raw.date || new Date().toISOString().slice(0, 10),
      services: Array.isArray(raw.services) ? raw.services : [],
      totalAnnualSaving:
        typeof raw.totalAnnualSaving === "number" ? raw.totalAnnualSaving : 0,
      currency: raw.currency === "GBP" ? "GBP" : "ZAR",
    };

    const resend = new Resend(apiKey);

    const adminResult = await resend.emails.send({
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: "mitesh@bpolytix.com",
      replyTo: email,
      subject: `New calculator quote — ${body.quoteRef} — ${body.industry}`,
      text: buildAdminText(body),
    });

    if (adminResult.error) {
      return NextResponse.json(
        {
          error:
            adminResult.error.message || "Failed to send admin notification",
        },
        { status: 500 },
      );
    }

    const prospectResult = await resend.emails.send({
      from: "BPOLytix <no-reply@bpolytix.com>",
      to: email,
      replyTo: "mitesh@bpolytix.com",
      subject: `Your BPOLytix cost analysis — ${body.quoteRef}`,
      html: buildProspectHtml(body),
    });

    if (prospectResult.error) {
      return NextResponse.json(
        {
          error:
            prospectResult.error.message || "Failed to send prospect quote",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
