'use client';
import * as React from 'react';

type Lang = 'el' | 'en';
type Theme = 'light' | 'dark';

const DICT: Record<Lang, Record<string, string>> = {
  el: {
    // Nav / CTAs
    home: 'Αρχική',
    order: 'Παραγγελία',
    gallery: 'Γκαλερί',
    about: 'Σχετικά',
    ctaOrder: 'Ξεκινήστε Παραγγελία',
    ctaAbout: 'Σχετικά',
    ctaFAQ: 'Συχνές Ερωτήσεις',
    learnMore: 'Μάθετε περισσότερα',

    // Hero
    heroTitle: 'Όμορφες Ξύλινες Προσωποποιημένες Πινακίδες',
    heroSubtitle:
      'Διαλέξτε κείμενο, γραμματοσειρά, φινίρισμα και μέγεθος. Προεπισκόπηση και παραγγελία σε λίγα λεπτά.',
    feature1: 'Γραμματοσειρές: Alegreya, Montserrat, Times New Roman',
    feature2: 'Ζωντανή προεπισκόπηση με έως 2–3 γραμμές',
    feature3: 'Πολλαπλά φινιρίσματα και ύψη',

    // Audience block
    audienceTitle: 'Κοινά-στόχοι & ιδέες προϊόντων',
    weddingsTitle: 'A. Γάμοι & Events',
    weddingsLine1: 'Το όνομά σας, το δικό σας στυλ — πινακίδες γάμου από ξύλο, χειροποίητες.',
    weddingsLine2: 'Ονόματα ζευγαριών / “Mr & Mrs” / τραπέζια / candy table',
    weddingsLine3: 'Φράσεις για photo booth',
    bundleLabel: 'Πακέτο',
    bundleValue: '1 μεγάλη λέξη + 2 μικρές για τραπέζια',

    birthdaysTitle: 'B. Γενέθλια & Parties',
    birthdaysLine1: 'Ονόματα παιδιών, ηλικία (“Αλέξης 5”)',
    birthdaysLine2: 'Θεματικές φράσεις (“Party Time”, “Happy B-Day”)',

    newbornTitle: 'C. Νεογέννητα / Παιδικά δωμάτια',
    newbornLine1: 'Όνομα για τοίχο / πόρτα',
    newbornLine2: 'Σετ 3 μικρών λέξεων (“Dream • Play • Smile”)',

    educationTitle: 'D. Εκπαιδευτικό / Δάσκαλοι',
    educationLine1: 'Μικρές λέξεις, μεγάλα χαμόγελα — εκπαιδευτικά ξύλινα γράμματα.',
    educationLine2: 'Αλφαβητάριο/παιχνίδια λέξεων, “Reading Corner”',
    educationLine3: 'Δώρα τέλος χρονιάς (όνομα δασκάλου)',

    customTitle: 'E. Custom Gifts',
    customLine1: 'Ζευγάρια, επέτειοι, housewarming (“Home”, “Καλώς ήρθατε”)',
    customLine2: 'Επιχειρηματικά δώρα (μικρό logo/brand name)',

    // Process block
    processTitle: 'Πώς το φτιάχνουμε',
    processSummary:
      'Κάθε κατασκευή της Lexylon είναι αποτέλεσμα συνδυασμού τεχνολογίας και χειροποίητης φροντίδας. Ξεκινάμε με το κείμενό σας, προσαρμόζουμε γραμματοσειρά και ύψος και δημιουργούμε το αρχείο κοπής. Προχωράμε στην κοπή του ξύλου με ακρίβεια και στη συνέχεια αφιερώνουμε χρόνο στο τρίψιμο των ακμών και των καμπύλων. Στο τέλος επιλέγετε το φινίρισμα: άβαφο, ματ, βαμμένο ή σκούρο λούστρο. Κάθε λέξη περνάει τελικό ποιοτικό έλεγχο και συσκευάζεται με προσοχή.',
    processStep1: 'Σχεδίαση & επιλογή γραμματοσειράς/ύψους',
    processStep2: 'Κοπή ξύλου με ακρίβεια',
    processStep3: 'Τρίψιμο & έλεγχος λεπτομερειών',
    processStep4: 'Φινίρισμα (άβαφο/ματ/βαμμένο/σκούρο)',
    processStep5: 'Τελικός έλεγχος & συσκευασία',
  },

  en: {
    // Nav / CTAs
    home: 'Home',
    order: 'Order',
    gallery: 'Gallery',
    about: 'About',
    ctaOrder: 'Start Your Order',
    ctaAbout: 'About',
    ctaFAQ: 'FAQ',
    learnMore: 'Learn more',

    // Hero
    heroTitle: 'Beautiful Custom Wooden Signs',
    heroSubtitle:
      'Pick your text, font, finish, and size. Preview and place your order in minutes.',
    feature1: 'Fonts: Alegreya, Montserrat, Times New Roman',
    feature2: 'Live preview, up to 2–3 lines',
    feature3: 'Multiple finishes and heights',

    // Audience block
    audienceTitle: 'Audience & product ideas',
    weddingsTitle: 'A. Weddings & Events',
    weddingsLine1: 'Your names, your style — handmade wooden wedding signs.',
    weddingsLine2: 'Couple names / “Mr & Mrs” / table signs / candy table',
    weddingsLine3: 'Phrases for photo booth',
    bundleLabel: 'Bundle',
    bundleValue: '1 large word + 2 small table words',

    birthdaysTitle: 'B. Birthdays & Parties',
    birthdaysLine1: 'Kids’ names, age (“Alexis 5”)',
    birthdaysLine2: 'Themed phrases (“Party Time”, “Happy B-Day”)',

    newbornTitle: 'C. Newborn / Kids’ Rooms',
    newbornLine1: 'Name for wall/door',
    newbornLine2: 'Set of 3 small words (“Dream • Play • Smile”)',

    educationTitle: 'D. Education / Teachers',
    educationLine1: 'Small words, big smiles — wooden learning pieces.',
    educationLine2: 'Alphabet/word games, “Reading Corner”',
    educationLine3: 'End-of-year teacher gifts (name plaque)',

    customTitle: 'E. Custom Gifts',
    customLine1: 'Couples, anniversaries, housewarming (“Home”, “Welcome”)',
    customLine2: 'Business gifts (small logo/brand name)',

    // Process block
    processTitle: 'How we make it',
    processSummary:
      'Every Lexylon piece blends technology with hand craftsmanship. We start from your text, tune the font and height, prepare the cut file, then cut, sand and finish (natural, matte, painted, or dark stain). Each word is quality-checked and carefully packaged.',
    processStep1: 'Design & font/height selection',
    processStep2: 'Precision wood cutting',
    processStep3: 'Sanding & detailing',
    processStep4: 'Finishing (natural/matte/painted/dark stain)',
    processStep5: 'Final QA & packaging',
  },
};

type Ctx = {
  lang: Lang;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
};

const UIContext = React.createContext<Ctx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>('el');
  const [theme, setTheme] = React.useState<Theme>('dark');

  React.useEffect(() => {
    const savedLang = (localStorage.getItem('lang') as Lang) || 'el';
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setLang(savedLang);
    setTheme(savedTheme);
    document.documentElement.setAttribute('lang', savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'el' ? 'en' : 'el';
      localStorage.setItem('lang', next);
      document.documentElement.setAttribute('lang', next);
      return next;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  };

  const t = (key: string) => DICT[lang][key] ?? key;

  return (
    <UIContext.Provider value={{ lang, toggleLang, theme, toggleTheme, t }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = React.useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within <Providers>');
  return ctx;
}
