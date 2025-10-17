// app/Header.tsx
'use client';

import Link from 'next/link';
import * as React from 'react';
import { useUI } from './providers';

/** Mon–Fri 08:00–17:00 (Sat/Sun closed) */
const SCHEDULE = { weekdayOpen: 8 * 60, weekdayClose: 17 * 60 };

function useOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0 Sun .. 6 Sat
  const mins = now.getHours() * 60 + now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && mins >= SCHEDULE.weekdayOpen && mins < SCHEDULE.weekdayClose;
}

export default function Header() {
  const { lang, toggleLang, toggleTheme } = useUI();
  const isOpen = useOpenNow();

  const rangeLabel =
    lang === 'el'
      ? 'Ωράριο: Δευ–Παρ 08:00–17:00 · Σ/Κ κλειστά'
      : 'Hours: Mon–Fri 08:00–17:00 · Sat/Sun closed';

  const statusText =
    lang === 'el' ? (isOpen ? 'Ανοιχτά τώρα' : 'Κλειστά τώρα') : isOpen ? 'Open now' : 'Closed now';

  return (
    <header className="topbar">
      {/* LEFT: brand + hours */}
      <div className="topbar-left">
        <div className="brand"><Link href="/">Lexylon</Link></div>
        <div className="hours-badge" title={rangeLabel} aria-label={rangeLabel}>
          <span className={`hours-dot ${isOpen ? 'open' : 'closed'}`} />
          <strong style={{ letterSpacing: 0.2 }}>{statusText}</strong>
          <span className="hide-sm"> · {rangeLabel}</span>
        </div>
      </div>

      {/* RIGHT: nav + toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <nav className="nav" style={{ display: 'flex', gap: 8 }}>
          <Link href="/order"   className="button ghost xl">{lang === 'el' ? 'Παραγγελία' : 'Order'}</Link>
          <Link href="/gallery" className="button ghost xl">{lang === 'el' ? 'Γκαλερί' : 'Gallery'}</Link>
          <Link href="/about"   className="button ghost xl">{lang === 'el' ? 'Σχετικά' : 'About'}</Link>
          <Link href="/process" className="button ghost xl">{lang === 'el' ? 'Διαδικασία' : 'Process'}</Link>
          <Link href="/faq"     className="button ghost xl">FAQ</Link>
        </nav>
        <button className="button ghost" onClick={toggleLang} type="button">
          {lang === 'en' ? 'Ελληνικά' : 'English'}
        </button>
        <button className="button ghost" onClick={toggleTheme} type="button" aria-label="Toggle theme">
          🌓
        </button>
      </div>
    </header>
  );
}
