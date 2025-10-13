/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./Header";

export const metadata: Metadata = {
  title: "Lexylon — Custom Wooden Letters",
  description: "Hand-cut wooden signs and names. Order online with live preview.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@700&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <div className="page">{children}</div>
          <footer className="foot">© {new Date().getFullYear()} Lexylon · Made in Cyprus</footer>
        </Providers>
      </body>
    </html>
  );
}
