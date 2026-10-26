import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '../components/SmoothScroll';
import GrainOverlay from '../components/GrainOverlay';
import ScrollProgress from '../components/ScrollProgress';
import ThreeCanvas from '../components/ThreeCanvas';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tousifmuhimine.vercel.app'),
  title: 'Abdullah Al Muhaimine (Tousif) | AI Full-Stack Portfolio',
  description:
    'Portfolio of Abdullah Al Muhaimine (Tousif): AI Developer & Full-Stack Engineer. Fine-tuning LLMs, multi-agent reasoning, vector retrieval, and production systems.',
  verification: {
    google: 'nFr7EuQG7ZnzyvVPFbTzEoT7j5IIO5c7lZt0dVciL2s',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#07080a] text-[#ecebe6] antialiased selection:bg-[#3df5ff]/30 selection:text-white font-sans">
        <SmoothScroll>
          <GrainOverlay />
          <ScrollProgress />
          <ThreeCanvas />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
