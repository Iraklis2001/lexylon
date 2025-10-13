'use client';
import Link from 'next/link';
import { useUI } from './providers';

export default function HomePage() {
  const { t } = useUI();

  return (
    <main>
      {/* FULLSCREEN HERO with LOGO as BACKGROUND */}
      <section
        className="fullHero"
        style={{
          // make the background the logo
          backgroundImage: 'url(/logo.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // contain = show the WHOLE logo (no crop)
          backgroundSize: 'contain',
          // fallback color behind the logo area
          backgroundColor: 'var(--bg)',
        }}
      >
        {/* subtle global dark/light overlay for contrast */}
        <div className="heroOverlay" aria-hidden="true" />

        {/* centered content over the background */}
        <div className="heroCenter">
          <div className="glassPanel">
            <h1 className="heroTitle">{t('heroTitle')}</h1>
            <p className="heroSubtitle">{t('heroSubtitle')}</p>

            <div className="heroCtas">
              <Link href="/order" className="button">{t('ctaOrder')}</Link>
              <Link href="/about" className="button ghost">{t('ctaAbout')}</Link>
              <Link href="/faq" className="button ghost">{t('ctaFAQ')}</Link>
            </div>

            <ul className="heroFeatures">
              <li>{t('feature1')}</li>
              <li>{t('feature2')}</li>
              <li>{t('feature3')}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
