import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendKey = process.env.RESEND_API_KEY || "";
const resend = resendKey ? new Resend(resendKey) : null;

const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const FROM_EMAIL = process.env.FROM_EMAIL || "orders@yourdomain.com";
const SITE_NAME = process.env.SITE_NAME || "Lexylon";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support both { lines: [...] } and legacy { line1, line2, line3 }
    const lines: string[] = Array.isArray(body?.lines)
      ? body.lines
      : [body?.line1, body?.line2, body?.line3].filter(Boolean);

    const { font, finish, height, email, notes } = body || {};
    if (!lines?.[0] || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    const textBlock = lines.join("<br/>");

    const ownerHtml = `
      <h2>New Order (#${orderId}) — ${SITE_NAME}</h2>
      <p><b>Text:</b><br/>${textBlock}</p>
      <p><b>Font:</b> ${font || "-"}</p>
      <p><b>Finish:</b> ${finish || "-"}</p>
      <p><b>Height:</b> ${height || "-"}</p>
      <p><b>Customer email:</b> ${email}</p>
      <p><b>Notes:</b><br/>${(notes || "").replace(/\n/g, "<br/>")}</p>
    `;

    const customerHtml = `
      <h2>Thanks for your order! (#${orderId})</h2>
      <p>We’ve received your request for a custom wooden sign with the text:</p>
      <blockquote style="border-left:4px solid #ddd;padding-left:8px;margin:8px 0">${textBlock}</blockquote>
      <p><b>Your selections</b><br>
      Font: ${font || "-"}<br>
      Finish: ${finish || "-"}<br>
      Height: ${height || "-"}</p>
      <p>We’ll email you within 24 hours to confirm price, timing, and shipping.
      To update anything, just reply to this email and mention your order ID <b>${orderId}</b>.</p>
      <p>— ${SITE_NAME}</p>
    `;

    if (resend) {
      await resend.emails.send({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: OWNER_EMAIL,
        subject: `New Order #${orderId}`,
        html: ownerHtml,
        replyTo: email,
      });

      await resend.emails.send({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: email,
        subject: `We got your order (#${orderId}) — ${SITE_NAME}`,
        html: customerHtml,
      });
    } else {
      console.warn("RESEND_API_KEY not set — skipping email send in this environment.");
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (e) {
    console.error(e);
    // Always return JSON so the client never hits “Unexpected end of JSON”
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
