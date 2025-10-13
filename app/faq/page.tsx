'use client';
import { useUI } from '../providers';

export default function FAQ() {
  const { lang } = useUI();
  const isEl = lang === 'el';

  return (
    <main className="container">
      <h1 className="hero-title">
        {isEl ? 'Συχνές Ερωτήσεις' : 'Frequently Asked Questions'}
      </h1>

      <section
        className="card"
        style={{ display: 'grid', gap: 14, maxWidth: 900, margin: '0 auto' }}
      >
        <div>
          <h3>{isEl ? 'Χρόνος παράδοσης' : 'Turnaround'}</h3>
          <p>
            {isEl
              ? 'Συνήθως 3–5 εργάσιμες ημέρες. Επικοινωνήστε για επείγουσες παραγγελίες.'
              : 'Typically 3–5 business days. Contact us for rush orders.'}
          </p>
        </div>

        <div>
          <h3>{isEl ? 'Υλικά & φινίρισμα' : 'Materials & Finish'}</h3>
          <p>
            {isEl
              ? 'Ξύλο MDF/ply, βαφές νερού. Επιλογές: Άβαφο, Ματ βερνίκι, Βαμμένο, Σκούρο λούστρο.'
              : 'MDF/plywood, water-based paints. Options: Unpainted, Matte clear, Painted, Dark stain.'}
          </p>
        </div>

        <div>
          <h3>{isEl ? 'Πληρωμή' : 'Payment'}</h3>
          <p>
            {isEl
              ? 'Με μετρητά/τραπεζική μεταφορά. Κάρτες κατόπιν συνεννόησης.'
              : 'Cash/bank transfer. Card on request.'}
          </p>
        </div>

        <div>
          <h3>{isEl ? 'Αποστολή' : 'Shipping'}</h3>
          <p>
            {isEl
              ? 'Παραλαβή Κύπρο ή αποστολή κατόπιν υπολογισμού κόστους.'
              : 'Pickup in Cyprus or shipping quoted case-by-case.'}
          </p>
        </div>
      </section>
    </main>
  );
}
