import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Al Muhimine (Tousif) | AI Full-Stack Portfolio",
  description:
    "Portfolio of Abdullah Al Muhimine (Tousif): AI full-stack allrounder, AI engineer, full-stack/backend engineer, and ML/DL researcher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
