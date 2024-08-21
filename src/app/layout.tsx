import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "微习惯",
  description: "先有一个习惯",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
