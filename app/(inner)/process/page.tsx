// app/process/page.tsx
'use client';
import { useUI } from '../../providers';

export default function ProcessPage() {
  const { lang } = useUI();
  const isEl = lang === 'el';

  return (
    <main className="container narrow">
      <h1 className="pageTitle brand">{isEl ? 'Πώς το φτιάχνουμε' : 'How we make it'}</h1>

      <section className="card videoCard" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="videoWrap">
          <video className="videoEl" controls preload="metadata" poster="/video-poster.jpg">
            <source src="/how.mp4" type="video/mp4" />
            {isEl ? 'Ο φυλλομετρητής σας δεν υποστηρίζει video.' : 'Your browser does not support the video tag.'}
          </video>
        </div>
      </section>

      <section className="card prose">
        <p>
          {isEl
            ? 'Κάθε κατασκευή της Lexylon είναι αποτέλεσμα συνδυασμού τεχνολογίας και χειροποίητης φροντίδας. Ξεκινάμε με το κείμενό σας, προσαρμόζουμε τη γραμματοσειρά και το ύψος και δημιουργούμε το αρχείο κοπής. Προχωράμε στην κοπή του ξύλου με ακρίβεια και στη συνέχεια αφιερώνουμε χρόνο στο τρίψιμο των ακμών και των καμπύλων ώστε να είναι άνετες στο άγγιγμα και όμορφες στο μάτι. Εκεί αποφασίζετε και το φινίρισμα: άβαφο, ματ βερνίκι, βαμμένο ή σκούρο λούστρο. Κάθε λέξη περνάει τελικό ποιοτικό έλεγχο και συσκευάζεται με προσοχή.'
            : 'Every Lexylon piece blends digital precision with hand craftsmanship. We tune font and height, prepare the cut file, cut the wood precisely, then sand edges and curves until smooth to the touch and pleasing to the eye. You pick the finish—natural, matte clear, painted color, or warm dark stain. Each word receives a final quality check and careful packaging.'}
        </p>
      </section>
    </main>
  );
}
