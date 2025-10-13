'use client';
import * as React from 'react';

type Theme = 'light' | 'dark';
type Lang = 'en' | 'el';

// base keys you can call: t('home'), t('order'), ...
// …existing imports…

// base keys you can call everywhere: t('home'), t('about'), …
const KEYS = [
  'home','order','gallery','about',
  'yourTextHere','line','addLine','chooseFont','finish','height','email','notes','submit','totalLetters','remove',
    'heroTitle','heroSubtitle','feature1','feature2','feature3','ctaOrder','ctaAbout','ctaFAQ',

  // about page
  'aboutHeadline','aboutFounded','aboutTeam','phone','instagram'
] as const;
type BaseKey = typeof KEYS[number];

const dict: Record<`${BaseKey}_${Lang}`, string> = {
  home_en:'Home', home_el:'Αρχική',
  order_en:'Order', order_el:'Παραγγελία',
  gallery_en:'Gallery', gallery_el:'Γκάλερι',
  about_en:'About', about_el:'Σχετικά',

  yourTextHere_en:'Your Text Here', yourTextHere_el:'Το Κείμενό σας',
  line_en:'Line', line_el:'Γραμμή',
  addLine_en:'+ Add Line (max 3)', addLine_el:'+ Προσθήκη Γραμμής (έως 3)',
  chooseFont_en:'Choose Font', chooseFont_el:'Επιλογή Γραμματοσειράς',
  finish_en:'Finish', finish_el:'Φινίρισμα',
  height_en:'Height', height_el:'Ύψος',
  email_en:'Email', email_el:'Email',
  notes_en:'Notes', notes_el:'Σημειώσεις',
  submit_en:'Submit Order', submit_el:'Αποστολή Παραγγελίας',
  totalLetters_en:'Total Letter Count', totalLetters_el:'Σύνολο Γραμμάτων',
  remove_en:'Remove', remove_el:'Αφαίρεση',

  // About content
  aboutHeadline_en: 'About Lexylon',
  aboutHeadline_el: 'Σχετικά με τη Lexylon',
  aboutFounded_en: 'Lexylon was founded in 2024 and has served 1,000+ customers.',
  aboutFounded_el: 'Η Lexylon δημιουργήθηκε το 2024 και έχει εξυπηρετήσει πάνω από 1000 πελάτες.',
  aboutTeam_en: 'Our team crafts unique wooden, handmade words—combining art and quality.',
  aboutTeam_el: 'Η ομάδα μας δημιουργεί μοναδικές ξύλινες, χειροποίητες λέξεις, συνδυάζοντας τέχνη και ποιότητα.',
  phone_en:'Phone', phone_el:'Τηλέφωνο',
  instagram_en:'Instagram', instagram_el:'Instagram',

  // Add to dict
heroTitle_en: 'Beautiful Custom Wooden Signs',
heroTitle_el: 'Όμορφες Ξύλινες Προσωποποιημένες Πινακίδες',

heroSubtitle_en: 'Pick your text, font, finish, and size. Preview and place your order in minutes.',
heroSubtitle_el: 'Διαλέξτε κείμενο, γραμματοσειρά, φινίρισμα και μέγεθος. Προεπισκόπηση και παραγγελία σε λίγα λεπτά.',

feature1_en: 'Fonts: Alegreya, Montserrat, Times New Roman',
feature1_el: 'Γραμματοσειρές: Alegreya, Montserrat, Times New Roman',

feature2_en: 'Two lines max with live preview',
feature2_el: 'Μέγιστο δύο γραμμές με ζωντανή προεπισκόπηση',

feature3_en: 'Multiple finishes and heights',
feature3_el: 'Πολλαπλά φινιρίσματα και ύψη',

ctaOrder_en: 'Start Your Order',
ctaOrder_el: 'Ξεκινήστε Παραγγελία',

ctaAbout_en: 'About',
ctaAbout_el: 'Σχετικά',

ctaFAQ_en: 'FAQ',
ctaFAQ_el: 'Συχνές Ερωτήσεις',

};


type Ctx = {
  theme: Theme; toggleTheme: () => void;
  lang: Lang; toggleLang: () => void;
  t: (k: BaseKey) => string;
};

const UIContext = React.createContext<Ctx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('dark');
  const [lang, setLang] = React.useState<Lang>('en');

  React.useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as Theme) || null;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(storedTheme ?? (prefersDark ? 'dark' : 'light'));

    const storedLang = (localStorage.getItem('lang') as Lang) || 'en';
    setLang(storedLang);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(p => (p === 'light' ? 'dark' : 'light'));
  const toggleLang = () => setLang(p => (p === 'en' ? 'el' : 'en'));
  const t = (k: BaseKey) => dict[`${k}_${lang}`];

  return (
    <UIContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = React.useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within <Providers>');
  return ctx;
}
