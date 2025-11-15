'use client';

import Image from 'next/image';
import * as React from 'react';
import { useUI } from '../../providers';

type Work = { src: string; title?: string };
type Artist = {
  id: string;
  nameEl: string;
  nameEn: string;
  bioEl?: string;
  bioEn?: string;
  works: Work[];
};

// ====== configure your artists & images ======
const ARTISTS: Artist[] = [
  {
    id: 'design-x',
    nameEl: 'DESIGN X',
    nameEn: 'DESIGN X',
    bioEl: 'Γραμμικά, καθαρά σχέδια – custom αριθμοί & πινακίδες.',
    bioEn: 'Linear, clean designs—custom numbers & plaques.',
    works: [
      { src: '/gallery/designx/01.jpg',},
      { src: '/gallery/designx/02.jpg',},
      { src: '/gallery/designx/03.jpg',},
      { src: '/gallery/designx/04.jpg',},
      { src: '/gallery/designx/04.jpg',},
      { src: '/gallery/designx/05.jpg',},
      { src: '/gallery/designx/06.jpg',},
      { src: '/gallery/designx/07.jpg',},
      { src: '/gallery/designx/09.jpg',},
      { src: '/gallery/designx/10.jpg',},
      { src: '/gallery/designx/11.jpg',},
    ],
  },
  {
    id: 'toxicc',
    nameEl: 'TOXIC C',
    nameEn: 'TOXIC C',
    bioEl: 'Έντονα χρώματα & playful lettering.',
    bioEn: 'Bold colors & playful lettering.',
    works: [
      { src: '/gallery/toxicc/01.jpg',},
      { src: '/gallery/toxicc/02.jpg',},
      { src: '/gallery/toxicc/03.jpg',},
      { src: '/gallery/toxicc/04.jpg',},
    ],
  },
  {
    id: 'xenios',
    nameEl: 'UNIQUE',
    nameEn: 'UNIQUE',
    bioEl: 'Χειροποίητες λεπτομέρειες, ιδιαίτερα φινιρίσματα.',
    bioEn: 'Handcrafted detail, refined finishes.',
    works: [
      { src: '/gallery/xenios/01.jpg',},
      { src: '/gallery/xenios/02.jpg',},
      { src: '/gallery/xenios/03.jpg',},
      { src: '/gallery/xenios/04.jpg',},
      { src: '/gallery/xenios/05.jpg',},
      { src: '/gallery/xenios/06.jpg',},
      { src: '/gallery/xenios/07.jpg',},
      { src: '/gallery/xenios/08.jpg',},
      { src: '/gallery/xenios/09.jpg',},
      { src: '/gallery/xenios/10.jpg',},
    ],
  },
];

// simple lightbox helper
function useLightbox() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Work[]>([]);
  const [idx, setIdx] = React.useState(0);

  const show = (list: Work[], start: number) => {
    setItems(list);
    setIdx(start);
    setOpen(true);
  };
  const close = () => setOpen(false);
  const next = () => setIdx(i => (i + 1) % items.length);
  const prev = () => setIdx(i => (i - 1 + items.length) % items.length);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, items.length]);

  return { open, items, idx, show, close, next, prev };
}

export default function GalleryByArtist() {
  const { lang } = useUI();
  const isEl = lang === 'el';
  const [filter, setFilter] = React.useState<'all' | string>('all');
  const { open, items, idx, show, close, next, prev } = useLightbox();

  const visible = filter === 'all' ? ARTISTS : ARTISTS.filter(a => a.id === filter);

  return (
    // Pick ONE background class here:
    // galleryBg--topo  OR  galleryBg--warm  OR  galleryBg--wood
    <section className="galleryBg galleryBg--topo">
      <main className="container galleryPage">
        <h1 className="pageTitle brand">{isEl ? 'Γκαλερί' : 'Gallery'}</h1>

        {/* Filter pills (sticky) */}
        <div className="galleryFilters">
          <button
            className={`pill ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {isEl ? 'Όλοι οι Καλλιτέχνες' : 'All Artists'}
          </button>
          {ARTISTS.map(a => (
            <button
              key={a.id}
              className={`pill ${filter === a.id ? 'is-active' : ''}`}
              onClick={() => setFilter(a.id)}
            >
              {isEl ? a.nameEl : a.nameEn}
            </button>
          ))}
        </div>

        {visible.map(a => (
          <section key={a.id} className="artistSection">
            <header className="artistHeader">
              <h2 className="artistName">{isEl ? a.nameEl : a.nameEn}</h2>
              {(a.bioEl || a.bioEn) && (
                <p className="artistBio muted">{isEl ? a.bioEl : a.bioEn}</p>
              )}
            </header>

            <div className="worksGrid">
              {a.works.map((w, i) => (
                <button
                  key={`${a.id}-${i}`}
                  className="thumb"
                  onClick={() => show(a.works, i)}
                  aria-label={(w.title || 'Artwork') + ' – open'}
                >
                  <span className="thumbImg">
                    <Image
                      src={w.src}
                      alt={w.title || 'Artwork'}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="thumbImgEl"
                    />
                  </span>
                  {w.title && <span className="thumbCap">{w.title}</span>}
                </button>
              ))}
            </div>

            <p className="footnote muted">
              {isEl ? 'Κλικ σε εικόνα για μεγέθυνση.' : 'Click an image to enlarge.'}
            </p>
          </section>
        ))}

        {/* Lightbox */}
        {open && items[idx] && (
          <div className="lb" role="dialog" aria-modal="true" onClick={close}>
            <button className="lbBtn left" onClick={(e) => (e.stopPropagation(), prev())} aria-label="Previous">‹</button>
            <button className="lbBtn right" onClick={(e) => (e.stopPropagation(), next())} aria-label="Next">›</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[idx].src} alt={items[idx].title || 'Artwork'} className="lbImg" onClick={(e) => e.stopPropagation()} />
            {items[idx].title && <div className="lbCap">{items[idx].title}</div>}
          </div>
        )}
      </main>
    </section>
  );
}
