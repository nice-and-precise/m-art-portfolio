import Link from 'next/link';

export const metadata = {
  title: 'Gallery - M_ART',
  description: 'Browse the art gallery collection',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            M_ART
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold">Gallery</h1>

        <div className="mb-8 text-gray-600">
          <p>Your art gallery will be displayed here.</p>
          <p className="mt-2">Add your artwork images to the <code className="px-2 py-1 bg-gray-100 rounded">public/images/gallery/</code> directory to get started.</p>
        </div>

        {/* Placeholder grid - will be replaced with actual gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <span className="text-gray-400">Artwork {item}</span>
            </div>
          ))}
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
