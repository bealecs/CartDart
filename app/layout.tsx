import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cart Dart",
  description: "The fastest way to find local food vendors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <link rel="icon" href="/logo2.svg" />
      <body className="bg-background text-foreground">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
