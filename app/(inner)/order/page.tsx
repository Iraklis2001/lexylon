'use client';

import * as React from 'react';
import { useOrderDict, OrderSizeId } from '../../providers';

type Finish = 'unpainted' | 'painted';

export default function OrderPage() {
  const { l, sizes, colors } = useOrderDict();

  // form state
  const [lines, setLines] = React.useState<string[]>(['']);
  const [size, setSize] = React.useState<OrderSizeId>('A4');
  const [finish, setFinish] = React.useState<Finish>('painted');
  const [color, setColor] = React.useState(colors[0].hex);
  const [paintBy, setPaintBy] = React.useState<'none' | 'lexylon' | 'customer'>('none');
  const [email, setEmail] = React.useState('');

  // submit state
  const [submitting, setSubmitting] = React.useState(false);
  const [successId, setSuccessId] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const letters = React.useMemo(
    () => lines.join('').replace(/\s+/g, '').length,
    [lines]
  );

  const painted = finish === 'painted';
  const chosenColor = React.useMemo(
    () => colors.find(c => c.hex === color) ?? colors[0],
    [color, colors]
  );

  function updateLine(idx: number, value: string) {
    setLines(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }
  function addLine() {
    setLines(prev => (prev.length >= 3 ? prev : [...prev, '']));
  }
  function removeLine(idx: number) {
    setLines(prev => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessId(null);
    setErrorMsg(null);

    const colorObj = painted ? { name: chosenColor.name, hex: chosenColor.hex } : null;

    const payload = {
      lines: lines.filter(Boolean),
      size,
      finish,
      color: colorObj,                  // null if unpainted
      paintBy,                          // 'none' | 'lexylon' | 'customer'
      email,
      notes: '',                        // add a textarea if you want to collect notes
      letterCount: letters,
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to send');

      setSuccessId(json.orderId || 'OK');
      // Optional: reset some fields
      // setLines(['']); setEmail('');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="orderBg">
      <div className="orderCanvas">
        <div className="orderPanel">
          {/* Title */}
          <header className="head">
            <h1 className="pageTitle brand">{l('orderTitle')}</h1>
            <p className="muted">{l('orderSubtitle')}</p>
          </header>

          {/* Pills / summary */}
          <section className="glassCard accentBorder pills">
            <span className="pill">{l('pillSize')}: {size}</span>
            <span className="pill">
              {l('pillFinish')}: {painted ? l('painted') : l('unpainted')}
            </span>
            <span className="pill">{l('pillLetters')}: {letters}</span>
          </section>

          {/* Preview */}
          <section className="glassCard">
            <h2 className="h2">{l('preview')}</h2>
            <div
              className="preview"
              style={{
                background: painted ? chosenColor.hex : '#f3efea',
                color: painted
                  ? (chosenColor.hex.toLowerCase() === '#ffffff' ? '#111' : '#fff')
                  : '#1b1209',
                borderColor: painted ? 'transparent' : '#dfd7cc',
              }}
            >
              <div className="previewInner">
                {lines.map((text, i) => (
                  <div key={i} className={`line ${i === 0 ? 'first' : ''}`}>
                    {text || <span className="ghost">{l('yourTextHere')}</span>}
                  </div>
                ))}
                {lines.length === 0 && (
                  <div className="line first"><span className="ghost">{l('yourTextHere')}</span></div>
                )}
              </div>
            </div>

            <ul className="featureBadges">
              <li>{l('featureFonts')}</li>
              <li>{l('featureProof')}</li>
              <li>{l('featurePackaging')}</li>
            </ul>
          </section>

          {/* FORM */}
          <form className="glassCard" onSubmit={handleSubmit}>
            <h2 className="h2">{l('details')}</h2>

            {/* Lines */}
            {lines.map((val, i) => (
              <div className="stack" key={i}>
                <label className="label">{l('line')} {i + 1}</label>
                <div className="row">
                  <input
                    className="w100"
                    value={val}
                    onChange={e => updateLine(i, e.target.value)}
                    placeholder={l('yourTextHere')}
                    maxLength={32}
                  />
                  {i > 0 && (
                    <button
                      className="button ghost"
                      type="button"
                      onClick={() => removeLine(i)}
                      title={l('remove')}
                    >
                      {l('remove')}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="row">
              <button
                className="button ghost"
                type="button"
                onClick={addLine}
                disabled={lines.length >= 3}
                title={l('addLine')}
              >
                {l('addLine')}
              </button>
            </div>

            {/* Size */}
            <div className="stack">
              <label className="label">{l('sizeLabel')}</label>
              <select value={size} onChange={e => setSize(e.target.value as OrderSizeId)}>
                {sizes.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.label} — {s.note}
                  </option>
                ))}
              </select>
            </div>

            {/* Finish */}
            <div className="stack">
              <label className="label">{l('finishLabel')}</label>
              <div className="row">
                <label className="row">
                  <input
                    type="radio"
                    name="finish"
                    checked={finish === 'unpainted'}
                    onChange={() => setFinish('unpainted')}
                  />
                  <span>{l('unpainted')}</span>
                </label>
                <label className="row">
                  <input
                    type="radio"
                    name="finish"
                    checked={finish === 'painted'}
                    onChange={() => setFinish('painted')}
                  />
                  <span>{l('painted')}</span>
                </label>
              </div>
            </div>

            {/* Color (only if painted) */}
            {painted && (
              <div className="stack">
                <label className="label">{l('colorLabel')}</label>
                <select
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  aria-label={l('chooseColor')}
                >
                  {colors.map(c => (
                    <option key={c.hex} value={c.hex}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="swatchRow">
                  {colors.map(c => (
                    <button
                      type="button"
                      key={c.hex}
                      aria-label={c.name}
                      title={c.name}
                      className={`swatch ${c.hex === color ? 'isActive' : ''}`}
                      style={{ background: c.hex }}
                      onClick={() => setColor(c.hex)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Paint by */}
            <div className="stack">
              <label className="label">{l('paintBy')}</label>
              <select value={paintBy} onChange={e => setPaintBy(e.target.value as any)}>
                <option value="none">{l('paintByNone')}</option>
                <option value="lexylon">{l('paintByLexylon')}</option>
                <option value="customer">{l('paintByCustomer')}</option>
              </select>
            </div>

            {/* Email */}
            <div className="stack">
              <label className="label">{l('emailLabel')}</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <p className="footnote">{l('emailFootnote')}</p>
            </div>

            {/* Status + Submit */}
            {errorMsg && <p className="error">{errorMsg}</p>}
            {successId && (
              <p className="success">
                Order sent! ID: <b>{successId}</b>. Check your email for confirmation.
              </p>
            )}
            <div className="row">
              <button className="button ghost xl" type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : l('sendRequest')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Page styles */}
      <style jsx>{`
        .head{ margin-bottom: .75rem; }
        .h2{ margin: 0 0 .75rem; font-weight: 800; }
        .label{ font-weight: 700; }

        .pills{ display:flex; gap:.5rem; flex-wrap:wrap; }
        .pill{
          display:inline-flex; align-items:center; height:2rem;
          padding: 0 .7rem; border-radius: 999px;
          background: rgba(255,255,255,.06);
          border: 1px solid var(--border);
          font-weight: 700;
        }

        .preview{
          border: 1px solid; border-radius: calc(var(--radius) - 8px);
          min-height: 220px; display: grid; place-items: center;
          box-shadow: inset 0 8px 40px rgba(0,0,0,.15);
        }
        .previewInner{ width: min(90%, 720px); text-align: center; }
        .line{
          font-family: "Lobster Two", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          font-weight: 700; letter-spacing: .02em;
          font-size: clamp(1.8rem, 1.2rem + 3.2vw, 3rem);
          line-height: 1.05; text-shadow: 0 2px 10px rgba(0,0,0,.18);
          margin: .25rem 0;
        }
        .line.first{ font-size: clamp(2rem, 1.4rem + 3.8vw, 3.3rem); }
        .ghost{ opacity: .55; }

        .swatchRow{ display:flex; flex-wrap:wrap; gap: .5rem; }
        .swatch{
          width: 26px; height: 26px; border-radius: 999px;
          border: 2px solid #fff; outline: 1px solid rgba(0,0,0,.2);
          box-shadow: 0 2px 10px rgba(0,0,0,.15);
        }
        .swatch.isActive{ outline: 3px solid rgba(219,138,43,.5); }

        /* Centered paper panel */
        .orderBg{ padding: 2.5rem 0 3.5rem; }
        .orderCanvas{ width: min(1100px, 100% - 2rem); margin-inline: auto; }
        .orderPanel{
          background: #f7f5f1 url('/topo-light.svg') repeat;
          background-size: 900px;
          color: #1b1209;
          border: 1px solid rgba(0,0,0,.06);
          border-radius: 1.25rem;
          box-shadow: 0 26px 70px rgba(0,0,0,.28);
          padding: clamp(1rem, 2vw + 1rem, 2rem);
        }
        .glassCard{
          background: #fff; color: #111; border: 1px solid #ece8e2;
          border-radius: 1.25rem; box-shadow: 0 12px 32px rgba(0,0,0,.08);
          padding: 1.25rem; margin: 0 auto 1rem; max-width: 820px;
        }

        /* Inputs/buttons */
        .row{ display:flex; gap:.6rem; align-items:center; flex-wrap: wrap; }
        .stack{ display:grid; gap:.4rem; margin-bottom: .75rem; }
        input, select, textarea{
          width: 100%; padding: .7rem .9rem; border-radius: .75rem;
          border: 1px solid #e8e4de; background: #fff; color: #111; outline: none;
          transition: box-shadow .15s ease, border-color .15s ease;
        }
        input:focus-visible, select:focus-visible, textarea:focus-visible{
          border-color: #d9d3ca; box-shadow: 0 0 0 6px rgba(219,138,43,.18);
        }
        .button{
          display:inline-flex; align-items:center; justify-content:center;
          gap:.45rem; height:2.8rem; padding:0 1rem; border-radius: .9rem; font-weight:700;
          background: var(--brand); color: var(--brand-contrast); border: 1px solid transparent;
        }
        .button.ghost:hover{ filter: brightness(1.05); }
        .button.xl{ height: 3rem; padding: 0 1.1rem; }

        .success{ color:#26c281; }
        .error{ color:#ff6b6b; }
        .footnote{ color:#6b6b6b; font-size:.92rem; }
      `}</style>
    </section>
  );
}
