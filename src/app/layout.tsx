import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'M_ART - Art Portfolio & Gallery',
  description: 'Showcasing beautiful artwork and creative expressions',
  keywords: ['art', 'portfolio', 'gallery', 'artist', 'artwork'],
  authors: [{ name: 'M_ART' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'M_ART - Art Portfolio & Gallery',
    description: 'Showcasing beautiful artwork and creative expressions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
