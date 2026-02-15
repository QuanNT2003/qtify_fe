import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qtify - Music Streaming",
  description:
    "A premium music streaming experience built with Next.js and Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden select-none">
            <AppSidebar />
            <SidebarInset className="flex flex-col h-full overflow-hidden bg-background">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
