import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Eye, BookOpen, Cpu, GitFork, Code2 } from 'lucide-react';
import TiltCard from './TiltCard';
import { usePortfolioData } from '../DataContext';
import ProjectModal from './ProjectModal';

const iconMap = {
  'SimplifiED': BookOpen,
  'EngiTrack': Cpu,
  'Codebase Q&A Engine': GitFork,
};

function ProjectCard({ project, index, onClick }) {
  const Icon = iconMap[project.title] || Code2;
  return (
    <TiltCard className="h-full cursor-pointer" onClick={() => onClick(project)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="glass rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all duration-300 overflow-hidden group"
        style={{ '--accent': project.colorHex }}
      >
        <div className="h-0.5 w-full" style={{ background: `${project.colorHex}20` }}>
          <motion.div className="h-full rounded-full" style={{ background: project.colorHex }}
            initial={{ width: '0%' }} whileInView={{ width: '30%' }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }} />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${project.colorHex}15`, border: `1px solid ${project.colorHex}30` }}>
                <Icon size={20} style={{ color: project.colorHex }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                <p className="text-sm font-medium" style={{ color: project.colorHex }}>{project.tagline}</p>
              </div>
            </div>
            {(project.links?.live || project.links?.github) && (
              <a href={project.links.live || project.links.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${project.colorHex}15`, color: project.colorHex }}>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack?.map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md border" style={{ background: `${project.colorHex}10`, color: `${project.colorHex}cc`, borderColor: `${project.colorHex}25` }}>{tech}</span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
            <div className="flex gap-4">
              {project.stats && Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <span className="text-lg font-bold" style={{ color: project.colorHex }}>{value}</span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 capitalize">{key}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(project); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all group/btn" 
              style={{ background: `${project.colorHex}10`, border: `1px solid ${project.colorHex}25`, color: project.colorHex }}
            >
              <Eye size={14} /> View Details
            </button>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export default function ProjectLab() {
  const { data, loading } = usePortfolioData();
  const projects = data?.projects || [];
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading || projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--secondary)' }}>&lt;the_lab /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-2 max-w-lg">Production-grade applications built with modern architectures and cutting-edge tech.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project._id || project.title} project={project} index={i} onClick={setSelectedProject} />
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
