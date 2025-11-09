import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Molly Anne Damhof - Ceramic Artist | M_ART Ceramics',
  description: 'Award-winning ceramic artist Molly Anne Damhof creates handcrafted pottery featuring signature galaxy glazes. Available for commissions. Legacy Award winner, Paramount Art Show 3rd place, State Fair Superior rating.',
  keywords: ['ceramic artist', 'pottery', 'handcrafted ceramics', 'molly anne damhof', 'galaxy glaze', 'ceramic art', 'pottery commissions', 'iowa artist', 'award winning ceramics'],
  authors: [{ name: 'Molly Anne Damhof' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Molly Anne Damhof - Ceramic Artist | M_ART Ceramics',
    description: 'Award-winning ceramic artist creating handcrafted pottery with signature galaxy glazes. Available for commissions.',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721762/m-art/portfolio-journey/5.png',
        width: 1200,
        height: 630,
        alt: 'Molly Anne Damhof Ceramic Art - Galaxy Glaze Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Molly Anne Damhof - Ceramic Artist',
    description: 'Award-winning ceramic artist creating handcrafted pottery with signature galaxy glazes.',
    images: ['https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721762/m-art/portfolio-journey/5.png'],
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
