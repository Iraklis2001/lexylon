// app/api/order/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resendKey = process.env.RESEND_API_KEY || '';
const resend = resendKey ? new Resend(resendKey) : null;

const OWNER_EMAIL = process.env.OWNER_EMAIL!;
const FROM_EMAIL  = process.env.FROM_EMAIL || 'orders@yourdomain.com';
const SITE_NAME   = process.env.SITE_NAME || 'Lexylon';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Payload expected from your Order page:
    // {
    //   lines: string[],
    //   size: 'A5'|'A4'|'A3',
    //   finish: 'unpainted'|'painted',
    //   color: { name: string; hex: string } | null,   // if painted
    //   paintBy: 'none'|'lexylon'|'customer',
    //   email: string,
    //   notes?: string,
    //   letterCount: number
    // }
    const {
      lines = [],
      size,
      finish,
      color = null,
      paintBy,
      email,
      notes = '',
      letterCount,
    } = body || {};

    if (!email || !Array.isArray(lines) || !lines[0]) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();

    const paintByLabel =
      paintBy === 'lexylon' ? 'Lexylon'
    : paintBy === 'customer' ? 'Customer'
    : 'No preference';

    const textBlock = lines
      .filter(Boolean)
      .map(l => escapeHtml(l))
      .join('<br/>');

    const colorRow = color
      ? `<tr><td style="padding:4px 8px;"><b>Color</b></td><td style="padding:4px 8px;">
            ${escapeHtml(color.name)} <span style="display:inline-block;width:10px;height:10px;background:${color.hex};border:1px solid #ccc;margin-left:6px;vertical-align:middle"></span> (${color.hex})
         </td></tr>`
      : '';

    const detailsTable = `
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 8px;"><b>Size</b></td><td style="padding:4px 8px;">${escapeHtml(size)}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Finish</b></td><td style="padding:4px 8px;">${escapeHtml(finish)}</td></tr>
        ${colorRow}
        <tr><td style="padding:4px 8px;"><b>Paint by</b></td><td style="padding:4px 8px;">${escapeHtml(paintByLabel)}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Total letters</b></td><td style="padding:4px 8px;">${Number(letterCount ?? 0)}</td></tr>
        <tr><td style="padding:4px 8px;"><b>Customer email</b></td><td style="padding:4px 8px;">${escapeHtml(email)}</td></tr>
      </table>
    `;

    // Owner email
    const ownerHtml = `
      <h2>New Order (#${orderId}) — ${SITE_NAME}</h2>
      <p><b>Text</b><br/>${textBlock}</p>
      ${detailsTable}
      <p style="margin-top:10px;"><b>Notes</b><br/>${escapeHtml(notes).replace(/\n/g, '<br/>') || '-'}</p>
    `;

    // Customer confirmation
    const customerHtml = `
      <h2>Thanks for your order! (#${orderId})</h2>
      <p>We’ve received your request for a custom wooden sign with the text:</p>
      <blockquote style="border-left:4px solid #ddd;padding-left:8px;margin:8px 0">${textBlock}</blockquote>
      <p><b>Your selections</b></p>
      ${detailsTable}
      <p>We’ll email you within 24 hours to confirm price, timing, and shipping.
      To update anything, reply to this email and include your order ID <b>${orderId}</b>.</p>
      <p>— ${SITE_NAME}</p>
    `;

    if (resend) {
      // to owner
      await resend.emails.send({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: OWNER_EMAIL,
        subject: `New Order #${orderId}`,
        html: ownerHtml,
        replyTo: email,
      });

      // confirmation to customer
      await resend.emails.send({
        from: `${SITE_NAME} <${FROM_EMAIL}>`,
        to: email,
        subject: `We got your order (#${orderId}) — ${SITE_NAME}`,
        html: customerHtml,
      });
    } else {
      console.warn('RESEND_API_KEY not set — skipping email send.');
    }

    return NextResponse.json({ ok: true, orderId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}

function escapeHtml(s: string = '') {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
