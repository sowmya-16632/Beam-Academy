import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const perks = [
  'No credit card required',
  'Full access for 14 days',
  'Cancel any time',
];

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-blue-beam/20 bg-bg-surface"
        >
          {/* Interior glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.12) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Animated beam lines */}
          <div className="absolute top-0 inset-x-0 h-px overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.8), rgba(167,139,250,0.8), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative z-10 text-center px-8 py-16 sm:px-16 sm:py-20">
            <h2
              id="cta-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-4"
            >
              Ready to focus
              <br />
              <span className="beam-text">what you actually learn?</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
              Join engineers who stopped watching tutorials and started building real skills. Your first 14 days are on us.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-blue-beam text-white font-semibold text-sm hover:bg-blue-beam/90 active:scale-95 transition-all glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
              >
                Start free trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#paths"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-border-default hover:decoration-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam rounded"
              >
                Browse paths first
              </a>
            </div>

            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8" aria-label="Free trial benefits">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-blue-beam shrink-0" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
