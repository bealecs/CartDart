import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/loading-fallbacks/LoadingEditProfile";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cart Dart",
  description: "The fast way to find local food vendors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <link rel="icon" href="/logo2.svg" />
      <body className="text-foreground">
        <main>
          <Suspense fallback={<Loading />}>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </Suspense>
        </main>
      </body>
    </html>
  );
}
