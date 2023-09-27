import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Changelog Neural Search",
  description:
    "Use neural search to search for podcasts on the Changelog Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <Head>
        <script
          defer
          data-domain="changelog.duarteocarmo.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body className="font-mono">{children}</body>
    </html>
  );
}
