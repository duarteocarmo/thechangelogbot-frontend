import "./globals.css";
import type { Metadata } from "next";
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
      <head>
        <script
          defer
          data-domain="changelog.duarteocarmo.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className={roboto_mono.className}>{children}</body>
    </html>
  );
}
