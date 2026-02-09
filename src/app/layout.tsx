import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenRoots Boutique | Offrez un arbre, soutenez la reforestation",
  description:
    "GreenRoots est une boutique en ligne écoresponsable qui permet de financer la plantation d’arbres. Participez à la reforestation et contribuez à l'environnement.",
    metadataBase: new URL("https://greenapp.wowportfolio.work"),
  openGraph: {
    title: "GreenRoots Boutique",
    description:
      "Offrez un arbre, soutenez la reforestation.",
    url: "https://greenapp.wowportfolio.work",
    siteName: "GreenRoots",
    images: ["/og-image.jpg"], // image placée dans public/
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenRoots Boutique",
    description:
      "Offrez un arbre, soutenez la reforestation.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo_green.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
