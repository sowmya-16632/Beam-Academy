import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data';

const avatarColors = ['bg-blue-dim text-blue-beam', 'bg-violet-dim text-violet-accent', 'bg-emerald-900/40 text-emerald-400', 'bg-amber-900/40 text-amber-400'];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-28 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(167,139,250,0.06) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-accent/30 bg-violet-dim/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-accent animate-pulse" />
            <span className="text-xs font-medium text-violet-accent tracking-wide uppercase">Engineer stories</span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-4"
          >
            What engineers say
            <br />
            <span className="beam-text">after Beam</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Real reviews from engineers who used Beam to level up, switch roles, or land their first job in tech.
          </p>
        </motion.div>

        {/* Masonry-style testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list" aria-label="Testimonials">
          {testimonials.map((testimonial, i) => (
            <motion.blockquote
              key={testimonial.name}
              role="listitem"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-7 hover:border-border-default transition-all duration-300 group hover:-translate-y-0.5"
            >
              <Quote
                className="w-7 h-7 text-violet-accent/40 mb-4 group-hover:text-violet-accent/60 transition-colors"
                aria-hidden="true"
              />
              <p className="text-text-secondary leading-relaxed text-[15px] mb-6">
                "{testimonial.quote}"
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border border-white/10 ${avatarColors[i % avatarColors.length]}`}
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <cite className="font-semibold text-text-primary text-sm not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-xs text-text-muted">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
