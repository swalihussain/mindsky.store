import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/navigation/ScrollProgress";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import StoreInitializer from "@/components/providers/StoreInitializer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "MindSky Store | Playful Kids E-commerce",
  description: "Explore Smart, Fun & Safe Products for Kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} min-h-screen antialiased flex flex-col bg-[var(--background)] text-[var(--foreground)]`}>
        <SmoothScrollProvider>
          <ScrollProgress />
          <StoreInitializer />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
