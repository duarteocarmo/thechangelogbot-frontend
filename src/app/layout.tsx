import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

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
    <html lang="en">
      <Head>
        <script
          defer
          data-domain="changelog.duarteocarmo.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body className={roboto_mono.className}>{children}</body>
    </html>
  );
}
