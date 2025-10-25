'use client';

import { useFAQ } from '../providers';
import { useUI } from '../providers'

export default function FAQSection({ withTitle = true }: { withTitle?: boolean }) {
  const items = useFAQ();
  const { lang } = useUI();
  const isEl = lang === 'el';

  return (
    <section id="faq" className="card faq">
      {withTitle && (
        <h2 className="sectionTitle">
          {isEl ? 'Συχνές Ερωτήσεις' : 'Frequently Asked Questions'}
        </h2>
      )}

      <div className="faqList">
        {items.map((it, i) => (
          <details key={i} className="faqItem">
            <summary className="faqSum">
              <span>{it.q}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </summary>
            <div className="faqBody">{it.a}</div>
          </details>
        ))}
      </div>

      <style jsx>{`
        .faqList{ display:grid; gap:.6rem; }
        .faqItem{ border:1px solid var(--border); border-radius:calc(var(--radius) - 8px); background:rgba(255,255,255,.03); }
        .faqSum{
          display:flex; justify-content:space-between; align-items:center; gap:.75rem;
          padding:.9rem 1rem; cursor:pointer; font-weight:700;
        }
        .faqItem[open] .faqSum svg{ transform:rotate(180deg); }
        .faqSum svg{ transition:transform .2s ease; opacity:.9; }
        .faqBody{ padding:0 1rem 1rem; opacity:.9; }
      `}</style>
    </section>
  );
}
