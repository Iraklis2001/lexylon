// app/Header.tsx
'use client';

import Link from 'next/link';
import { useUI } from './providers';

const PHONE = '+35799943596';
const HOURS_LABEL = 'Opening : Mon–Fri 08:00 – 17:00';

export default function Header() {
  const { t, toggleLang, lang } = useUI();

  return (
    <header className="navwrap" role="banner">
      {/* Thin top bar */}
      <div className="utilbar">
        <div className="utilbar__inner">
          <div className="utilbar__left">
            <span className="utilbar__dot" aria-hidden />
            <span className="utilbar__hours">{HOURS_LABEL}</span>
          </div>

          <div className="utilbar__right">
            <button
              className="langpill"
              onClick={toggleLang}
              aria-label="Toggle language"
              type="button"
            >
              {lang === 'el' ? 'EN' : 'EL'}
            </button>

            <a className="callpill" href={`tel:${PHONE}`}>
              <span className="phone">📞</span> {t('callUs')}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="navbar glass">
        <div className="navbar__inner">
          <div className="brand">
            <Link href="/">Lexylon</Link>
          </div>

          <nav className="navlinks" aria-label="Primary">
            <Link href="/" className="navlink">{t('home')}</Link>
            <Link href="/gallery" className="navlink">{t('gallery')}</Link>
            <Link href="/order" className="navlink">{t('order')}</Link>
            <Link href="/process" className="navlink">{t('process')}</Link>
            <Link href="/about" className="navlink">{t('about')}</Link>
          </nav>

          <div className="navbar__spacer" />
        </div>
      </div>
    </header>
  );
}
