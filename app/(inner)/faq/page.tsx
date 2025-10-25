'use client';


import { useUI } from '../../providers';
import FAQSection from '../../components/FAQSection';

export default function FAQPage() {
  const { lang } = useUI();
  const isEl = lang === 'el';

  return (
    <main className="container narrow" style={{ padding: '1.5rem 0 3rem' }}>
      <h1 className="pageTitle brand">{isEl ? 'Συχνές Ερωτήσεις' : 'Frequently Asked Questions'}</h1>
      <FAQSection withTitle={false} />
    </main>
  );
}
