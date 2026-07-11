import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Asciify | Elevate your GitHub README",
  description: "Generate beautiful animated ASCII art cards for your GitHub README.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "antialiased", "bg-[#050505]", "text-amber-500", "h-full", inter.variable, mono.variable, "font-mono", geist.variable)}>
      <body className="min-h-full flex flex-col font-mono">{children}</body>
    </html>
  );
}
