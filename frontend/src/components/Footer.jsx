import { Cat, Link2, Mail, Globe, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../DataContext';

const iconMap = {
  'github': Cat,
  'linkedin': Link2,
  'twitter': Link2,
  'email': Mail,
  'default': Globe,
};

export default function Footer() {
  const { data, loading } = usePortfolioData();
  
  if (loading) return null;

  const footer = data?.footer || {};
  const socials = footer.socials || [];

  return (
    <footer className="relative py-12 px-6 border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500"
        >
          <span>Built with</span>
          <span className="font-mono" style={{ color: 'var(--accent)' }}>React</span>
          <span>&</span>
          <Coffee size={14} className="text-amber-500" />
          <span className="mx-2 text-zinc-700">|</span>
          <span>© {new Date().getFullYear()}</span>
        </motion.div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label }) => {
            const Icon = iconMap[label?.toLowerCase()] || iconMap.default;
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 transition-all hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
