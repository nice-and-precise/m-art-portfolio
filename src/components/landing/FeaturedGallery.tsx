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
    <section className="py-20 bg-clay-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12 text-clay-900">Featured Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((piece, index) => (
            <Link
              key={piece.id}
              href="/gallery"
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={piece.images[0]?.url || '/placeholder.jpg'}
                alt={piece.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-serif mb-1">{piece.title}</h3>
                  <p className="text-sm text-clay-100">{piece.collection}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-8 py-3 rounded-full transition-all duration-300"
          >
            View All Work
          </Link>
        </div>
      </div>
    </section>
  );
}
