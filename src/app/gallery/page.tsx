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
    <div className="min-h-screen bg-gradient-to-b from-white via-clay-50 to-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-sm uppercase tracking-widest text-glaze-sage mb-4 font-medium">
              Complete Collection
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-clay-900 mb-6">
              Gallery
            </h1>
            <div className="h-1 w-24 bg-glaze-sage mx-auto mb-4"></div>
            <p className="text-clay-600 text-lg">
              {filteredPieces.length} piece{filteredPieces.length !== 1 ? 's' : ''} of handcrafted ceramics
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="text-sm font-medium text-clay-700 whitespace-nowrap">Filter by:</label>
              <select
                value={selectedCollection}
                onChange={e => setSelectedCollection(e.target.value as Collection | 'All')}
                className="flex-1 md:flex-none px-5 py-3 border-2 border-clay-300 rounded-xl bg-white text-clay-900 focus:outline-none focus:ring-2 focus:ring-glaze-sage focus:border-transparent transition-all"
              >
                <option value="All">All Collections</option>
                {COLLECTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="h-8 w-px bg-clay-300 hidden md:block"></div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="text-sm font-medium text-clay-700 whitespace-nowrap">Sort by:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'date' | 'title')}
                className="flex-1 md:flex-none px-5 py-3 border-2 border-clay-300 rounded-xl bg-white text-clay-900 focus:outline-none focus:ring-2 focus:ring-glaze-sage focus:border-transparent transition-all"
              >
                <option value="date">Newest First</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        {filteredPieces.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-clay-600 text-xl">No pieces found in this collection.</p>
            <button
              onClick={() => setSelectedCollection('All')}
              className="mt-6 text-clay-500 hover:text-clay-700 underline"
            >
              View all collections
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {filteredPieces.map((piece, index) => (
              <div
                key={piece.id}
                className="mb-6 break-inside-avoid animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 bg-white"
                  onClick={() => setLightboxImage(piece.images[0]?.url)}
                >
                  <Image
                    src={piece.images[0]?.url || '/placeholder.jpg'}
                    alt={piece.title}
                    width={piece.images[0]?.width || 800}
                    height={piece.images[0]?.height || 800}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-serif mb-1">{piece.title}</h3>
                      <p className="text-xs text-glaze-matte uppercase tracking-wider">{piece.collection}</p>
                      {piece.description && (
                        <p className="text-sm text-clay-100 mt-2 line-clamp-2">{piece.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Border Accent */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-glaze-sage/40 transition-colors duration-300 rounded-xl pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt="Full size"
              width={1200}
              height={1200}
              className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
