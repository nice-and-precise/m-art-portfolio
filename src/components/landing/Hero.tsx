// Hero Component with Parallax - Last updated: 2025-11-09
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

  // Canva portfolio slides from Cloudinary
  const heroBackground = 'https://res.cloudinary.com/dfrzq3gvh/image/upload/w_1920,q_85,f_auto,c_fill/v1762721759/m-art/portfolio-journey/1.png';
  const galaxySlide = 'https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721762/m-art/portfolio-journey/5.png';

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-clay-900">
      {/* Parallax Background - Canva Portfolio Cover */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src={heroBackground}
          alt="Molly Anne Damhof Ceramics Portfolio"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Floating pottery elements - Galaxy Glaze Collection */}
      <div
        className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 opacity-30 hidden md:block"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src={`https://res.cloudinary.com/dfrzq3gvh/image/upload/c_crop,w_800,h_800,g_north_west/w_400,q_80,f_auto/${galaxySlide.split('/upload/')[1]}`}
          alt="Ceramic pottery detail"
          fill
          className="object-contain filter drop-shadow-2xl"
        />
      </div>

      <div
        className="absolute bottom-32 right-16 w-40 h-40 md:w-56 md:h-56 opacity-30 hidden md:block"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <Image
          src={`https://res.cloudinary.com/dfrzq3gvh/image/upload/c_crop,w_800,h_800,g_south_east/w_400,q_80,f_auto/${galaxySlide.split('/upload/')[1]}`}
          alt="Galaxy glaze pottery detail"
          fill
          className="object-contain filter drop-shadow-2xl"
        />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 text-center text-white px-4"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="text-6xl md:text-8xl font-serif mb-4 animate-fade-in">
          Molly Anne Damhof
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-clay-100 animate-fade-in-slow">
          Ceramic Artist | Handcrafted Pottery
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/gallery"
            className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 animate-fade-in-slow shadow-lg"
          >
            View Gallery
          </Link>
          <Link
            href="/about"
            className="inline-block border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 animate-fade-in-slow"
          >
            My Journey
          </Link>
        </div>
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
