// app/Header.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUI } from './providers';

export default function Header() {
  const { toggleTheme, toggleLang, t, lang } = useUI();
  const pathname = usePathname();
  const isActive = (href:string) => pathname === href;
  const linkClass = (href:string) => `button ${isActive(href) ? '' : 'ghost'}`;

  return (
    <header className="topbar">
      <Link href="/" className="brand" aria-label="Lexylon home" style={{ display:'flex', alignItems:'center', gap:8 }}>
        <Image src="/logo.jpg" alt="" width={28} height={28} style={{ borderRadius:6, objectFit:'cover' }} />
        <span>Lexylon</span>
      </Link>

      <nav className="nav" style={{ display:'flex', gap:8 }}>
        <Link className={linkClass('/order')} href="/order">{t('order')}</Link>
        <Link className={linkClass('/gallery')} href="/gallery">{t('gallery')}</Link>
        <Link className={linkClass('/about')} href="/about">{t('about')}</Link>
        <Link className={linkClass('/faq')} href="/faq">FAQ</Link>
      </nav>

      <div style={{ display:'flex', gap:8 }}>
        <button className="button ghost" onClick={toggleLang}>{lang === 'en' ? 'Ελληνικά' : 'English'}</button>
        <button className="button ghost" onClick={toggleTheme}>🌓</button>
      </div>
    </header>
  );
}
