import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';

export const metadata = {
  title: 'About Molly Anne Damhof - M_ART Ceramics',
  description: 'Follow Molly Anne\'s artistic journey from sophomore year to senior year, exploring her progression in ceramic arts and achievements.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-clay-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721759/m-art/portfolio-journey/1.png"
          alt="Molly Anne Damhof Portfolio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 animate-fade-in">
              My Artistic Journey
            </h1>
            <p className="text-xl md:text-2xl text-clay-100 animate-fade-in-slow">
              Three Years of Growth, Passion, and Ceramic Art
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block">
            <p className="text-sm uppercase tracking-widest text-glaze-sage mb-4 font-medium">
              The Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-clay-900 mb-6">
              From Beginner to Award-Winning Artist
            </h2>
            <div className="h-1 w-24 bg-glaze-sage mx-auto mb-6"></div>
          </div>
          <p className="text-lg text-clay-700 leading-relaxed">
            I have been doing ceramics my whole life, but these past three years I've taken ceramics in a more serious manner.
            Here's how my journey unfolded through high school.
          </p>
        </div>

        {/* Timeline: Sophomore Year (2023-2024) */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="sticky top-24">
                <span className="text-sm uppercase tracking-widest text-glaze-sage font-medium">
                  2023-2024
                </span>
                <h3 className="text-4xl md:text-5xl font-serif text-clay-900 mt-2 mb-6">
                  Sophomore Year
                </h3>
                <h4 className="text-2xl font-medium text-clay-800 mb-4">
                  Learning the Basics
                </h4>
                <p className="text-lg text-clay-700 leading-relaxed mb-6">
                  I stayed after school almost every day of the week for hours just going away on the potter's wheel.
                  I learned all about the basics this year—wheel throwing techniques, centering clay, pulling walls,
                  and creating functional forms. Every moment at the wheel was an opportunity to improve and develop
                  muscle memory for this ancient craft.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 bg-clay-100 text-clay-700 rounded-full text-sm font-medium">
                    Wheel Throwing
                  </span>
                  <span className="px-4 py-2 bg-clay-100 text-clay-700 rounded-full text-sm font-medium">
                    Basic Forms
                  </span>
                  <span className="px-4 py-2 bg-clay-100 text-clay-700 rounded-full text-sm font-medium">
                    Hand Building
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721760/m-art/portfolio-journey/2.png"
                  alt="Sophomore Year - Learning the Basics"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline: Junior Year (2024-2025) */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721761/m-art/portfolio-journey/3.png"
                  alt="Junior Year - Advanced Techniques"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-2">
              <div className="sticky top-24">
                <span className="text-sm uppercase tracking-widest text-glaze-sage font-medium">
                  2024-2025
                </span>
                <h3 className="text-4xl md:text-5xl font-serif text-clay-900 mt-2 mb-6">
                  Junior Year
                </h3>
                <h4 className="text-2xl font-medium text-clay-800 mb-4">
                  Mastering Glazes & Earning Recognition
                </h4>
                <p className="text-lg text-clay-700 leading-relaxed mb-6">
                  Junior year I worked on making larger forms, detailed forms, and I learned all about glazes.
                  This was a transformative year where I discovered the magic of glaze chemistry and how different
                  combinations can create stunning visual effects. I was even accepted into a couple art exhibits
                  and shows, marking my first recognition in the ceramic arts community.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 bg-glaze-sage/20 text-clay-700 rounded-full text-sm font-medium">
                    Advanced Glazing
                  </span>
                  <span className="px-4 py-2 bg-glaze-sage/20 text-clay-700 rounded-full text-sm font-medium">
                    Larger Forms
                  </span>
                  <span className="px-4 py-2 bg-glaze-sage/20 text-clay-700 rounded-full text-sm font-medium">
                    Art Exhibits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline: Senior Year (2025-2026) */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="sticky top-24">
                <span className="text-sm uppercase tracking-widest text-glaze-sage font-medium">
                  2025-2026
                </span>
                <h3 className="text-4xl md:text-5xl font-serif text-clay-900 mt-2 mb-6">
                  Senior Year
                </h3>
                <h4 className="text-2xl font-medium text-clay-800 mb-4">
                  Signature Style & Galaxy Glazes
                </h4>
                <p className="text-lg text-clay-700 leading-relaxed mb-6">
                  This year represents the culmination of my journey—creating my signature galaxy glaze collection.
                  These pieces showcase the mastery I've developed over three years, combining technical skill with
                  artistic vision. The galaxy glazes create mesmerizing cosmic effects that make each piece truly
                  unique and showcase my personal artistic identity.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-200 to-blue-200 text-clay-700 rounded-full text-sm font-medium">
                    Galaxy Glazes
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-200 to-blue-200 text-clay-700 rounded-full text-sm font-medium">
                    Signature Style
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-200 to-blue-200 text-clay-700 rounded-full text-sm font-medium">
                    Portfolio Work
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721762/m-art/portfolio-journey/5.png"
                  alt="Senior Year - Galaxy Glaze Collection"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-24 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block">
              <p className="text-sm uppercase tracking-widest text-glaze-sage mb-4 font-medium">
                Recognition & Awards
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-clay-900 mb-6">
                Achievements
              </h2>
              <div className="h-1 w-24 bg-glaze-sage mx-auto mb-6"></div>
            </div>
            <p className="text-lg text-clay-700 leading-relaxed max-w-2xl mx-auto">
              My work has been recognized through various competitions and exhibitions,
              celebrating both technical skill and artistic vision.
            </p>
          </div>

          {/* Achievement Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Legacy Award */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721761/m-art/portfolio-journey/4.png"
                  alt="Legacy Award - Planter with Flowers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-glaze-sage" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-2xl font-serif text-clay-900">
                    Legacy Award
                  </h3>
                </div>
                <p className="text-clay-700 leading-relaxed">
                  Recognized for outstanding contribution to the ceramics program and artistic excellence.
                  Featured piece: handcrafted planter with intricate detail work.
                </p>
              </div>
            </div>

            {/* Paramount Art Show */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721761/m-art/portfolio-journey/4.png"
                  alt="Paramount Art Show - 3rd Place"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-2xl font-serif text-clay-900">
                    Paramount Art Show
                  </h3>
                </div>
                <div className="mb-3">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    3rd Place
                  </span>
                </div>
                <p className="text-clay-700 leading-relaxed">
                  Awarded third place at the Paramount Art Show for exceptional ceramic artistry and creative expression.
                </p>
              </div>
            </div>

            {/* State Fair Superior */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src="https://res.cloudinary.com/dfrzq3gvh/image/upload/v1762721761/m-art/portfolio-journey/4.png"
                  alt="State Fair - Superior Rating"
                  fill
                  className="object-cover object-right"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-2xl font-serif text-clay-900">
                    Art State Fair
                  </h3>
                </div>
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Superior - 10/10
                  </span>
                </div>
                <p className="text-clay-700 leading-relaxed">
                  Achieved a perfect Superior rating (10/10) at the Art State Fair. Featured piece: bowl with delicate pink flowers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-serif text-clay-900 mb-4">
              Interested in My Work?
            </h3>
            <p className="text-lg text-clay-700 mb-8">
              I'm available for commissions and love creating custom pieces. Each work is handcrafted with
              the same dedication and passion that has defined my journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gallery"
                className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-center font-medium"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="inline-block border-2 border-clay-500 text-clay-700 hover:bg-clay-50 px-8 py-4 rounded-full transition-all duration-300 text-center font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
