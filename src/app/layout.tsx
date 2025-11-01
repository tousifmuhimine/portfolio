import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Al Muhimine (Tousif) | AI Developer & Full-Stack Engineer",
  description: "AI Developer and Full-Stack Engineer specializing in Machine Learning, Deep Learning, LLMs, Python, Node.js, and React.",
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