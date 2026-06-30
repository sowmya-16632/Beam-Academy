import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useScrolled } from '../../hooks/useScrolled';
import { navLinks } from '../../data';

export function Navbar() {
  const scrolled = useScrolled(30);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/90 backdrop-blur-xl border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam rounded-lg"
              aria-label="Beam Academy home"
            >
              <div className="relative w-8 h-8 rounded-lg bg-blue-dim flex items-center justify-center border border-blue-beam/30 group-hover:border-blue-beam/60 transition-colors">
                <Zap className="w-4 h-4 text-blue-beam" fill="currentColor" />
                <div className="absolute inset-0 rounded-lg bg-blue-beam/10 group-hover:bg-blue-beam/20 transition-colors" />
              </div>
              <span className="font-display font-600 text-lg text-text-primary tracking-tight">
                Beam<span className="text-blue-beam">.</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam"
              >
                Sign in
              </a>
              <a
                href="#"
                className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-beam text-white hover:bg-blue-beam/90 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Start free
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-bg-surface/95 backdrop-blur-xl border-b border-border-subtle md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border-subtle flex flex-col gap-2">
                <a href="#" className="px-4 py-3 text-text-secondary hover:text-text-primary rounded-lg transition-colors text-center">
                  Sign in
                </a>
                <a href="#" className="px-4 py-3 bg-blue-beam text-white font-medium rounded-lg text-center hover:bg-blue-beam/90 transition-colors">
                  Start free
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
