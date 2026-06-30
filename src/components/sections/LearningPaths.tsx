import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, BookOpen, ArrowRight, Flame } from 'lucide-react';
import { learningPaths } from '../../data';

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export function LearningPaths() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="paths"
      ref={ref}
      className="py-28 bg-bg-surface relative"
      aria-labelledby="paths-heading"
    >
      {/* Top gradient border */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.3), rgba(167,139,250,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-beam/30 bg-blue-dim/20 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-beam animate-pulse" />
              <span className="text-xs font-medium text-blue-beam tracking-wide uppercase">Learning paths</span>
            </div>
            <h2
              id="paths-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight"
            >
              Pick your path.
              <br />
              <span className="beam-text">Own your trajectory.</span>
            </h2>
          </div>
          <p className="text-text-secondary text-base max-w-xs md:text-right leading-relaxed">
            Structured tracks with real projects, not toy examples. Each path ends with work you can show.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list" aria-label="Learning paths">
          {learningPaths.map((path, i) => (
            <motion.article
              key={path.id}
              role="listitem"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-border-subtle bg-bg-base hover:border-border-default transition-all duration-300 overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${path.gradient}`} aria-hidden="true" />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-xl text-text-primary">
                        {path.title}
                      </h3>
                      {path.popular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-400/20">
                          <Flame className="w-2.5 h-2.5" />
                          Popular
                        </span>
                      )}
                    </div>
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${levelColors[path.level]}`}
                    >
                      {path.level}
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {path.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-5 text-xs text-text-muted mb-5">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {path.modules} modules
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {path.hours} hrs
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6" aria-label="Skills covered">
                  {path.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle text-text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-blue-beam hover:text-blue-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam rounded"
                >
                  Explore path
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Hover effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${path.gradient}`}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-secondary hover:text-text-primary hover:border-blue-beam/40 transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam"
          >
            View all 12 paths
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
