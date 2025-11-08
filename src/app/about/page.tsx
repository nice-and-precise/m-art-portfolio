import Link from 'next/link';

export const metadata = {
  title: 'About - M_ART',
  description: 'Learn more about the artist',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            M_ART
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">About</h1>

        <div className="prose prose-lg">
          <p className="text-gray-600">
            This is your About page. Share your story, background, artistic vision, and what inspires your work.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Artist Statement</h2>
          <p className="text-gray-600">
            Add your artist statement here. Describe your creative process, themes you explore, and what you hope viewers take away from your work.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Background</h2>
          <p className="text-gray-600">
            Share your background, education, exhibitions, and artistic journey.
          </p>

          <h2 className="mt-8 text-2xl font-bold">Contact</h2>
          <p className="text-gray-600">
            Interested in commissioning work or have questions? <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">Get in touch</Link>.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
