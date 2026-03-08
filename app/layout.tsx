import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickHire - Find Your Dream Job",
  description: "Great platform for job seekers that are passionate about startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
