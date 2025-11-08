import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center">
        <h1 className="mb-8 text-6xl font-bold tracking-tight">
          Welcome to <span className="text-primary-600">M_ART</span>
        </h1>

        <p className="mb-12 text-xl text-gray-600">
          A beautiful space to showcase your art and creative work
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/gallery"
            className="rounded-lg bg-primary-600 px-6 py-3 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            View Gallery
          </Link>
          <Link
            href="/about"
            className="rounded-lg border-2 border-primary-600 px-6 py-3 text-primary-600 font-medium hover:bg-primary-50 transition-colors"
          >
            About
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
}
