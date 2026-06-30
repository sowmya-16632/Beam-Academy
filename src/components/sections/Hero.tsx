import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import { stats } from '../../data';

function fadeUpVariant(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: 'easeOut' as const } },
  };
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-beam-radial pointer-events-none" aria-hidden="true" />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,142,247,0.08) 0%, rgba(167,139,250,0.05) 50%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* The beam line — signature element */}
      <div className="absolute top-[42%] left-0 right-0 h-px pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(79,142,247,0.6) 20%, rgba(167,139,250,0.8) 50%, rgba(79,142,247,0.6) 80%, transparent 100%)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social proof pill */}
        <motion.div
          {...fadeUpVariant(0)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-beam/30 bg-blue-dim/20 mb-8"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-blue-beam fill-blue-beam" />
            ))}
          </div>
          <span className="text-xs text-text-secondary">
            Trusted by <strong className="text-text-primary font-semibold">180,000+</strong> engineers worldwide
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUpVariant(0.1)}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-text-primary block">Engineering skills</span>
          <span className="beam-text block">that actually stick.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUpVariant(0.2)}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Beam Academy adapts to how you learn — not how a syllabus was written. Build real projects, get reviewed by engineers who ship, and land the role you actually want.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUpVariant(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#paths"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-beam text-white font-medium text-sm hover:bg-blue-beam/90 active:scale-95 transition-all glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            Start learning free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-border-default text-text-secondary hover:text-text-primary hover:border-border-subtle hover:bg-bg-surface transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-beam"
          >
            <div className="w-6 h-6 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center">
              <Play className="w-3 h-3 text-blue-beam fill-blue-beam ml-0.5" />
            </div>
            Watch 2-min demo
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUpVariant(0.4)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle rounded-2xl overflow-hidden border border-border-subtle"
          role="list"
          aria-label="Platform statistics"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              className="bg-bg-surface px-6 py-5 text-center hover:bg-bg-elevated transition-colors"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-border-default flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-blue-beam rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
