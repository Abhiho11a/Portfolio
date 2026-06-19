import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Server, Code2, Layers, Brain, Cpu, GitFork,
  Container, Braces, Binary, Network, Workflow, Boxes,
  Gauge, Sparkles, ChevronRight, Hash
} from 'lucide-react';
import { usePortfolioData } from '../DataContext';

const iconMap = {
  'MongoDB': Database, 'Express.js': Server, 'React': Code2, 'Node.js': Layers,
  'Arrays & Strings': Braces, 'Trees & Graphs': Network, 'Dynamic Programming': Gauge, 'System Design': Cpu,
  'RAG Pipelines': Workflow, 'LLM Integration': Brain, 'Vector Databases': Boxes, 'Prompt Engineering': Sparkles,
  'Docker': Container, 'Git & GitHub': GitFork, 'Linux / CLI': Cpu, 'Cloud (AWS)': Server,
  'mern': Layers, 'dsa': Binary, 'genai': Brain, 'devops': Container
};

const getIcon = (key) => iconMap[key] || Hash;

function SkillBar({ skill, color, delay }) {
  const Icon = getIcon(skill.name);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group/skill"
    >
      <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50/40 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 hover:border-zinc-300/60 dark:hover:border-zinc-700/60 transition-all hover:bg-zinc-50/60 dark:hover:bg-zinc-900/60">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}12` }}>
          <Icon size={16} style={{ color }} className="opacity-70 group-hover/skill:opacity-100 transition-opacity" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{skill.name}</span>
            <span className="text-xs font-mono font-bold" style={{ color }}>{skill.level}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-1 block">{skill.desc}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function NeuralMap() {
  const { data, loading } = usePortfolioData();
  const skillCategories = data?.skills || [];
  
  const [activeTab, setActiveTab] = useState(skillCategories[0]?.id || 'mern');
  const activeCategory = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];

  if (loading || !activeCategory) return null;

  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>
            &lt;neural_map /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Tabs (Left sidebar) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide"
          >
            {skillCategories.map((cat) => {
              const Icon = getIcon(cat.id);
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 flex-shrink-0 group ${
                    isActive
                      ? 'glass border border-zinc-300/60 dark:border-zinc-700/60'
                      : 'border border-transparent hover:bg-zinc-50/40 dark:hover:bg-zinc-900/40 hover:border-zinc-200/40 dark:hover:border-zinc-800/40'
                  }`}
                >
                  {/* Active glow */}
                  {isActive && (
                    <motion.div
                      layoutId="skillTabGlow"
                      className="absolute inset-0 rounded-xl"
                      style={{ boxShadow: `0 0 20px ${cat.color}15, inset 0 0 20px ${cat.color}05` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div
                    className="relative z-10 w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background: isActive ? `${cat.color}18` : 'rgba(39,39,42,0.5)',
                      border: `1px solid ${isActive ? `${cat.color}30` : 'rgba(63,63,70,0.3)'}`,
                    }}
                  >
                    <Icon size={18} style={{ color: isActive ? cat.color : '#a1a1aa' }} />
                  </div>
                  <div className="relative z-10">
                    <span className={`text-sm font-semibold block transition-colors ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                      {cat.label}
                    </span>
                    <span className="text-[11px] text-zinc-600 hidden lg:block">{cat.tagline}</span>
                  </div>
                  {isActive && (
                    <ChevronRight size={14} style={{ color: cat.color }} className="relative z-10 ml-auto hidden lg:block" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Skill Details (Right panel) */}
          <div className="glass rounded-2xl p-6 md:p-8 border border-zinc-200/60 dark:border-zinc-800/60 min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: activeCategory.color, boxShadow: `0 0 10px ${activeCategory.color}60` }}
                  />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{activeCategory.label}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ color: activeCategory.color, background: `${activeCategory.color}12` }}>
                    {activeCategory.tagline}
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategory.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} color={activeCategory.color} delay={i * 0.08} />
                  ))}
                </div>

                {/* Proficiency Legend */}
                <div className="mt-6 flex items-center gap-4 text-[11px] text-zinc-600 font-mono">
                  <span className="flex items-center gap-1.5">
                    <div className="w-6 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${activeCategory.color}, ${activeCategory.color}44)` }} />
                    Proficiency
                  </span>
                  <span>90%+ Expert</span>
                  <span>80%+ Advanced</span>
                  <span>70%+ Proficient</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
