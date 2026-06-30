import { motion } from 'framer-motion';

const companies = [
  'Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Atlassian', 'Shopify', 'Datadog',
];

export function LogoBar() {
  return (
    <div className="py-12 border-y border-border-subtle bg-bg-surface relative overflow-hidden" aria-label="Companies where engineers work after Beam">
      <p className="text-center text-xs text-text-muted uppercase tracking-widest mb-8 font-medium">
        Engineers from Beam now ship at
      </p>
      <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-4 max-w-5xl mx-auto px-4">
        {companies.map((company, i) => (
          <motion.span
            key={company}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i + 0.2 }}
            className="font-display font-semibold text-text-muted/50 text-lg tracking-tight hover:text-text-muted/80 transition-colors cursor-default select-none"
          >
            {company}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
