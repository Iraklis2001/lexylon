// app/api/order/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// --- Resend setup (env required) ---
const resendKey = process.env.RESEND_API_KEY || "";
const resend = resendKey ? new Resend(resendKey) : null;

// Who receives internal orders & who we send "from"
const OWNER_EMAIL = process.env.OWNER_EMAIL!;               // e.g. you@yourdomain.com
const FROM_EMAIL  = process.env.FROM_EMAIL || "orders@yourdomain.com";
const SITE_NAME   = process.env.SITE_NAME || "Lexylon";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Your new payload from app/order/page.tsx
    const {
      lines = [],
      size,                          // "A5" | "A4" | "A3"
      finish,                        // "unpainted" or "paint:Color"
      painter,                       // "woodmaster" | "designx" | "toxicw" | null
      paintSurchargeEUR,             // 0,5,10,15
      email,                         // customer email (required)
      notes = "",
      letterCount,                   // number
    } = body || {};

    // Minimal validation
    if (!email || !Array.isArray(lines) || !lines[0]) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();

    // Format helpers
    const textBlock = lines.filter(Boolean).map(l => escapeHtml(l)).join("<br/>");
    const painterLabel =
      painter === "woodmaster" ? "Woodmaster — Xenios Charampus"
    : painter === "designx"   ? "Design X"
    : painter === "toxicw"    ? "Toxicw"
    : "";

    // Build a nice details table for both emails
    const detailsTable = `
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 8px;"><b>Size</b></td><td style="padding:4px 8px;">${size || "-"}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Finish</b></td><td style="padding:4px 8px;">${finish || "-"}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Painter</b></td><td style="padding:4px 8px;">${painterLabel || "-"}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Paint surcharge</b></td><td style="padding:4px 8px;">€${Number(paintSurchargeEUR || 0)}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Total letters</b></td><td style="padding:4px 8px;">${letterCount ?? "-"}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Customer email</b></td><td style="padding:4px 8px;">${escapeHtml(email)}</td></tr>
      </table>
    `;

    // --- Owner email (to you) ---
    const ownerHtml = `
      <h2>New Order (#${orderId}) — ${SITE_NAME}</h2>
      <p><b>Text</b><br/>${textBlock}</p>
      ${detailsTable}
      <p style="margin-top:10px;"><b>Notes</b><br/>${escapeHtml(notes).replace(/\n/g, "<br/>") || "-"}</p>
    `;

    // --- Customer confirmation email ---
    const customerHtml = `
      <h2>Thanks for your order! (#${orderId})</h2>
      <p>We’ve received your request for a custom wooden sign with the text:</p>
      <blockquote style="border-left:4px solid #ddd;padding-left:8px;margin:8px 0">${textBlock}</blockquote>
      <p><b>Your selections</b></p>
      ${detailsTable}
      <p>We’ll email you within 24 hours to confirm price, timing, and shipping.
      To update anything, just reply to this email and mention your order ID <b>${orderId}</b>.</p>
      <p>— ${SITE_NAME}</p>
    `;

    // Send via Resend (or skip in dev if no API key)
    if (resend) {
      await resend.emails.send({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: OWNER_EMAIL,
        subject: `New Order #${orderId}`,
        html: ownerHtml,
        replyTo: email, // reply goes straight to the customer
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
    // Always return JSON (prevents “Unexpected end of JSON” on the client)
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}

// Basic HTML escape (so people can’t inject HTML into the email)
function escapeHtml(s: string = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
