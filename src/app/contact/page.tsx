import Link from 'next/link';

export const metadata = {
  title: 'Contact - M_ART',
  description: 'Get in touch',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            M_ART
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold">Contact</h1>

        <p className="mb-8 text-gray-600">
          Interested in commissioning work, purchasing art, or have questions? Fill out the form below or reach out directly.
        </p>

        <div className="rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 text-center py-12">
            Contact form coming soon!
            <br />
            <br />
            For now, you can reach out via email or social media.
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
