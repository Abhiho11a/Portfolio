import { motion } from 'framer-motion';
import { GraduationCap, School, BookOpen, Award, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { usePortfolioData } from '../DataContext';

const ICONS = [GraduationCap, School, BookOpen, Award];

function EducationCard({ item, index, isLast }) {
  const Icon = ICONS[index % ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b" style={{ backgroundImage: `linear-gradient(${item.color}40, transparent)` }} />
      )}

      <div className="flex gap-4">
        {/* Timeline dot */}
        <div className="flex-shrink-0 mt-1">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center relative"
            style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
          >
            <Icon size={20} style={{ color: item.color }} />
            {item.current && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse-glow" style={{ background: 'var(--accent)' }} />
            )}
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="flex-1 glass rounded-2xl p-5 md:p-6 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all duration-300 mb-6"
          style={{ boxShadow: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 25px ${item.color}10`}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{item.level}</h3>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={13} className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.institution}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium" style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}20` }}>
                <Calendar size={12} />
                {item.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50">
              <TrendingUp size={14} style={{ color: item.color }} />
              <span style={{ color: item.color }}>{item.score}</span>
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 font-mono">{item.board}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.highlights?.map((h) => (
              <span key={h} className="px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50/40 dark:bg-zinc-900/40 rounded-md border border-zinc-200/40 dark:border-zinc-800/40">
                {h}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const { data, loading } = usePortfolioData();
  const education = data?.education || [];

  if (loading || education.length === 0) return null;

  return (
    <section id="education" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--secondary)' }}>
            &lt;education /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Academic <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-2 max-w-lg">
            Building a strong foundation in computer science and engineering.
          </p>
        </motion.div>

        <div className="relative">
          {education.map((item, index) => (
            <EducationCard key={item._id || item.level} item={item} index={index} isLast={index === education.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
