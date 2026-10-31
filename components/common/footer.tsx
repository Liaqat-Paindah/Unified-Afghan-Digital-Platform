import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-white dark:bg-[#050816]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* CTA */}
        <div className="mb-14 overflow-hidden rounded-sm border bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Search across Afghanistan in one place.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-400">
                Explore the platform preview and see the sources planned for integration.
              </p>
            </div>

            <Link
              href="/#results"
              className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:shadow-blue-500/30"
            >
              Start searching
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 text-lg font-bold text-white">
                U
              </div>

              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Unified Afghan Digital Platform
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
              One central place to discover opportunities, services, products
              and information from across Afghanistan.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="size-4 text-cyan-500" />
                <span>support@example.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="size-4 text-cyan-500" />
                <span>+93 XXX XXX XXX</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="size-4 text-cyan-500" />
                <span>Afghanistan</span>
              </div>
            </div>

        
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Platform
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Search
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Company
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Legal
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/security"
                  className="text-sm text-gray-600 transition hover:text-cyan-500 dark:text-gray-400"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Unified Afghan Digital Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-slate-400" />
              External sources not connected
            </span>

            <span>Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}