import type { Metadata, Viewport } from "next";
import { COPY } from "@/lib/copy";
import "./globals.css";

export const metadata: Metadata = {
  title: COPY.app.name,
  description: COPY.app.metaDescription,
  applicationName: COPY.app.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: COPY.app.name,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fff9f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
