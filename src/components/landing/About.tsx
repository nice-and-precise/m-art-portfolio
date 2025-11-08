// About Section - Last updated: 2025-11-08
export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl font-serif mb-8 text-clay-900">About the Artist</h2>

          <div className="prose prose-lg mx-auto text-clay-700">
            <p className="text-lg leading-relaxed">
              Welcome to my ceramic art portfolio. Each piece is handcrafted with care and passion,
              exploring the intersection of form, function, and artistic expression through clay.
            </p>

            <p className="text-lg leading-relaxed mt-6">
              From functional pottery to sculptural pieces, my work reflects a deep appreciation
              for traditional techniques combined with contemporary aesthetics.
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <a
              href="/gallery"
              className="text-clay-600 hover:text-clay-800 transition-colors"
            >
              View Gallery
            </a>
            <a
              href="#contact"
              className="text-clay-600 hover:text-clay-800 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
