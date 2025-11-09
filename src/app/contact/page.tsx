import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import Navigation from '@/components/ui/Navigation';

export const metadata = {
  title: 'Contact Molly Anne Damhof - M_ART Ceramics',
  description: 'Get in touch with ceramic artist Molly Anne Damhof about commissions, purchases, or general inquiries. Email: mollydamhof@gmail.com | Phone: 515-230-2118',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-clay-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header Section */}
        <div className="mb-12 animate-fade-in">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-clay-800">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Interested in commissioning a piece, purchasing existing work, or collaborating?
            I'd love to hear from you. Fill out the form below and I'll respond within 24-48 hours.
          </p>
          <div className="bg-glaze-sage/10 border-l-4 border-glaze-sage p-4 rounded">
            <p className="text-clay-700 leading-relaxed">
              <strong>About Commissions:</strong> I am more than excited to be able to reach out to people like you!
              Please understand it won't happen overnight, and may take at least a month to receive any commissions. Thanks!
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12 animate-slide-up">
          <ContactForm />
        </div>

        {/* Additional Contact Info */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-serif text-clay-900 mb-4">Direct Contact</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:mollydamhof@gmail.com"
                  className="text-glaze-sage hover:underline font-medium"
                >
                  mollydamhof@gmail.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:515-230-2118"
                  className="text-glaze-sage hover:underline font-medium"
                >
                  515-230-2118
                </a>
              </p>
              <p className="text-sm text-gray-500 pt-2">
                Artist: Molly Anne Damhof
              </p>
            </div>
          </div>

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
