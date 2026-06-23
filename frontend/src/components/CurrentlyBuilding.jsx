import { motion } from 'framer-motion';
import { Rocket, Clock, Radio } from 'lucide-react';
import { usePortfolioData } from '../DataContext';

export default function CurrentlyBuilding() {
  const { data, loading } = usePortfolioData();
  const currentProjects = data?.currentlyBuilding || [];

  if (loading || currentProjects.length === 0) return null;

  return (
    <section id="now" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <Radio size={12} className="text-red-500 animate-pulse" />
            &lt;building_now /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Currently <span className="text-gradient">Building</span></h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-2">What I'm actively working on right now. Always shipping.</p>
        </motion.div>

        <div className="space-y-4">
          {currentProjects.map((project, i) => (
            <motion.div key={project._id || project.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} whileHover={{ x: 6, transition: { duration: 0.2 } }} className="glass rounded-xl p-5 md:p-6 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md" style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}25` }}>
                      {project.status === 'In Progress' && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" style={{ background: project.color }} />}
                      {project.status}
                    </span>
                    <span className="text-[11px] text-zinc-600 font-mono flex items-center gap-1"><Clock size={10} /> {project.started}</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{project.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(39,39,42,0.8)" strokeWidth="3" />
                      <motion.circle cx="32" cy="32" r="28" fill="none" stroke={project.color} strokeWidth="3" strokeLinecap="round" strokeDasharray={2 * Math.PI * 28} initial={{ strokeDashoffset: 2 * Math.PI * 28 }} whileInView={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - project.progress / 100) }} viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2 }} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: project.color }}>{project.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40">
                {project.techStack?.map((tech) => (<span key={tech} className="px-2 py-0.5 text-[11px] text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 bg-zinc-50/40 dark:bg-zinc-900/40 rounded border border-zinc-200/40 dark:border-zinc-800/40">{tech}</span>))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
