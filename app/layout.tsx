import type { Metadata } from "next";

import "./globals.css";



const title = "Revaldy Arrahman — Data Analytics & Engineering";

const description = "Information Systems student focused on data analytics and engineering. Explore Revaldy Arrahman's real projects, data operations experience, and toolkit.";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://revaldyarrahman.onrender.com");

if (!['https:', 'http:'].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password) throw new Error('Invalid NEXT_PUBLIC_SITE_URL');

siteUrl.pathname='/';siteUrl.search='';siteUrl.hash='';

export const metadata: Metadata = {

  title: "Revaldy Arrahman — Data Analytics & Engineering",

  description: "Information Systems student focused on data analytics and engineering. Explore Revaldy Arrahman's real projects, data operations experience, and toolkit.",

  metadataBase: siteUrl,

  openGraph: {type:"website",title,description,siteName:"Revaldy Arrahman",locale:"en_US",alternateLocale:["id_ID"],images:[{url:"/images/social/portfolio-preview.png",width:1200,height:630,alt:"Revaldy Arrahman — Data Analytics & Engineering"}]},

  twitter: {card:"summary_large_image",title,description,images:["/images/social/portfolio-preview.png"]},

  icons: {

    icon: [

      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },

      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },

    ],

    shortcut: "/favicon.ico",

    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },

  },

};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var saved = localStorage.getItem('portfolio-theme');
              var theme = saved === 'dark' ? 'dark' : 'light';
              document.documentElement.dataset.theme = theme;
              document.documentElement.style.colorScheme = theme;
            } catch {
              document.documentElement.dataset.theme = 'light';
              document.documentElement.style.colorScheme = 'light';
            }`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
