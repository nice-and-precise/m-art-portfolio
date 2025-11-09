// Hero Component with Parallax - Last updated: 2025-11-08
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-clay-900">
      {/* Parallax Background Layers */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1920&q=80"
          alt="Pottery background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Floating pottery elements with different parallax speeds */}
      <div
        className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80"
          alt="Floating pottery"
          fill
          className="object-contain"
        />
      </div>

      <div
        className="absolute bottom-32 right-16 w-40 h-40 md:w-56 md:h-56 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <Image
          src="https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=400&q=80"
          alt="Floating vase"
          fill
          className="object-contain"
        />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 text-center text-white px-4"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="text-6xl md:text-8xl font-serif mb-4 animate-fade-in">
          {process.env.NEXT_PUBLIC_ARTIST_NAME || 'M_ART'}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-clay-100 animate-fade-in-slow">
          Ceramic Artist | Handcrafted Pottery
        </p>

        <Link
          href="/gallery"
          className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 animate-fade-in-slow shadow-lg"
        >
          View Gallery
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
