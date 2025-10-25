'use client';

import { useUI } from '../../providers';

export default function ProcessPage() {
  const { t, lang } = useUI();
  const isEl = lang === 'el';

  const STEPS = [
    t('processStep1'),
    t('processStep2'),
    t('processStep3'),
    t('processStep4'),
    t('processStep5'),
  ];

  return (
    <>
      {/* HEADER BAND (with pattern) */}
      <section className="procBand">
        <main className="container narrow">
          <h1 className="pageTitle brand">
            {isEl ? 'Διαδικασία' : 'How we make it'}
          </h1>
          <p className="muted lead">{t('processSummary')}</p>
        </main>
      </section>

      {/* CONTENT */}
      <main className="container narrow proc">
        <section className="card videoCard">
          {/* Video */}
          <div className="videoWrap">
            {/* Put your files in /public, change names if needed */}
            <video
              className="videoEl"
              controls
              preload="metadata"
              poster="/video-poster.jpg"
            >
              <source src="/how.mp4" type="video/mp4" />
              {t('learnMore')}
            </video>
          </div>

          {/* Steps (bullets) */}
          <ol className="bullets" aria-label={isEl ? 'Βήματα' : 'Steps'}>
            {STEPS.map((txt, i) => (
              <li key={i} className="bullet">
                <span className="num">{i + 1}</span>
                <p className="label">{txt}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      {/* PAGE-SCOPED CSS */}
      <style jsx>{`
        /* ---------- Header band with pattern ---------- */
        .procBand{
          background: #ffffff url('/topo-light.svg') repeat;
          background-size: 900px;
          color: #111;
          padding: 2.75rem 0 1.25rem;
          position: relative;
        }
        .procBand::after{
          content:'';
          position:absolute; inset:auto 0 0 0; height:18px;
          background: linear-gradient(to bottom, rgba(0,0,0,.12), rgba(0,0,0,0));
          opacity:.08; pointer-events:none;
        }

        /* ---------- Layout ---------- */
        .narrow{ max-width:1100px; margin-inline:auto; }
        .lead{ margin-top:.4rem; max-width:70ch; }
        .proc{ padding:1.5rem 0 3.5rem; }

        /* ---------- Card ---------- */
        .card{
          background: var(--card);
          -webkit-backdrop-filter: blur(var(--glass-blur));
          backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-1);
          padding: 1.25rem;
        }

        /* ---------- Video ---------- */
        .videoWrap{
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;       /* responsive, no layout shifts */
          border-radius: calc(var(--radius) - 4px);
          overflow: hidden;
        }
        .videoEl{ width:100%; height:100%; object-fit: cover; background:#000; }

        /* ---------- Bullets (steps) ---------- */
        .bullets{
          list-style: none;
          padding: 0;
          margin: 1.1rem 0 0;
          display: grid;
          gap: .9rem;
        }

        /* Mobile: stacked with vertical connector */
        .bullet{
          position: relative;
          display: grid;
          grid-template-columns: 38px 1fr;
          align-items: start;
          gap: .75rem;
          padding: .7rem .6rem .7rem .4rem;
          border: 1px solid var(--border);
          border-radius: calc(var(--radius) - 10px);
          background: rgba(255,255,255,.03);
        }
        .num{
          width: 34px; height: 34px;
          display: grid; place-items: center;
          border-radius: 999px;
          background: var(--brand);
          color: var(--brand-contrast);
          font-weight: 900;
          box-shadow: 0 6px 18px rgba(219,138,43,.35);
        }
        .label{ margin: 0; line-height: 1.45; }
        .bullet::after{
          content:"";
          position:absolute;
          left: 17px; top: calc(100% - 2px);
          width: 2px; height: .9rem;
          background: rgba(255,255,255,.08);
        }
        .bullet:last-child::after{ display:none; }

        /* Desktop: horizontal timeline */
        @media (min-width: 900px){
          .bullets{
            grid-template-columns: repeat(5, 1fr);
            gap: 1rem;
          }
          .bullet{
            grid-template-columns: 1fr;
            text-align: center;
            padding: 1rem .8rem;
          }
          .num{ margin-inline: auto; margin-bottom: .55rem; }
          .bullet::after{
            left: 50%;
            top: calc(34px + .55rem);
            transform: translateX(-50%);
            width: calc(100% + 1rem);
            height: 2px;
            background: rgba(255,255,255,.10);
          }
          .bullet:last-child::after{ display:none; }
        }
      `}</style>
    </>
  );
}
