'use client';
import Link from 'next/link';
import * as React from 'react';
import { useUI } from './providers';

export default function HomePage() {
  const { t, lang } = useUI();
  const isEl = lang === 'el';

  // Fullscreen background slideshow (logo + 2 photos)
  const slides = React.useMemo(
    () => ['/logo.jpg', '/gallery/01.jpg', '/gallery/02.jpg'],
    []
  );
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  React.useEffect(() => {
    const img = new Image();
    img.src = slides[(idx + 1) % slides.length];
  }, [idx, slides]);

  return (
    <>
      {/* Background slideshow */}
      <div className="bgHero" aria-hidden>
        {slides.map((src, i) => (
          <div
            key={src}
            className={`bgSlide ${i === idx ? 'show' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="bgShade" />
      </div>

      {/* Single visual card */}
      <main className="homeWrap">
        <section className="glassCard accentBorder">
          {/* Header / H1 */}
          <header className="homeHeader">
            <h1 className="homeTitle">{t('heroTitle')}</h1>
            <p className="lead">{t('heroSubtitle')}</p>
            <div className="ctaRow">
  <Link href="/order" className="button ghost xl">{t('ctaOrder')}</Link>
  <Link href="/about" className="button ghost xl">{t('ctaAbout')}</Link>
  <Link href="/faq"   className="button ghost xl">{t('ctaFAQ')}</Link>
</div>


            {/* Features as “badges” */}
            <ul className="featureBadges">
              <li>{t('feature1')}</li>
              <li>{t('feature2')}</li>
              <li>{t('feature3')}</li>
            </ul>
          </header>

          <div className="divider" />

          {/* Content grid: Audience (left) + Process (right) */}
          <div className="audProcessGrid">
            {/* LEFT: Audience & product ideas */}
            <div className="audience">
              <h2 className="sectionTitle">{t('audienceTitle')}</h2>

              <div className="audSection">
                <h3>A. {t('weddingsTitle').replace('A. ', '')}</h3>
                <ul>
                  <li>{t('weddingsLine1')}</li>
                  <li>{t('weddingsLine2')}</li>
                  <li>{t('weddingsLine3')}</li>
                  <li>
                    {t('bundleLabel')}: {t('bundleValue')}
                  </li>
                </ul>
              </div>

              <div className="audSection">
                <h3>B. {t('birthdaysTitle').replace('B. ', '')}</h3>
                <ul>
                  <li>{t('birthdaysLine1')}</li>
                  <li>{t('birthdaysLine2')}</li>
                </ul>
              </div>

              <div className="audSection">
                <h3>C. {t('newbornTitle').replace('C. ', '')}</h3>
                <ul>
                  <li>{t('newbornLine1')}</li>
                  <li>{t('newbornLine2')}</li>
                </ul>
              </div>

              <div className="audSection">
                <h3>D. {t('educationTitle').replace('D. ', '')}</h3>
                <ul>
                  <li>{t('educationLine1')}</li>
                  <li>{t('educationLine2')}</li>
                  <li>{t('educationLine3')}</li>
                </ul>
              </div>

              <div className="audSection">
                <h3>E. {t('customTitle').replace('E. ', '')}</h3>
                <ul>
                  <li>{t('customLine1')}</li>
                  <li>{t('customLine2')}</li>
                </ul>
              </div>
            </div>

            {/* RIGHT: Process / How we make it */}
            <aside className="process">
              <h2 className="sectionTitle">{t('processTitle')}</h2>

              <p className="lead">{t('processSummary')}</p>

              <ol className="steps">
                <li><span>1</span>{t('processStep1')}</li>
                <li><span>2</span>{t('processStep2')}</li>
                <li><span>3</span>{t('processStep3')}</li>
                <li><span>4</span>{t('processStep4')}</li>
                <li><span>5</span>{t('processStep5')}</li>
              </ol>

              <Link href="/process" className="button ghost">
                {isEl ? 'Μάθετε περισσότερα' : 'Learn more'}
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
