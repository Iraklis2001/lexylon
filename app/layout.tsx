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
    <html lang="el" data-theme="dark"data-tone="warm" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <footer className="foot">© {new Date().getFullYear()} Lexylon · Made in Cyprus</footer>
        </Providers>
      </body>
    </html>
  );
}
