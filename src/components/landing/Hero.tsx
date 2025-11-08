// Hero Component - Last updated: 2025-11-08
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-clay-700 to-clay-900">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-4 animate-fade-in-slow">
        <h1 className="text-6xl md:text-8xl font-serif mb-4">
          {process.env.NEXT_PUBLIC_ARTIST_NAME || 'M_ART'}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-clay-100">
          Ceramic Artist | Handcrafted Pottery
        </p>

        <Link
          href="/gallery"
          className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
        >
          View Gallery
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
