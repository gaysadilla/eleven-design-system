import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/navigation/HeaderNav";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Eleven - Design System Documentation',
  description: 'Professional design system documentation with visual editing capabilities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col bg-background">
          {/* Header Navigation */}
          <HeaderNav />
          
          {/* Client Layout with Dynamic Sidebar */}
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </div>
      </body>
    </html>
  );
} 