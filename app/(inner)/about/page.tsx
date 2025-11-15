'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUI } from '../../providers';

export default function AboutPage() {
  const { t } = useUI();

  return (
    <>
      {/* ===== TOP SPLIT on LIGHT BACKGROUND ===== */}
      <section className="band band--light">
        <main className="about container">
          {/* LEFT: photo + stat pill */}
          <aside className="about__media">
            <div className="about__photoWrap">
              <Image
                src="/gallery/01.jpg" // make sure this exists under /public/gallery/
                alt="Workshop / product photo"
                fill
                priority
                className="about__photo"
                sizes="(max-width: 900px) 100vw, 560px"
              />
              <div aria-hidden className="about__accent" />
            </div>

            <div className="about__stat glass">
              <div className="about__numbers">
                <div className="about__big">
                  1000<span className="about__plus">+</span>
                </div>
                <div className="about__label">{t('aboutSatisfied')}</div>
              </div>
            </div>
          </aside>

          {/* RIGHT: copy, checklist, founder, CTA */}
          <section className="about__content">
            <p className="eyebrow">{t('aboutWelcome')}</p>
            <h1 className="about__title">{t('aboutTitle')}</h1>
            <p className="muted about__lead">{t('aboutLead')}</p>

            <div className="about__checks">
              <ul className="about__list">
                <li>{t('aboutCheck1')}</li>
                <li>{t('aboutCheck2')}</li>
                <li>{t('aboutCheck3')}</li>
              </ul>
              <ul className="about__list">
                <li>{t('aboutCheck4')}</li>
                <li>{t('aboutCheck5')}</li>
                <li>{t('aboutCheck6')}</li>
              </ul>
            </div>

            <div className="about__footer">
              <div className="about__founder">
                <Image
                  src="/gallery/xenios.png" // founder avatar
                  alt={t('aboutFounder')}
                  width={54}
                  height={54}
                  className="about__avatar"
                />
                <div>
                  <div className="about__sig">{t('aboutFounder')}</div>
                  <div className="about__role muted">{t('aboutFounderRole')}</div>
                </div>
              </div>

              <Link href="/contact" className="btn btn--primary about__cta">
                {t('aboutMoreBtn')}
              </Link>
            </div>
          </section>
        </main>
      </section>

      {/* ===== SERVICES PREVIEW — light topo pattern band ===== */}
      <section className="paper paper--pattern">
        <div className="svc container">
          <div className="svc__head">
            <div>
              <p className="eyebrow">{t('ourServices')}</p>
              <h2 className="svc__title">{t('bestCarpenter')}</h2>
            </div>
            <Link href="/services" className="btn btn--primary svc__all">
              {t('allServices')}
            </Link>
          </div>

          <div className="svc__grid">
            <article className="svcCard">
              <h3 className="svcCard__title script">{t('svc1Title')}</h3>
              <p className="svcCard__text">{t('svcBlurb')}</p>
              <Link href="/services" className="svcCard__link">
                {t('learnMore')} →
              </Link>
            </article>

            <article className="svcCard">
              <h3 className="svcCard__title script">{t('svc2Title')}</h3>
              <p className="svcCard__text">{t('svcBlurb')}</p>
              <Link href="/services" className="svcCard__link">
                {t('learnMore')} →
              </Link>
            </article>

            <article className="svcCard">
              <div className="svcCard__icon">▥</div>
              <h3 className="svcCard__head">{t('svc3Title')}</h3>
              <p className="svcCard__text muted">{t('svcBlurb')}</p>
            </article>

            <article className="svcCard">
              <div className="svcCard__icon">📷</div>
              <h3 className="svcCard__head">{t('svc4Title')}</h3>
              <p className="svcCard__text muted">{t('svcBlurb')}</p>
            </article>

            <article className="svcCard">
              <div className="svcCard__icon">🪚</div>
              <h3 className="svcCard__head">{t('svc5Title')}</h3>
              <p className="svcCard__text muted">{t('svcBlurb')}</p>
            </article>

            <article className="svcCard">
              <div className="svcCard__icon">🚚</div>
              <h3 className="svcCard__head">{t('svc6Title')}</h3>
              <p className="svcCard__text muted">{t('svcBlurb')}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== WHO WE ARE / STATS SPLIT ===== */}
      <section className="who">
        <div className="who__img">
          <Image
            src="/gallery/hero.jpg" // ensure this file exists
            alt="Studio / wood detail"
            fill
            className="who__imgEl"
            sizes="(max-width: 1100px) 100vw, 50vw"
          />
        </div>

        <div className="who__panel">
          <p className="eyebrow">{t('whoWeAre')}</p>
          <h2 className="who__title">{t('whoTitle')}</h2>
          <p className="muted who__lead">{t('whoLead')}</p>

          <ul className="who__stats">
            <li>
              <div className="who__num">2<span>+</span></div>
              <div className="who__meta">{t('statYears')}</div>
            </li>
            <li>
              <div className="who__num">1000<span>+</span></div>
              <div className="who__meta">{t('statProjects')}</div>
            </li>
            <li>
              <div className="who__num">1000<span>+</span></div>
              <div className="who__meta">{t('statClients')}</div>
            </li>
            <li>
              <div className="who__num">3<span>+</span></div>
              <div className="who__meta">{t('statCarpenters')}</div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
