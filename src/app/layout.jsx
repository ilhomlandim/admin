import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import UniversalDrawer from "@/components/UniversalDrawer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin panel",
  description: "chizlab.uz asoschilari uchun",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="UZ">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Header />
        <main>{children}</main>
        <Toaster position="top-right" visibleToasts={1} closeButton />
        <UniversalDrawer />
      </body>
    </html>
  );
}
