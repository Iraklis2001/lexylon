'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const [isEl, setIsEl] = useState(true);

  // Read language from <html lang="...">
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsEl(document.documentElement.lang === 'el');
    }
  }, []);

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
                alt={isEl ? 'Εργαστήριο / προϊόν' : 'Workshop / product photo'}
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
                  1267
                  <span className="about__plus">+</span>
                </div>
                <div className="about__label">
                  {isEl ? 'Ικανοποιημένοι πελάτες' : 'Satisfied Clients'}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: copy, checklist, founder, CTA */}
          <section className="about__content">
            <p className="eyebrow">
              {isEl ? 'Καλώς ήρθατε στη Lexylon' : 'Welcome to Lexylon'}
            </p>

            <h1 className="about__title">
              {isEl
                ? 'Έχουμε 25 χρόνια εμπειρίας σε ξυλουργικές υπηρεσίες'
                : 'We Have 2 Years of Experience in Carpentry'}
            </h1>

            <p className="muted about__lead">
              {isEl
                ? 'Κάθε κατασκευή συνδυάζει τεχνολογία και χειροποίητη φροντίδα...'
                : 'Every piece blends technology and hand craftsmanship...'}
            </p>

            <div className="about__checks">
              <ul className="about__list">
                <li>
                  {isEl
                    ? 'Σύστημα Ελέγχου Ποιότητας'
                    : 'Quality Control System'}
                </li>
                <li>
                  {isEl
                    ? '100% Ικανοποίηση Πελατών'
                    : '100% Satisfaction Guarantee'}
                </li>
                <li>
                  {isEl ? 'Δέσμευση προς τους πελάτες' : 'Commitment to Customers'}
                </li>
              </ul>
              <ul className="about__list">
                <li>
                  {isEl
                    ? 'Υψηλή επαγγελματική ξυλουργική'
                    : 'Highly Professional Carpentry'}
                </li>
                <li>{isEl ? 'Γρήγορη παράδοση' : 'Fast Turnaround'}</li>
                <li>
                  {isEl ? 'Προσεκτική συσκευασία' : 'Careful Packaging'}
                </li>
              </ul>
            </div>

            <div className="about__footer">
              <div className="about__founder">
                <Image
                  src="/gallery/xenios.png" // founder avatar
                  alt="Xenios Charalambous"
                  width={54}
                  height={54}
                  className="about__avatar"
                />
                <div>
                  <div className="about__sig">Xenios Charalambous</div>
                  <div className="about__role muted">
                    {isEl ? 'CEO & Ιδρυτής' : 'CEO & Founder'}
                  </div>
                </div>
              </div>

              <Link href="/contact" className="btn btn--primary about__cta">
                {isEl ? 'Περισσότερα για εμάς' : 'More About Us'}
              </Link>
            </div>
          </section>
        </main>
      </section>

            {/* ===== SERVICES / PRODUCT INFO CARDS ===== */}
      <section className="paper paper--pattern">
        <div className="svc container">
          {/* Header – centered, no button */}
          <div className="svc__head svc__head--center">
            <div>
              <p className="eyebrow">
                {isEl ? 'Οι Υπηρεσίες μας' : 'Our Services'}
              </p>
              <h2 className="svc__title svc__title--big">
                {isEl
                  ? 'Καλύτερες Ξυλουργικές Υπηρεσίες'
                  : 'Best Carpenter Service'}
              </h2>
            </div>
          </div>

          <div className="svc__grid svc__grid--info">
            {/* 1. Materials & Build */}
            <article className="svcCard">
              <div className="svcCard__icon">🪵</div>
              <h3 className="svcCard__head svcCard__head--strong">
                {isEl ? 'Υλικά & Κατασκευή' : 'Materials & Build'}
              </h3>
              <ul className="svcList">
                <li>
                  {isEl
                    ? 'Ξύλο MDF/ply (8–12 mm) ανάλογα με το μέγεθος.'
                    : 'MDF/plywood (8–12 mm) depending on size.'}
                </li>
                <li>
                  {isEl
                    ? 'Κοπή με ακρίβεια, τρίψιμο ακμών/καμπύλων για λεία υφή.'
                    : 'Precision cut, edges/curves sanded smooth.'}
                </li>
                <li>
                  {isEl
                    ? 'Βαφές/βερνίκια νερού· ασφαλή για εσωτερικούς χώρους.'
                    : 'Water-based paints/clear coats; safe for indoor use.'}
                </li>
                <li>
                  {isEl
                    ? 'Προαιρετικά βάση στήριξης κατόπιν συνεννόησης.'
                    : 'Optional stand/base on request.'}
                </li>
              </ul>
            </article>

            {/* 2. Sizes */}
            <article className="svcCard">
              <div className="svcCard__icon">📐</div>
              <h3 className="svcCard__head svcCard__head--strong">
                {isEl ? 'Μεγέθη' : 'Sizes'}
              </h3>
              <ul className="svcList">
                <li>A5 · A4 · A3</li>
                <li>
                  {isEl
                    ? 'Το τελικό μήκος προσαρμόζεται από τον αριθμό γραμμάτων.'
                    : 'Final length varies with word length.'}
                </li>
                <li>
                  {isEl
                    ? 'Κατάλληλα για ράφι, τοίχο, τραπέζι events.'
                    : 'Great for shelves, walls, and event tables.'}
                </li>
              </ul>
            </article>

            {/* 3. Finish & Colours */}
            <article className="svcCard">
              <div className="svcCard__icon">🎨</div>
              <h3 className="svcCard__head svcCard__head--strong">
                {isEl ? 'Φινίρισμα & Χρώματα' : 'Finish & Colours'}
              </h3>
              <ul className="svcList">
                <li>
                  {isEl
                    ? 'Χωρίς βαφή (None) ή ματ βερνίκι.'
                    : 'None (unpainted) or matte clear.'}
                </li>
                <li>
                  {isEl
                    ? 'Βαφή: μαύρο, λευκό, κόκκινο, πράσινο, μπλε, κίτρινο, πορτοκαλί.'
                    : 'Painted: black, white, red, green, blue, yellow, orange.'}
                </li>
                <li>
                  {isEl
                    ? 'Unique — χειροποίητη αισθητική.'
                    : 'Unique — hand-painted aesthetic.'}
                </li>
                <li>
                  {isEl
                    ? 'Design X (+40€) ή Toxic C (+40€) — ειδικά στυλ βαφής.'
                    : 'Design X (+€40) or Toxic C (+€40) — special paint styles.'}
                </li>
                <li className="muted">
                  {isEl
                    ? '※ Επιβαρύνσεις προστίθενται στην τιμή μεγέθους.'
                    : '※ Surcharges are added to the base size price.'}
                </li>
              </ul>
            </article>

            {/* 4. What’s included */}
            <article className="svcCard">
              <div className="svcCard__icon">✅</div>
              <h3 className="svcCard__head svcCard__head--strong">
                {isEl ? 'Τι περιλαμβάνει' : 'What’s Included'}
              </h3>
              <ul className="svcList">
                <li>
                  {isEl
                    ? 'Επιλογή γραμματοσειράς & ύψους.'
                    : 'Font & height selection.'}
                </li>
                <li>
                  {isEl
                    ? 'Κοπή ξύλου με ακρίβεια.'
                    : 'Precision cutting.'}
                </li>
                <li>
                  {isEl
                    ? 'Τρίψιμο & λεπτομέρειες.'
                    : 'Sanding & detailing.'}
                </li>
                <li>
                  {isEl
                    ? 'Φινίρισμα (σύμφωνα με την επιλογή σας).'
                    : 'Chosen finish applied.'}
                </li>
                <li>
                  {isEl
                    ? 'Τελικός έλεγχος & συσκευασία.'
                    : 'Final QA & packaging.'}
                </li>
              </ul>
            </article>

            {/* 5. Turnaround */}
            <article className="svcCard">
              <div className="svcCard__icon">⏱️</div>
              <h3 className="svcCard__head svcCard__head--strong">
                {isEl ? 'Χρόνος Παράδοσης' : 'Turnaround'}
              </h3>
              <ul className="svcList">
                <li>
                  {isEl
                    ? 'Συνήθως 3–5 εργάσιμες ημέρες.'
                    : 'Typically 3–5 business days.'}
                </li>
                <li>
                  {isEl ? 'Επείγον; Επικοινωνήστε.' : 'Rush? Get in touch.'}
                </li>
                <li className="muted">
                  {isEl
                    ? 'Με Design X/Toxic C η προεπισκόπηση μπορεί να μην εμφανίζεται — εφαρμόζουμε custom στυλ & περιλαμβάνεται μικρό μυστικό δωράκι.'
                    : 'With Design X/Toxic C the preview may be hidden—custom styling & a small mystery gift included.'}
                </li>
              </ul>
            </article>

            {/* 6. Shipping & Payment */}
            <article className="svcCard">
              <div className="svcCard__icon">🚚</div>
              <h3 className="svcCard__head svcCard__head--strong">
                {isEl ? 'Αποστολή & Πληρωμή' : 'Shipping & Payment'}
              </h3>
              <ul className="svcList">
                <li>
                  {isEl
                    ? 'Παραλαβή Κύπρο ή αποστολή κατόπιν υπολογισμού.'
                    : 'Pickup in Cyprus or shipping on request.'}
                </li>
                <li>
                  {isEl
                    ? 'Πληρωμή: μετρητά/τραπεζική μεταφορά (κάρτα κατόπιν συνεννόησης).'
                    : 'Payment: cash/bank transfer (card on request).'}
                </li>
                <li>
                  {isEl
                    ? 'Τηλ: +357 99943596 · Instagram: @lexylon.cy'
                    : 'Phone: +357 99943596 · Instagram: @lexylon.cy'}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>


      {/* ===== WHO WE ARE / STATS SPLIT ===== */}
      <section className="who">
        <div className="who__img">
          <Image
            src="/gallery/hero.jpg" // ensure this file exists
            alt={isEl ? 'Στούντιο / λεπτομέρεια ξύλου' : 'Studio / wood detail'}
            fill
            className="who__imgEl"
            sizes="(max-width: 1100px) 100vw, 50vw"
          />
        </div>

        <div className="who__panel">
          <p className="eyebrow">{isEl ? 'Ποιοι είμαστε' : 'Who We Are'}</p>
          <h2 className="who__title">
            {isEl
              ? 'Ειδικοί Ξυλουργοί που μπορείτε να εμπιστευτείτε'
              : 'Expert Carpenter & Craftsman Service You Can Trust'}
          </h2>
          <p className="muted who__lead">
            {isEl
              ? 'Παρέχουμε χειροποίητες κατασκευές με ακρίβεια και συνέπεια...'
              : 'We deliver handmade pieces with precision and consistency...'}
          </p>

          <ul className="who__stats">
            <li>
              <div className="who__num">
                2<span>+</span>
              </div>
              <div className="who__meta">
                {isEl ? 'Χρόνια Εμπειρίας' : 'Years Of Experience'}
              </div>
            </li>
            <li>
              <div className="who__num">
                1300<span>+</span>
              </div>
              <div className="who__meta">
                {isEl ? 'Ολοκληρωμένα έργα' : 'Successful Project'}
              </div>
            </li>
            <li>
              <div className="who__num">
                1267<span>+</span>
              </div>
              <div className="who__meta">
                {isEl ? 'Ικανοποιημένοι πελάτες' : 'Satisfied Clients'}
              </div>
            </li>
            <li>
              <div className="who__num">
                3<span>+</span>
              </div>
              <div className="who__meta">
                {isEl ? 'Επαγγελματίες ξυλουργοί' : 'Professional Carpenter'}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
