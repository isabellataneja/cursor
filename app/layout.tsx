import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mastering Cursor — The Ultimate Guide",
  description: "A complete interactive guide to Cursor, GitHub, Vercel, and Retool workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
