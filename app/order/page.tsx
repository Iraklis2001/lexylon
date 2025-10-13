'use client';
import * as React from 'react';
import { useUI } from '../providers';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const FONT_MAP: Record<string, string> = {
  Alegreya: "'Alegreya', serif",
  Montserrat: "'Montserrat', sans-serif",
  'Times New Roman': "'Times New Roman', serif",
};

function pxFromHeight(h: string) {
  const n = parseInt(h, 10) || 30;
  return 40 + (n - 30) * 4;
}

type OrderResponse = { ok?: boolean; orderId?: string; error?: string };

export default function Page() {
  const { t } = useUI();

  const [status, setStatus] = React.useState<Status>('idle');
  const [msg, setMsg] = React.useState('');
  const [lines, setLines] = React.useState<string[]>(['']);
  const [font, setFont] = React.useState('Alegreya');
  const [height, setHeight] = React.useState('30 cm');

  const letterCount = lines.join('').replace(/\s/g, '').length;

  const addLine = () => { if (lines.length < 3) setLines([...lines, '']); };
  const removeLine = (idx: number) => {
    if (lines.length <= 1) return;
    const copy = [...lines]; copy.splice(idx, 1); setLines(copy);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); setMsg('');
    const form = e.currentTarget;

    const finish = (form.elements.namedItem('finish') as HTMLSelectElement)?.value || 'Unpainted';
    const email  = (form.elements.namedItem('email')  as HTMLInputElement)?.value || '';
    const notes  = (form.elements.namedItem('notes')  as HTMLTextAreaElement)?.value || '';

    const payload = { lines, font, finish, height, email, notes };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: OrderResponse = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Submit failed');

      setStatus('ok');
      setMsg(`Thanks! Your order ID is ${data.orderId}.`);
      setLines(['']); setFont('Alegreya'); setHeight('30 cm');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <main className="container">
      <h1 className="hero-title">{t('yourTextHere')}</h1>

      {/* PREVIEW ON TOP */}
      <div
        className="preview-card"
        style={{
          margin: '0 auto 20px',
          maxWidth: 760,
          textAlign: 'center',
          fontFamily: FONT_MAP[font],
          fontSize: pxFromHeight(height),
          lineHeight: 1.1,
          display: 'grid',
          gap: 6,
          padding: '16px 12px',
        }}
      >
        {lines.length ? lines.map((tLine, i) => <div key={i}>{tLine || ' '}</div>) : t('yourTextHere')}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="card form" style={{ maxWidth: 760, margin: '0 auto' }}>
        {lines.map((val, i) => (
          <div key={i}>
            <label>{t('line')} {i + 1}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                name={`line${i + 1}`}
                value={val}
                onChange={(e) => {
                  const copy = [...lines]; copy[i] = e.target.value; setLines(copy);
                }}
                placeholder={t('yourTextHere')}
                required={i === 0}
                style={{ flex: 1, padding: 10 }}
              />
              {lines.length > 1 && (
                <button type="button" className="button ghost" onClick={() => removeLine(i)}>
                  {t('remove')}
                </button>
              )}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="button" onClick={addLine} disabled={lines.length >= 3}>
            {t('addLine')}
          </button>
        </div>

        <div>
          <label>{t('chooseFont')}</label>
          <select name="font" value={font} onChange={(e)=>setFont(e.target.value)} style={{ padding:10 }}>
            <option value="Alegreya">Alegreya</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div>
          <label>{t('finish')}</label>
          <select name="finish" defaultValue="Unpainted" style={{ padding:10 }}>
            <option>Unpainted</option>
            <option>Matte Clear</option>
            <option>Dark Stain</option>
            <option>Painted</option>
          </select>
        </div>

        <div>
          <label>{t('height')}</label>
          <select name="height" value={height} onChange={(e)=>setHeight(e.target.value)} style={{ padding:10 }}>
            <option>10 cm</option><option>20 cm</option><option>30 cm</option>
            <option>40 cm</option><option>50 cm</option><option>60 cm</option>
          </select>
        </div>

        <div>
          <label>{t('email')}</label>
          <input type="email" name="email" required style={{ padding:10 }} />
        </div>

        <div>
          <label>{t('notes')}</label>
          <textarea name="notes" rows={3} style={{ padding:10 }} placeholder="Deadline, color, special font…" />
        </div>

        <p className="help">{t('totalLetters')}: {letterCount}</p>

        <button type="submit" className="button" style={{ width:'100%', marginTop: 8 }}>
          {t('submit')}
        </button>

        {status !== 'idle' && (
          <p className={status === 'error' ? 'error' : 'success'} style={{ marginTop: 10 }}>
            {msg}
          </p>
        )}
      </form>
    </main>
  );
}
