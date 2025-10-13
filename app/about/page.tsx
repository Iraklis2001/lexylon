'use client';
import { useUI } from '../providers';

export default function AboutPage() {
  const { t, lang } = useUI();

  const tel = '+357 99943596';
  const ig  = 'https://www.instagram.com/lexylon.cy?igsh=dGJrdmk2a2ZxdXI4';

  return (
    <main className="container">
      <h1 className="hero-title">{t('aboutHeadline')}</h1>

      <section className="grid-2">
        <article className="card" style={{ display:'grid', gap:12 }}>
          <p>{t('aboutFounded')}</p>
          <p>{t('aboutTeam')}</p>
        </article>

        <aside className="card" style={{ display:'grid', gap:10, alignContent:'start' }}>
          <h3 style={{ marginBottom:4 }}>{t('phone')}</h3>
          <a className="button" href={`tel:${tel.replace(/\s+/g,'')}`} style={{ width:'fit-content' }}>
            {tel}
          </a>

          <h3 style={{ marginTop:16, marginBottom:4 }}>{t('instagram')}</h3>
          <a className="button" href={ig} target="_blank" rel="noopener noreferrer" style={{ width:'fit-content' }}>
            @lexylon.cy
          </a>
        </aside>
      </section>
    </main>
  );
}
