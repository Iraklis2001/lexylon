// app/about/page.tsx
'use client';
import { useUI } from '../../providers';

export default function About() {
  const { lang } = useUI();
  const isEl = lang === 'el';

  return (
    <main className="container">
      <h1 className="pageTitle brand">{isEl ? 'Σχετικά με τη Lexylon' : 'About Lexylon'}</h1>

      <section className="card" style={{ maxWidth: 900, margin: '0 auto', display:'grid', gap:14 }}>
        <p>
          {isEl
            ? 'Η Lexylon δημιουργήθηκε το 2024 και έχει εξυπηρετήσει 1.000+ πελάτες. Η ομάδα μας δημιουργεί μοναδικές ξύλινες, χειροποίητες λέξεις συνδυάζοντας τέχνη και ποιότητα.'
            : 'Lexylon was founded in 2024 and has served 1,000+ customers. Our team crafts unique, handmade wooden words—combining art and quality.'}
        </p>

        <div className="row">
          <a className="button ghost xl" href="tel:+35799943596">+357 99943596</a>
          <a className="button ghost xl" href="https://www.instagram.com/lexylon.cy" target="_blank" rel="noreferrer">@lexylon.cy</a>
        </div>
      </section>
    </main>
  );
}
