import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: { default: "bobi.", template: "%s · bobi." },
  description: "O jeito divertido de aprender impressão 3D.",
  applicationName: "bobi.",
  appleWebApp: { capable: true, title: "bobi.", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#FD7301",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
