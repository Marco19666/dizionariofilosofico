import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dizionario universale della storia della filosofia",
  description: "Un'enciclopedia digitale, comparata e interattiva delle tradizioni filosofiche del mondo."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
