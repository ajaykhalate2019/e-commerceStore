import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-gray-800">
              STORE<span className="text-orange-500">.</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Your one-stop destination for the latest in tech and fashion.
              Quality guaranteed, style redefined.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="footer-link">Shop All</Link></li>
              <li><Link href="/" className="footer-link">New Arrivals</Link></li>
              <li><Link href="/" className="footer-link">Deals</Link></li>
              <li><Link href="/" className="footer-link">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="footer-link">Contact Us</Link></li>
              <li><Link href="/" className="footer-link">Shipping & Returns</Link></li>
              <li><Link href="/" className="footer-link">FAQ</Link></li>
              <li><Link href="/" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-500">
              Subscribe for latest updates and offers.
            </p>

            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="h-10 w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Store Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;