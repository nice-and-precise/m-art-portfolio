// Featured Gallery - Last updated: 2025-11-08
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PotteryPiece } from '@/types/pottery';

export default function FeaturedGallery() {
  const [pieces, setPieces] = useState<PotteryPiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pieces?featured=true')
      .then(res => res.json())
      .then(data => {
        setPieces(data.slice(0, 6)); // Max 6 featured pieces
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-clay-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-12 text-clay-900">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-clay-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (pieces.length === 0) {
    return (
      <section className="py-20 bg-clay-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-6 text-clay-900">Featured Work</h2>
          <p className="text-clay-600">No featured pieces yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-clay-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-sm uppercase tracking-widest text-glaze-sage mb-4 font-medium">
              Selected Work
            </p>
            <h2 className="text-5xl md:text-6xl font-serif text-clay-900 mb-6">
              Featured Pieces
            </h2>
            <div className="h-1 w-24 bg-glaze-sage mx-auto"></div>
          </div>
        </div>

        {/* Gallery Grid with varied sizes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {pieces.map((piece, index) => {
            // Create varied grid layouts
            const isLarge = index === 0 || index === 4;
            const gridClass = isLarge ? 'col-span-2 row-span-2' : 'col-span-1';

            return (
              <Link
                key={piece.id}
                href="/gallery"
                className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 animate-fade-in ${gridClass}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  aspectRatio: isLarge ? '1/1' : '3/4'
                }}
              >
                <Image
                  src={piece.images[0]?.url || '/placeholder.jpg'}
                  alt={piece.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg md:text-2xl font-serif mb-1">{piece.title}</h3>
                    <p className="text-xs md:text-sm text-glaze-matte uppercase tracking-wide">{piece.collection}</p>
                  </div>
                </div>

                {/* Subtle border accent */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-glaze-sage/30 transition-colors duration-300 rounded-lg"></div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/gallery"
            className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-medium text-lg"
          >
            Explore Full Collection
          </Link>
          <p className="mt-4 text-clay-600">Discover more handcrafted ceramics</p>
        </div>
      </div>
    </section>
  );
}
