// app/gallery/page.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { useUI } from '../../providers';

const IMAGES = [
  '/gallery/01.jpg',
  '/gallery/02.jpg',
  '/gallery/03.jpg',
  '/gallery/04.jpg',
  '/gallery/05.jpg',
  '/gallery/06.jpg',
  '/gallery/08.jpg',
  '/gallery/07.jpg',
];

export default function Gallery() {
  const { lang } = useUI();
  const isEl = lang === 'el';

  const [active, setActive] = React.useState<string | null>(null);

  // Close lightbox with ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="container">
      <h1 className="pageTitle brand">{isEl ? 'Γκαλερί' : 'Gallery'}</h1>

      <section className="glassCard accentBorder" style={{ padding: 16 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {IMAGES.map((src, i) => (
            <figure
              key={src}
              className="card compact"
              style={{
                padding: 8,
                cursor: 'zoom-in',
                transition: 'transform .15s ease',
              }}
              onClick={() => setActive(src)}
            >
              <Image
                src={src}
                alt={`${isEl ? 'Φωτογραφία' : 'Photo'} ${i + 1}`}
                width={1000}
                height={750}
                style={{ width: '100%', height: 'auto', borderRadius: 10 }}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <p className="footnote" style={{ marginTop: 10 }}>
          {isEl ? 'Κλικ για μεγέθυνση.' : 'Click an image to enlarge.'}
        </p>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.75)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 50,
            cursor: 'zoom-out',
            padding: 12,
          }}
          aria-label={isEl ? 'Μεγάλη προβολή εικόνας' : 'Lightbox'}
        >
          {/* Use <img> here so Next/Image doesn’t constrain layout in overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt="Preview"
            style={{
              maxWidth: '92vw',
              maxHeight: '92vh',
              borderRadius: 12,
              boxShadow: '0 20px 50px rgba(0,0,0,.5)',
            }}
          />
        </div>
      )}
    </main>
  );
}
