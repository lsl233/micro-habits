import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { Nav } from "./_components/nav";
import Auth from "./_components/auth/auth";
import Link from "next/link";
import { auth } from "./auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "微习惯",
  description: "先有一个习惯",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-start p-4">
          <SessionProvider session={session}>
            <header className="flex justify-between items-center w-full mb-6">
              <Link href="/">
                <h1 className="text-4xl">微习惯</h1>
              </Link>
              <Auth />
            </header>
            <Nav />
            <ToasterProvider />
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
