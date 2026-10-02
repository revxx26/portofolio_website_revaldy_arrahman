import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revaldy Arrahman — Data Analytics & Engineering",
  description: "Information Systems student focused on data analytics and engineering. Explore Revaldy Arrahman's real projects, data operations experience, and toolkit.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
