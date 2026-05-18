import type { Metadata } from "next";
import { COPY } from "@/lib/copy";
import "./globals.css";

export const metadata: Metadata = {
  title: COPY.app.name,
  description: COPY.app.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-[100dvh] antialiased">
        {children}
      </body>
    </html>
  );
}
