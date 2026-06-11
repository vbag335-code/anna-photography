import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["100", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ANNA — Photography",
  description: "Photography — people, places & the in-between",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-bw="0" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${archivo.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
