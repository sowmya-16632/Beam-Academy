import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { features } from '../../data';

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
      ref={ref}
      className="py-28 relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(79,142,247,0.4), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-accent/30 bg-violet-dim/20 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-accent animate-pulse" />
            <span className="text-xs font-medium text-violet-accent tracking-wide uppercase">Platform features</span>
          </div>
          <h2
            id="features-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mb-4"
          >
            Learning built around{' '}
            <span className="beam-text">how engineers think</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every feature was designed to close the gap between knowing something and being able to use it under pressure.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="Platform features"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isBlue = feature.accent === 'blue';

            return (
              <motion.article
                key={feature.title}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                className="group relative glass-card rounded-2xl p-6 hover:border-border-default transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isBlue ? 'bg-blue-beam/5' : 'bg-violet-accent/5'
                  }`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${
                      isBlue
                        ? 'bg-blue-dim/40 border-blue-beam/20 text-blue-beam'
                        : 'bg-violet-dim/40 border-violet-accent/20 text-violet-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`inline-block text-[11px] font-semibold uppercase tracking-widest mb-2 ${
                      isBlue ? 'text-blue-beam/70' : 'text-violet-accent/70'
                    }`}
                  >
                    {feature.tag}
                  </span>

                  <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
