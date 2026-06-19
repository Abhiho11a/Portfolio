import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, FileText, Zap, MapPin, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import { usePortfolioData } from '../DataContext';

const textRevealVars = {
  hidden: { opacity: 0, y: 50, rotateX: 90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.05, duration: 0.6, type: 'spring', damping: 20 },
  }),
};

function StaggeredText({ text, className }) {
  const characters = text ? text.split('') : [];
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={textRevealVars}
          className="inline-block origin-bottom"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { data, loading } = usePortfolioData();
  const heroData = data?.hero;

  if (loading || !heroData) return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
    </section>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-24 pb-12 px-4 md:px-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto] gap-4 md:gap-6">
          
          {/* Main Hero Tile - Spans 2 columns */}
          <TiltCard className="md:col-span-2 row-span-1 glass-strong rounded-[2rem] p-6 md:p-12 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent pointer-events-none" />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50/80 dark:bg-zinc-900/80 border border-zinc-300/50 dark:border-zinc-700/50 mb-8"
            >
              <Sparkles size={14} className="text-[var(--accent)]" />
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">{heroData.tagline}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.1] tracking-tight mb-6">
              <StaggeredText text={`I'm ${heroData.name},`} className="text-zinc-900 dark:text-zinc-100 block" />
              <motion.span 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gradient block my-1"
              >
                {heroData.subtitle}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl"
            >
              {heroData.description}{' '}
              {heroData.highlights?.map((h, i) => (
                <span key={i}>
                  <span className="font-medium" style={{ color: h.color }}>{h.text}</span>
                  {i < heroData.highlights.length - 2 ? ', ' : i === heroData.highlights.length - 2 ? ', and ' : '.'}
                </span>
              ))}
            </motion.p>
          </TiltCard>

          {/* Profile Picture Tile */}
          <TiltCard className="md:col-span-1 row-span-1 glass-strong rounded-[2rem] p-4 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
            <div className="relative w-full h-full aspect-square rounded-[1.5rem] overflow-hidden border border-zinc-300/50 dark:border-zinc-700/50">
              <img 
                src="/profile.png" 
                alt={heroData.name} 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out" 
              />
            </div>
            {/* Ping Dot overlay */}
            <div className="absolute bottom-8 right-8 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent)' }} />
              <span className="relative inline-flex rounded-full h-4 w-4" style={{ background: 'var(--accent)' }} />
            </div>
          </TiltCard>

          {/* CTAs Tile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="md:col-span-1 glass rounded-[2rem] p-6 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-center gap-4 relative overflow-hidden"
          >
            <a href="#projects" className="w-full group px-6 py-4 rounded-xl flex items-center justify-between transition-all hover:translate-x-1.5" style={{ background: 'var(--accent)', color: '#09090b' }}>
              <span className="font-bold">View Projects</span>
              <Briefcase size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full group px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-x-1.5 transition-all flex items-center justify-between text-zinc-900 dark:text-zinc-100">
              <span className="font-semibold text-sm">Download Resume</span>
              <FileText size={18} className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
            </a>
          </motion.div>

          {/* Location & Status Tile */}
          <TiltCard className="md:col-span-1 glass rounded-[2rem] p-8 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
              <MapPin size={64} />
            </div>
            <h3 className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-1">Current Base</h3>
            <p className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-6">{heroData.location}</p>
            
            <div className="flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 w-max">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent)' }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: 'var(--accent)' }} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{heroData.status}</span>
            </div>
          </TiltCard>

          {/* Interactive Terminal CTA Tile */}
          <TiltCard className="md:col-span-1 glass rounded-[2rem] p-8 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col justify-between group overflow-hidden relative cursor-pointer" onClick={() => document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                <Zap size={24} style={{ color: 'var(--secondary)' }} />
              </div>
              <ArrowRight size={20} className="text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-1 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-2">Interactive Mode</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">Ask my AI agent anything in the terminal.</p>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
