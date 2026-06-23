import { motion } from 'framer-motion';
import { Award, Building2, Calendar, ExternalLink } from 'lucide-react';
import { usePortfolioData } from '../DataContext';
import TiltCard from './TiltCard';

function CertificationCard({ item, index }) {
  const color = item.color || '#10B981';

  return (
    <TiltCard className="h-full w-full max-w-[350px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass rounded-xl p-4 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all duration-300 h-full flex flex-col group"
        style={{ '--accent': color }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
              <Award size={20} style={{ color: color }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-0.5 line-clamp-2">{item.title}</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                  <Building2 size={12} />
                  {item.issuer}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium" style={{ background: `${color}12`, color: color, border: `1px solid ${color}20` }}>
            <Calendar size={10} />
            {item.date}
          </span>
        </div>

        {item.image && (
          <div className="mb-4 w-full rounded-lg overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 relative group/img h-48 bg-zinc-100/50 dark:bg-zinc-800/30 flex items-center justify-center p-2">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-white/0 dark:bg-black/0 group-hover/img:bg-white/10 dark:group-hover/img:bg-black/10 transition-colors duration-300" />
          </div>
        )}

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {item.link && (
          <div className="pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 mt-auto">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2"
              style={{ color: color }}
            >
              <ExternalLink size={14} /> View Certificate / Project
            </a>
          </div>
        )}
      </motion.div>
    </TiltCard>
  );
}

export default function Certifications() {
  const { data, loading } = usePortfolioData();
  const certifications = data?.certifications || [];

  if (loading || certifications.length === 0) return null;

  return (
    <section id="certifications" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>
            &lt;certifications /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Certifications & <span className="text-gradient">Activities</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-400 mt-2 max-w-lg">
            A showcase of my credentials, internships, and extracurricular milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((item, index) => (
            <CertificationCard key={item._id || index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
