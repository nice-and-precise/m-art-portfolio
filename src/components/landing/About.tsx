// About Section - Last updated: 2025-11-08
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-clay-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with accent line */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <p className="text-sm uppercase tracking-widest text-glaze-sage mb-4 font-medium">
              Handcrafted with Passion
            </p>
            <h2 className="text-5xl md:text-6xl font-serif text-clay-900 mb-6">
              About the Artist
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

          {/* Right: Specialties */}
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
        </div>
      </div>
    </section>
  );
}
