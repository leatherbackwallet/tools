import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dev.ric.castle — Developer Tools & Resources",
  description:
    "Free client-side developer tools, CSS generators, and Germany residency resources. EN/DE bilingual.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DSXWR1M2TK" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-DSXWR1M2TK');` }} />
      </head>
      <body>
        <LanguageProvider>
          <Nav />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
