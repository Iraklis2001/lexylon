'use client';
import * as React from 'react';

type Lang = 'el' | 'en';
type Theme = 'light' | 'dark';

const DICT: Record<Lang, Record<string, string>> = {
  el: {
    // Nav
    home: 'Αρχική',
    services: 'Υπηρεσίες',
    gallery: 'Γκαλερί',
    order: 'Παραγγελία',
    process: 'Διαδικασία',
    about: 'Σχετικά',
    contact: 'Επικοινωνία',
    callUs: 'Κάλεσέ μας',

    // CTAs
    ctaOrder: 'Ξεκινήστε Παραγγελία',
    ctaGallery: 'Δείτε Γκαλερί',
    ctaAbout: 'Σχετικά',
    ctaFAQ: 'Συχνές Ερωτήσεις',
    learnMore: 'Μάθετε περισσότερα',

    // Hero (Home)
    heroTitle: 'Όμορφες Προσωποποιημένες Ξύλινες Πινακίδες',
    heroSubtitle:
      'Διαλέξτε κείμενο, γραμματοσειρά, φινίρισμα και μέγεθος. Προεπισκόπηση και παραγγελία σε λίγα λεπτά.',

    // Audience block (Home – optional)
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

    // Process block (Home – optional)
    processTitle: 'Πώς το φτιάχνουμε',
    processSummary:
      'Κάθε κατασκευή της Lexylon είναι αποτέλεσμα συνδυασμού τεχνολογίας και χειροποίητης φροντίδας...',
    processStep1: 'Σχεδίαση & επιλογή γραμματοσειράς/ύψους',
    processStep2: 'Κοπή ξύλου με ακρίβεια',
    processStep3: 'Τρίψιμο & έλεγχος λεπτομερειών',
    processStep4: 'Φινίρισμα (άβαφο/ματ/βαμμένο/σκούρο)',
    processStep5: 'Τελικός έλεγχος & συσκευασία',

    // About – main block
    aboutWelcome: 'Καλώς ήρθατε στη Lexylon',
    aboutTitle: 'Έχουμε 25 χρόνια εμπειρίας σε ξυλουργικές υπηρεσίες',
    aboutLead:
      'Κάθε κατασκευή συνδυάζει τεχνολογία και χειροποίητη φροντίδα...',
    aboutCheck1: 'Σύστημα Ελέγχου Ποιότητας',
    aboutCheck2: '100% Ικανοποίηση Πελατών',
    aboutCheck3: 'Δέσμευση προς τους πελάτες',
    aboutCheck4: 'Υψηλή επαγγελματική ξυλουργική',
    aboutCheck5: 'Γρήγορη παράδοση',
    aboutCheck6: 'Προσεκτική συσκευασία',
    aboutFounder: 'Teddy Saunders',
    aboutFounderRole: 'CEO & Ιδρυτής',
    aboutSatisfied: 'Ικανοποιημένοι πελάτες',
    aboutMoreBtn: 'Περισσότερα για εμάς',

    // About – Services preview
    ourServices: 'Οι Υπηρεσίες μας',
    bestCarpenter: 'Καλύτερες Ξυλουργικές Υπηρεσίες',
    allServices: 'Όλες οι Υπηρεσίες',
    svc1Title: 'Lobster Font Box',
    svc2Title: 'Satisfy Font Box',
    svc3Title: 'Magnolia Sky',
    svc4Title: 'Ξύλινο Δάπεδο',
    svc5Title: 'Custom Εργασίες',
    svc6Title: 'Τελειώματα Ξυλουργικής',
    svcBlurb:
      'Σύντομη περιγραφή υπηρεσίας για να δώσουμε μια καθαρή εικόνα για το τι παρέχουμε.',

    // Who We Are / stats
    whoWeAre: 'Ποιοι είμαστε',
    whoTitle: 'Ειδικοί Ξυλουργοί που μπορείτε να εμπιστευτείτε',
    whoLead:
      'Παρέχουμε χειροποίητες κατασκευές με ακρίβεια και συνέπεια...',
    statYears: 'Χρόνια Εμπειρίας',
    statProjects: 'Ολοκληρωμένα έργα',
    statClients: 'Ικανοποιημένοι πελάτες',
    statCarpenters: 'Επαγγελματίες ξυλουργοί',
  },

  en: {
    // Nav
    home: 'Home',
    services: 'Services',
    gallery: 'Gallery',
    order: 'Order',
    process: 'Process',
    about: 'About',
    contact: 'Contact',
    callUs: 'Call us',

    // CTAs
    ctaOrder: 'Start Your Order',
    ctaGallery: 'View Gallery',
    ctaAbout: 'About',
    ctaFAQ: 'FAQ',
    learnMore: 'Learn more',

    // Hero (Home)
    heroTitle: 'Beautiful Custom Wooden Signs',
    heroSubtitle:
      'Pick your text, font, finish, and size. Preview and place your order in minutes.',

    // Audience block (Home – optional)
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

    // Process block (Home – optional)
    processTitle: 'How we make it',
    processSummary:
      'Every Lexylon piece blends technology with hand craftsmanship...',
    processStep1: 'Design & font/height selection',
    processStep2: 'Precision wood cutting',
    processStep3: 'Sanding & detailing',
    processStep4: 'Finishing (natural/matte/painted/dark stain)',
    processStep5: 'Final QA & packaging',

    // About – main block
    aboutWelcome: 'Welcome to Lexylon',
    aboutTitle: 'We Have 2 Years of Experience in Carpentry',
    aboutLead:
      'Every piece blends technology and hand craftsmanship...',
    aboutCheck1: 'Quality Control System',
    aboutCheck2: '100% Satisfaction Guarantee',
    aboutCheck3: 'Commitment to Customers',
    aboutCheck4: 'Highly Professional Carpentry',
    aboutCheck5: 'Fast Turnaround',
    aboutCheck6: 'Careful Packaging',
    aboutFounder: 'Xenios Charalambous',
    aboutFounderRole: 'CEO & Founder',
    aboutSatisfied: 'Satisfied Clients',
    aboutMoreBtn: 'More About Us',

    // About – Services preview
    ourServices: 'Our Services',
    bestCarpenter: 'Best Carpenter Service',
    allServices: 'All Services',
    svc1Title: 'Lobster Font Box',
    svc2Title: 'Satisfy Font Box',
    svc3Title: 'Magnolia Sky',
    svc4Title: 'Wooden Floor',
    svc5Title: 'Custom Work',
    svc6Title: 'Finish Carpentry',
    svcBlurb:
      'Short service description to give a crisp idea of what we provide.',

    // Who We Are / stats
    whoWeAre: 'Who We Are',
    whoTitle: 'Expert Carpenter & Craftsman Service You Can Trust',
    whoLead:
      'We deliver handmade pieces with precision and consistency...',
    statYears: 'Years Of Experience',
    statProjects: 'Successful Project',
    statClients: 'Satisfied Clients',
    statCarpenters: 'Professional Carpenter',
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

  // hydrate from localStorage once
  React.useEffect(() => {
    const savedLang = (localStorage.getItem('lang') as Lang) || 'el';
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setLang(savedLang);
    setTheme(savedTheme);
  }, []);

  // reflect to <html> when values change
  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleLang = () =>
    setLang(prev => {
      const next = prev === 'el' ? 'en' : 'el';
      localStorage.setItem('lang', next);
      return next;
    });

  const toggleTheme = () =>
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });

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

// --- FAQ content (bilingual) -------------------------------------------
export type FAQItem = { q: string; a: string };

const FAQ_CONTENT: Record<Lang, FAQItem[]> = {
  el: [
    {
      q: 'Χρόνος παράδοσης',
      a: 'Συνήθως 3–5 εργάσιμες ημέρες. Για επείγουσες παραγγελίες επικοινωνήστε μαζί μας.',
    },
    {
      q: 'Υλικά & Φινίρισμα',
      a: 'Χρησιμοποιούμε MDF/ply και οικολογικές βαφές νερού. Επιλογές: Άβαφο, Ματ βερνίκι, Βαμμένο, Σκούρο λούστρο.',
    },
    {
      q: 'Πληρωμή',
      a: 'Μετρητά ή τραπεζική μεταφορά. Κάρτες κατόπιν συνεννόησης.',
    },
    {
      q: 'Αποστολή',
      a: 'Παραλαβή στην Κύπρο ή αποστολή με χρέωση κατόπιν υπολογισμού.',
    },
  ],
  en: [
    {
      q: 'Turnaround',
      a: 'Typically 3–5 business days. Contact us for rush orders.',
    },
    {
      q: 'Materials & Finish',
      a: 'We use MDF/plywood and water-based coatings. Options: Unfinished, Matte clear, Painted, Dark stain.',
    },
    {
      q: 'Payment',
      a: 'Cash or bank transfer. Cards available on request.',
    },
    {
      q: 'Shipping',
      a: 'Pickup in Cyprus or shipping quoted case-by-case.',
    },
  ],
};

// Hook to read FAQ in the current language
export function useFAQ(): FAQItem[] {
  const { lang } = useUI();
  return FAQ_CONTENT[lang];
}

// ===== ORDER: types, dictionary & hooks =====================================
export type OrderSizeId = 'A5' | 'A4' | 'A3';
export type OrderSize = { id: OrderSizeId; label: string; note: string };
export type OrderColor = { name: string; hex: string };

// Localized options (labels for sizes & color names)
const ORDER_SIZES: Record<Lang, OrderSize[]> = {
  el: [
    { id: 'A5', label: 'A5', note: 'μικρό' },
    { id: 'A4', label: 'A4', note: 'μεσαίο' },
    { id: 'A3', label: 'A3', note: 'μεγάλο' },
  ],
  en: [
    { id: 'A5', label: 'A5', note: 'small' },
    { id: 'A4', label: 'A4', note: 'medium' },
    { id: 'A3', label: 'A3', note: 'large' },
  ],
};

const ORDER_COLORS: Record<Lang, OrderColor[]> = {
  el: [
    { name: 'Μαύρο',       hex: '#111111' },
    { name: 'Ζεστό καφέ',  hex: '#7a4b27' },
    { name: 'Καρυδιά',     hex: '#5a3b2b' },
    { name: 'Λευκό',       hex: '#ffffff' },
    { name: 'Άμμος',       hex: '#d7c7a9' },
    { name: 'Κεραμιδί',    hex: '#b45a3c' },
    { name: 'Πράσινο',     hex: '#365d43' },
    { name: 'Μπλε',        hex: '#244a7a' },
  ],
  en: [
    { name: 'Black',      hex: '#111111' },
    { name: 'Warm Brown', hex: '#7a4b27' },
    { name: 'Walnut',     hex: '#5a3b2b' },
    { name: 'White',      hex: '#ffffff' },
    { name: 'Sand',       hex: '#d7c7a9' },
    { name: 'Brick',      hex: '#b45a3c' },
    { name: 'Forest',     hex: '#365d43' },
    { name: 'Deep Blue',  hex: '#244a7a' },
  ],
};

// UI strings for the Order page
// Add these keys to your DICT[el] and DICT[en] objects in the same file if you prefer
// keeping all strings together. If your DICT is above, extend it with these keys:
const ORDER_STRINGS: Record<Lang, Record<string, string>> = {
  el: {
    orderTitle: 'Ξεκινήστε την παραγγελία σας',
    orderSubtitle:
      'Επιλέξτε μέγεθος, φινίρισμα και χρώμα. Προσθέστε τις γραμμές σας και θα ετοιμάσουμε δοκίμιο.',
    preview: 'Προεπισκόπηση',
    details: 'Λεπτομέρειες',
    line: 'Γραμμή',
    addLine: 'Προσθήκη γραμμής',
    remove: 'Αφαίρεση',
    sizeLabel: 'Μέγεθος',
    finishLabel: 'Φινίρισμα',
    unpainted: 'Άβαφο',
    painted: 'Βαμμένο',
    colorLabel: 'Χρώμα',
    chooseColor: 'Επιλέξτε χρώμα',
    paintBy: 'Βάψιμο από',
    paintByNone: 'Χωρίς προτίμηση',
    paintByLexylon: 'Lexylon',
    paintByCustomer: 'Πελάτη',
    emailLabel: 'Email επιβεβαίωσης',
    emailFootnote: 'Εδώ θα στείλουμε το δοκίμιο και την επιβεβαίωση.',
    sendRequest: 'Αποστολή αιτήματος',
    pillSize: 'Μέγεθος',
    pillFinish: 'Φινίρισμα',
    pillLetters: 'Σύνολο γραμμάτων',
    featureFonts: 'Γραμματοσειρές: Script ή Sans',
    featureProof: 'Δοκίμιο πριν την κοπή',
    featurePackaging: 'Προσεκτική συσκευασία',
    yourTextHere: 'Φτιάξτω μόνος σου',

    // 🔹 ΝΕΑ ΚΛΕΙΔΙΑ για τη σελίδα Order
    sizePriceTitle: 'Μεγέθη & Τιμές',
    sizeLine: 'Κεφάλαιο: 8cm x 5cm   Μικρά: 6cm x 3,5cm',
    priceLine: 'Τιμές: 5 γράμματα : €15   Κάθε έξτρα γράμμα +€3',
    kidsFootnote:
      '＊ Επιλέγουμε και υποστηρίζουμε την επιλογή «Unpainted» ώστε τα παιδιά να μπορούν να βάψουν το κομμάτι μόνα τους και να διασκεδάσουν δημιουργικά.',
    kidsFinishNote:
      'Δεν το βάφουμε επίτηδες — έτσι το παιδί μπορεί να το βάψει μόνο του και να διασκεδάσει δημιουργικά!',
    designerLabel: 'Διάλεξε Designer:',
    designerUnique: 'Unique',
    designerToxicC: 'Toxic C',
    designerDesignX: 'Design X',
  },

  en: {
    orderTitle: 'Start your order',
    orderSubtitle:
      'Pick size, finish and color. Add your text lines and we’ll prepare a proof.',
    preview: 'Preview',
    details: 'Details',
    line: 'Line',
    addLine: 'Add line',
    remove: 'Remove',
    sizeLabel: 'Size',
    finishLabel: 'Finish',
    unpainted: 'Unpainted',
    painted: 'Painted',
    colorLabel: 'Color',
    chooseColor: 'Choose a color',
    paintBy: 'Paint by',
    paintByNone: 'No preference',
    paintByLexylon: 'Lexylon',
    paintByCustomer: 'Customer',
    emailLabel: 'Confirmation email',
    emailFootnote: 'We’ll send your proof and confirmation to this email.',
    sendRequest: 'Send request',
    pillSize: 'Size',
    pillFinish: 'Finish',
    pillLetters: 'Total letters',
    featureFonts: 'Fonts: Script or Sans',
    featureProof: 'Proof before cutting',
    featurePackaging: 'Careful packaging',
    yourTextHere: 'Make your own',

    // 🔹 NEW KEYS for Order page
    sizePriceTitle: 'Sizes & Prices',
    sizeLine: 'Capitals: 8cm x 5cm   Lowercase: 6cm x 3.5cm',
    priceLine: 'Prices: 5 letters: €15   Each extra letter +€3',
    kidsFootnote:
      '* We love the “Unpainted” option so kids can paint the piece themselves and have fun.',
    kidsFinishNote:
      'We leave it unpainted so your kid can color it themselves and have creative fun!',
    designerLabel: 'Choose Designer:',
    designerUnique: 'Unique',
    designerToxicC: 'Toxic C',
    designerDesignX: 'Design X',
  },
};


// A small hook that exposes localized sizes, colors and t-like lookup
export function useOrderDict() {
  const { lang } = useUI();
  const l = (key: string) => ORDER_STRINGS[lang][key] ?? key;
  return {
    lang,
    sizes: ORDER_SIZES[lang],
    colors: ORDER_COLORS[lang],
    l,
  };
}
