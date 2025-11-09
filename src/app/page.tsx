// Landing Page - Last updated: 2025-11-08
import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/landing/Hero';
import FeaturedGallery from '@/components/landing/FeaturedGallery';
import About from '@/components/landing/About';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <FeaturedGallery />
        <About />
      </main>
    </>
  );
}
