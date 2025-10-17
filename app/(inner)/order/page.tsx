'use client';

import * as React from 'react';
import { useUI } from '../../providers';

type Status = 'idle' | 'sending' | 'ok' | 'error';

type OrderResponse = { ok?: boolean; orderId?: string; error?: string };

const COLORS = ['Black', 'White', 'Red', 'Green', 'Blue', 'Yellow', 'Orange'] as const;
type Color = (typeof COLORS)[number];

type PainterKey = 'woodmaster' | 'designx' | 'toxicw';
const PAINTERS: Record<PainterKey, { label: string; price: number }> = {
  woodmaster: { label: 'Woodmaster — Xenios Charampus', price: 5 },
  designx: { label: 'Design X', price: 10 },
  toxicw: { label: 'Toxicw', price: 15 },
};

export default function OrderPage() {
  const { lang } = useUI();
  const isEl = lang === 'el';

  const [status, setStatus] = React.useState<Status>('idle');
  const [msg, setMsg] = React.useState('');

  const [lines, setLines] = React.useState<string[]>(['']);
  const [size, setSize] = React.useState<'A5' | 'A4' | 'A3'>('A4');

  const [finish, setFinish] = React.useState<'unpainted' | 'painted'>('unpainted');
  const [color, setColor] = React.useState<Color | ''>('');
  const [painter, setPainter] = React.useState<PainterKey | ''>('');

  const letterCount = lines.join('').replace(/\s/g, '').length;
  const surcharge = finish === 'painted' && painter ? PAINTERS[painter].price : 0;

  const addLine = () => {
    if (lines.length < 3) setLines(prev => [...prev, '']);
  };

  const removeLine = (i: number) => {
    if (lines.length <= 1) return;
    const copy = [...lines];
    copy.splice(i, 1);
    setLines(copy);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMsg('');

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement)?.value || '';

    // Basic validation: if painted, color is required.
    if (finish === 'painted' && !color) {
      setStatus('error');
      setMsg(isEl ? 'Επιλέξτε χρώμα βαφής.' : 'Please choose a paint color.');
      return;
    }

    const payload = {
      lines,
      size,                              // A5 / A4 / A3
      finish: finish === 'painted' ? `paint:${color}` : 'unpainted',
      painter: painter || null,          // woodmaster / designx / toxicw
      paintSurchargeEUR: surcharge,      // 0, 5, 10, 15
      email,
      notes,
      letterCount,
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: OrderResponse = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Submit failed');

      setStatus('ok');
      setMsg(
        isEl
          ? `Ευχαριστούμε! Ο κωδικός παραγγελίας σας είναι ${data.orderId}.`
          : `Thanks! Your order ID is ${data.orderId}.`
      );

      // Reset
      setLines(['']);
      setSize('A4');
      setFinish('unpainted');
      setColor('');
      setPainter('');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMsg(err instanceof Error ? err.message : isEl ? 'Κάτι πήγε στραβά.' : 'Something went wrong.');
    }
  }

  return (
    <main className="container narrow">
      {/* Title */}
      <h1 className="pageTitle brand">
        {isEl ? 'Παραγγελία' : 'Order'}
      </h1>

      {/* Preview (fixed size; apply color if painted) */}
      <section
        className="glassCard accentBorder"
        style={{ maxWidth: 820, margin: '0 auto 18px', textAlign: 'center' }}
      >
        <div
          style={{
            fontFamily: "'Alegreya', serif",
            fontSize: 48,          // fixed preview size (no dynamic scaling)
            lineHeight: 1.12,
            display: 'grid',
            gap: 6,
            padding: '10px 8px',
            minHeight: 80,
            color: finish === 'painted' && color ? '#fff' : 'inherit',
            // For painted preview, tint the background to the chosen color so the words "look painted"
            background:
              finish === 'painted' && color
                ? color.toLowerCase()
                : 'transparent',
            borderRadius: 12,
          }}
          aria-live="polite"
          title={isEl ? 'Ζωντανή προεπισκόπηση' : 'Live preview'}
        >
          {lines.length ? lines.map((t, i) => <div key={i}>{t || ' '}</div>) : (isEl ? 'Το κείμενό σας εδώ' : 'Your text here')}
        </div>

        {/* quick facts under preview */}
        <ul className="featureBadges" style={{ justifyContent: 'center' }}>
          <li>{isEl ? 'Μέγεθος' : 'Size'}: {size}</li>
          <li>
            {isEl ? 'Φινίρισμα' : 'Finish'}:{' '}
            {finish === 'unpainted'
              ? (isEl ? 'Άβαφο' : 'Unpainted')
              : `${isEl ? 'Βαφή' : 'Painted'}${color ? ` — ${color}` : ''}`}
          </li>
          <li>{isEl ? 'Σύνολο γραμμάτων' : 'Total letters'}: {letterCount}</li>
        </ul>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glassCard accentBorder" style={{ maxWidth: 820, margin: '0 auto' }}>
        <div className="stack">

          {/* Lines */}
          {lines.map((value, i) => (
            <div key={i} className="stack">
              <label>{isEl ? 'Γραμμή' : 'Line'} {i + 1}</label>
              <div className="row">
                <input
                  className="w100"
                  name={`line${i + 1}`}
                  value={value}
                  onChange={(e) => {
                    const copy = [...lines];
                    copy[i] = e.target.value;
                    setLines(copy);
                  }}
                  placeholder={isEl ? 'Το κείμενό σας εδώ' : 'Your text here'}
                  required={i === 0}
                />
                {lines.length > 1 && (
                  <button type="button" className="button ghost xl" onClick={() => removeLine(i)}>
                    {isEl ? 'Αφαίρεση' : 'Remove'}
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="row">
            <button
              type="button"
              className="button ghost xl"
              onClick={addLine}
              disabled={lines.length >= 3}
              title={lines.length >= 3 ? '(max 3)' : undefined}
            >
              {isEl ? 'Προσθήκη γραμμής' : 'Add line'}
            </button>
          </div>

          {/* Size (A5/A4/A3) */}
          <div className="stack">
            <label>{isEl ? 'Μέγεθος' : 'Size'}</label>
            <select name="size" value={size} onChange={(e) => setSize(e.target.value as 'A5'|'A4'|'A3')}>
              <option value="A5">A5</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>

          {/* Finish: Unpainted or Painted */}
          <div className="stack">
            <label>{isEl ? 'Φινίρισμα' : 'Finish'}</label>
            <div className="row">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="radio"
                  name="finish"
                  value="unpainted"
                  checked={finish === 'unpainted'}
                  onChange={() => { setFinish('unpainted'); setColor(''); setPainter(''); }}
                />
                {isEl ? 'Άβαφο' : 'Unpainted'}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="radio"
                  name="finish"
                  value="painted"
                  checked={finish === 'painted'}
                  onChange={() => setFinish('painted')}
                />
                {isEl ? 'Βαφή' : 'Painted'}
              </label>
            </div>
          </div>

          {/* Color (only if Painted) */}
          {finish === 'painted' && (
            <div className="stack">
              <label>{isEl ? 'Χρώμα' : 'Color'}</label>
              <select
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value as Color)}
                required
              >
                <option value="">{isEl ? 'Επιλέξτε χρώμα' : 'Choose a color'}</option>
                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}

          {/* Painter (only if Painted) */}
          {finish === 'painted' && (
            <div className="stack">
              <label>{isEl ? 'Βαφή από' : 'Paint by'}</label>
              <select
                name="painter"
                value={painter}
                onChange={(e) => setPainter(e.target.value as PainterKey)}
              >
                <option value="">{isEl ? 'Χωρίς προτίμηση' : 'No preference'}</option>
                {Object.entries(PAINTERS).map(([key, p]) => (
                  <option key={key} value={key}>
                    {p.label} (+€{p.price})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Email */}
          <div className="stack">
            <label>{isEl ? 'Email επιβεβαίωσης' : 'Confirmation email'}</label>
            <input type="email" name="email" required placeholder="you@email.com" />
          </div>

          {/* Notes */}
          <div className="stack">
            <label>{isEl ? 'Σημειώσεις' : 'Notes'}</label>
            <textarea name="notes" rows={3} placeholder={isEl ? 'Προθεσμία, ειδικές οδηγίες…' : 'Deadline, special instructions…'} />
          </div>

          {/* Submit */}
          <button type="submit" className="button ghost xl" style={{ width: '100%' }}>
            {isEl ? 'Υποβολή Παραγγελίας' : 'Submit Order'}
          </button>

          {/* status */}
          {status !== 'idle' && (
            <p className={status === 'error' ? 'error' : 'success'} style={{ marginTop: 6 }}>
              {msg}
            </p>
          )}

          {/* Footnote with * prices */}
          <p className="footnote">
            * {isEl ? 'Χρεώσεις βαφής' : 'Painting surcharges'}:
            {' '}Woodmaster — Xenios Charampus €5, Design X €10, Toxicw €15.
            {' '}{isEl ? 'Τα παραπάνω προστίθενται μόνο όταν επιλεγεί βαφή.' : 'Applied only when “Painted” is selected.'}
          </p>
        </div>
      </form>
    </main>
  );
}
