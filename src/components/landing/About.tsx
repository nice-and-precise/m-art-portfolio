// About Section - Last updated: 2025-11-09
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-clay-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <Image
          src="https://res.cloudinary.com/dfrzq3gvh/image/upload/w_800,q_70,f_auto/v1762721762/m-art/portfolio-journey/5.png"
          alt=""
          fill
          className="object-cover object-left"
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header with accent line */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-sm uppercase tracking-widest text-glaze-sage mb-4 font-medium">
              Handcrafted with Passion
            </p>
            <h2 className="text-5xl md:text-6xl font-serif text-clay-900 mb-6">
              About Molly Anne
            </h2>
            <div className="h-1 w-24 bg-glaze-sage mx-auto"></div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Artist Statement */}
          <div className="space-y-6 text-clay-700">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-clay-900">
              Each piece is handcrafted with care, exploring the beautiful intersection of form, function, and artistic expression.
            </p>

            <p className="text-lg leading-relaxed">
              Working with clay allows me to create both functional pottery and sculptural pieces that bring warmth and artistry into everyday life.
            </p>

            <p className="text-lg leading-relaxed">
              My work reflects a deep appreciation for traditional techniques combined with contemporary aesthetics, honoring the timeless craft of ceramics.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery"
                className="inline-block bg-clay-500 hover:bg-clay-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-center font-medium"
              >
                Explore My Work
              </Link>
              <a
                href="#contact"
                className="inline-block border-2 border-clay-500 text-clay-700 hover:bg-clay-50 px-8 py-4 rounded-full transition-all duration-300 text-center font-medium"
              >
                Commission a Piece
              </a>
            </div>
          </div>

          {/* Right: Specialties with Galaxy Glaze Feature */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
              <h3 className="text-2xl font-serif text-clay-900 mb-6">Specialties</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Functional Pottery', desc: 'Handcrafted bowls, mugs, and serving pieces' },
                  { title: 'Sculptural Art', desc: 'Unique ceramic sculptures and installations' },
                  { title: 'Custom Commissions', desc: 'Personalized pieces for your space' },
                  { title: 'Traditional Techniques', desc: 'Wheel-throwing, hand-building, glazing' }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="block w-2 h-2 bg-glaze-sage rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-medium text-clay-900">{item.title}</h4>
                      <p className="text-sm text-clay-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Galaxy Glaze Showcase */}
            <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg shadow-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-lg font-serif">Signature Galaxy Glazes</h4>
              </div>
              <p className="text-sm text-gray-200 mb-4">
                Discover my award-winning galaxy glaze collection featuring mesmerizing cosmic effects
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-medium text-yellow-300 hover:text-yellow-200 transition-colors"
              >
                View My Journey
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
