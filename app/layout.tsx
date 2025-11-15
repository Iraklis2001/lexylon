import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Header from './Header';

export const metadata: Metadata = {
  title: 'Lexylon — Custom Wooden Letters',
  description: 'Hand-cut wooden signs and names. Order online with live preview.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" data-theme="dark" data-tone="warm" suppressHydrationWarning>
      <head>
        {/* Google Fonts for the new hero/heading styles */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Optional: small perf boost */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <footer className="siteFooter">
  <div className="siteFooter__inner">

{/* Right: spacer (keeps the center perfectly centered) */}
    <div className="siteFooter__spacer" />
  </div>
  
    {/* Center: copyright */}
    <div className="siteFooter__copy">
      © {new Date().getFullYear()} Lexylon · Made in Cyprus
    </div>

    
</footer>
        </Providers>
      </body>
    </html>
  );
}
