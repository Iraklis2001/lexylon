# Lexylon — Custom Wooden Letter Signs

**Live site: [lexylon.vercel.app](https://lexylon.vercel.app)**

Bilingual (Greek / English) website for Lexylon, a business making custom cut wooden letter
signs and name plaques for weddings, birthdays, newborns, classrooms and gifts. Visitors browse
the gallery, read how the pieces are made, and submit a made-to-order request that is emailed
straight to the owner.

## Features

- **Greek / English switch** and light / dark theme, handled by a shared UI provider
- **Pages** — home with a fading hero slideshow, gallery, order, process, about and FAQ
- **Order form** capturing the text lines, size (A5 / A4 / A3), finish (unpainted or painted),
  colour choice, who does the painting, and free-text notes
- **Order delivery by email** — submissions are formatted into an HTML summary with a generated
  order reference and sent through [Resend](https://resend.com)
- Keyboard and pointer controls on the hero slideshow, with pause on hover

## Stack

Next.js 15 (App Router, route groups) · React 19 · TypeScript · Resend · Vercel

## Environment variables

Create `.env.local` before running:

```bash
RESEND_API_KEY=your_resend_api_key
OWNER_EMAIL=where_orders_should_arrive@example.com
FROM_EMAIL=orders@yourdomain.com
SITE_NAME=Lexylon
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Home page and hero slideshow |
| `app/(inner)/` | Gallery, order, process, about and FAQ pages |
| `app/api/order/route.ts` | Validates an order and emails it via Resend |
| `app/providers.tsx` | Language dictionary and theme state |
| `app/components/` | `ContactBar`, `FAQSection` |
| `public/slides/` | Hero slideshow images |
