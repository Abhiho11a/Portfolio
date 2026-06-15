import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cat, ArrowRight, Layout, Code2, Server } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-strong rounded-3xl border flex flex-col overflow-hidden shadow-2xl"
          style={{ borderColor: `${project.colorHex}40` }}
        >
          {/* Header Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 opacity-20 pointer-events-none" 
               style={{ background: `linear-gradient(to bottom, ${project.colorHex}, transparent)` }} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-6 sm:p-8 md:p-10">
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Header Section */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase border"
                     style={{ background: `${project.colorHex}15`, color: project.colorHex, borderColor: `${project.colorHex}30` }}>
                  Project Overview
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">
                  {project.title}
                </h2>
                <p className="text-xl font-medium" style={{ color: project.colorHex }}>
                  {project.tagline}
                </p>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                {project.links?.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105"
                     style={{ background: project.colorHex, color: '#000' }}>
                    <ExternalLink size={18} /> Visit Live Site
                  </a>
                )}
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-all hover:scale-105">
                    <Cat size={18} /> View Source Code
                  </a>
                )}
              </div>

              {/* Tech Stack */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-sm font-medium rounded-lg border bg-zinc-900/50"
                          style={{ borderColor: `${project.colorHex}30`, color: `${project.colorHex}ee` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              {project.images && project.images.length > 0 && (
                <div className="space-y-4 pt-6">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Gallery & Previews</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                      <div key={i} className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-video">
                        <img 
                          src={img.url} 
                          alt={img.caption || `${project.title} screenshot ${i+1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {img.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <p className="text-sm font-medium text-white">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture/Stats (Optional bottom section) */}
              {project.stats && Object.keys(project.stats).length > 0 && (
                <div className="pt-6 border-t border-zinc-800/50 flex flex-wrap gap-8">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key}>
                      <span className="block text-3xl font-black" style={{ color: project.colorHex }}>{value}</span>
                      <span className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">{key}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
