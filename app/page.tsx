'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useUI } from './providers';

// Put your images in /public/slides (e.g. 1.jpg, 2.jpg, 3.jpg, ...).
const SLIDES = ['/slides/01.jpg', '/slides/02.jpg', '/slides/03.jpg', '/slides/04.jpg', '/slides/05.jpg']; // add more if you like
const DURATION = 3000; // ms between slides
const FADE_MS = 900;  // must match CSS transition

export default function Home() {
  const { t } = useUI();
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || SLIDES.length < 2) return;
    const id = setInterval(() => setI(n => (n + 1) % SLIDES.length), DURATION);
    return () => clearInterval(id);
  }, [paused]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI(n => (n + 1) % SLIDES.length);
      if (e.key === 'ArrowLeft') setI(n => (n - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main>
      <section
        className="hero"
        aria-label={t('heroTitle')}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background slideshow */}
        <div className="hero__slides" aria-hidden>
          {SLIDES.map((src, idx) => (
            <div
              key={src}
              className={`hero__slide ${idx === i ? 'is-active' : ''}`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={idx === 0}
                sizes="100vw"
                className="hero__img"
              />
            </div>
          ))}
          <div className="hero__shade" />
        </div>

        {/* Content */}
        <div className="container">
          <div className="hero__card glass">
            <p className="eyebrow">Lexylon</p>
            <h1 className="hero__title">{t('heroTitle')}</h1>
            <p className="muted">{t('heroSubtitle')}</p>

            <div className="actions">
              <Link className="btn btn--primary" href="/order">{t('ctaOrder')}</Link>
              <Link className="btn btn--ghost" href="/gallery">{t('ctaGallery')}</Link>
            </div>

            {/* Dots */}
            <div className="hero__dots" role="tablist" aria-label="Slideshow controls">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === i}
                  aria-label={`Slide ${idx + 1}`}
                  className={`hero__dot ${idx === i ? 'is-active' : ''}`}
                  onClick={() => setI(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
