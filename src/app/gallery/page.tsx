// Gallery Page - Last updated: 2025-11-08
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { PotteryPiece, Collection } from '@/types/pottery';
import { COLLECTIONS } from '@/types/pottery';

export default function GalleryPage() {
  const [pieces, setPieces] = useState<PotteryPiece[]>([]);
  const [filteredPieces, setFilteredPieces] = useState<PotteryPiece[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | 'All'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/pieces')
      .then(res => res.json())
      .then(data => {
        setPieces(data);
        setFilteredPieces(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const baseFiltered = selectedCollection === 'All'
      ? pieces
      : pieces.filter(p => p.collection === selectedCollection);

    const sorted = [...baseFiltered];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredPieces(sorted);
  }, [selectedCollection, sortBy, pieces]);

  if (loading) {
    return (
      <div className="min-h-screen bg-clay-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-serif text-center mb-12 text-clay-900">Gallery</h1>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="mb-6 aspect-square bg-clay-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clay-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-serif text-center mb-12 text-clay-900">Gallery</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center">
          <select
            value={selectedCollection}
            onChange={e => setSelectedCollection(e.target.value as Collection | 'All')}
            className="px-4 py-2 border border-clay-300 rounded-lg bg-white text-clay-900 focus:outline-none focus:ring-2 focus:ring-clay-500"
          >
            <option value="All">All Collections</option>
            {COLLECTIONS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'title')}
            className="px-4 py-2 border border-clay-300 rounded-lg bg-white text-clay-900 focus:outline-none focus:ring-2 focus:ring-clay-500"
          >
            <option value="date">Newest First</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>

        {/* Masonry Grid */}
        {filteredPieces.length === 0 ? (
          <p className="text-center text-clay-600">No pieces found.</p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {filteredPieces.map((piece, index) => (
              <div
                key={piece.id}
                className="mb-6 break-inside-avoid animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => setLightboxImage(piece.images[0]?.url)}
                >
                  <Image
                    src={piece.images[0]?.url || '/placeholder.jpg'}
                    alt={piece.title}
                    width={piece.images[0]?.width || 800}
                    height={piece.images[0]?.height || 800}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-serif mb-1">{piece.title}</h3>
                      <p className="text-sm text-clay-100">{piece.collection}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-clay-300 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt="Full size"
              width={1200}
              height={1200}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
