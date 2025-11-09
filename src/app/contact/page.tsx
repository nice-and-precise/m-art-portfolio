import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact - M_ART Ceramics',
  description: 'Get in touch about commissions, purchases, or general inquiries',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-clay-50">
      <header className="border-b border-clay-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-clay-600 hover:text-clay-700 transition-colors">
            M_ART
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header Section */}
        <div className="mb-12 animate-fade-in">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-clay-800">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Interested in commissioning a piece, purchasing existing work, or collaborating?
            I'd love to hear from you. Fill out the form below and I'll respond within 24-48 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 animate-slide-up">
          <ContactForm />
        </div>

        {/* Additional Contact Info */}
        <div className="text-center space-y-4 animate-fade-in">
          <p className="text-gray-600">
            Prefer email? Reach out directly at{' '}
            <a
              href="mailto:hello@mart-ceramics.com"
              className="text-glaze-sage hover:underline font-medium"
            >
              hello@mart-ceramics.com
            </a>
          </p>

          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center text-clay-600 hover:text-clay-800 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
