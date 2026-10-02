import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revaldy Arrahman — Data Analytics & Engineering",
  description: "Information Systems student focused on data analytics and engineering. Explore Revaldy Arrahman's real projects, data operations experience, and toolkit.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
