import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, ExternalLink, GitFork, ChevronLeft, ChevronRight,
  Calendar, Users, MapPin, Sparkles, Flame, Image,
  CalendarCheck, MessageCircle
} from 'lucide-react';
import TiltCard from './TiltCard';
import { usePortfolioData } from '../DataContext';

/* ─── COMPONENTS ─── */

function ImageGallery({ images, color }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="relative rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50">
      <div className="relative aspect-video bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}><Image size={28} style={{ color }} /></div>
            <span className="text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 text-center">{images[current].placeholder}</span>
            <span className="text-xs font-medium mt-2 px-3 py-1 rounded-full" style={{ color, background: `${color}12` }}>{images[current].label}</span>
          </motion.div>
        </AnimatePresence>
        {images.length > 1 && (<>
          <button onClick={() => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={() => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><ChevronRight size={16} /></button>
        </>)}
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2 bg-white/50 dark:bg-zinc-950/50">
        {images.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: i === current ? color : 'rgba(113,113,122,0.4)', transform: i === current ? 'scale(1.4)' : 'scale(1)' }} />))}
      </div>
    </div>
  );
}

function HackathonCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const hasImages = item.images && item.images.length > 0;
  return (
    <TiltCard>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: index * 0.15 }} className="glass rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all duration-300 overflow-hidden">
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{item.trophy}</span><h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h3></div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1"><Sparkles size={13} style={{ color: item.color }} /> {item.event}</span>
              <span className="flex items-center gap-1"><MapPin size={13} /> {item.location}</span>
              <span className="flex items-center gap-1"><Calendar size={13} /> {item.date}</span>
              <span className="flex items-center gap-1"><Users size={13} /> {item.teamSize}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{item.description}</p>
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2 flex items-center gap-2"><Flame size={14} style={{ color: item.color }} />What We Built</h4>
          <ul className="space-y-1.5">{item.whatWeBuilt?.map((point, i) => (<li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"><span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }} />{point}</li>))}</ul>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">{item.techStack?.map((tech) => (<span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md border" style={{ background: `${item.color}08`, color: `${item.color}cc`, borderColor: `${item.color}20` }}>{tech}</span>))}</div>
        
        {hasImages && (
          <>
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors" style={{ color: item.color }}>
              <Image size={14} />{expanded ? 'Hide' : 'View'} Event Photos ({item.images.length})
              <motion.span animate={{ rotate: expanded ? 180 : 0 }}><ChevronLeft size={14} className="-rotate-90" /></motion.span>
            </button>
            <AnimatePresence>{expanded && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden mb-5"><ImageGallery images={item.images} color={item.color} /></motion.div>)}</AnimatePresence>
          </>
        )}
        
        <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
          {item.liveDemo && (<a href={item.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all" style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, color: item.color }}><ExternalLink size={14} />Live Demo</a>)}
          {item.github && (<a href={item.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-cyber-green hover:border-[var(--accent)]/30 transition-all"><GitFork size={14} />GitHub Repo</a>)}
        </div>
      </div>
      </motion.div>
    </TiltCard>
  );
}

function EventCard({ item, index }) {
  return (
    <TiltCard>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ x: 5, transition: { duration: 0.2 } }} className="glass rounded-xl p-5 md:p-6 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
          {item.mood}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded" style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}20` }}>{item.type}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mb-3">
            <span className="flex items-center gap-1"><MapPin size={11} /> {item.location}</span>
            <span className="flex items-center gap-1"><Calendar size={11} /> {item.date}</span>
            <span className="flex items-center gap-1"><CalendarCheck size={11} style={{ color: 'var(--accent)' }} /> {item.status}</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{item.experience}</p>
          <div>
            <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-1.5"><MessageCircle size={12} style={{ color: item.color }} /> Key Takeaways</h4>
            <ul className="space-y-1">
              {item.takeaways?.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">
                  <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </motion.div>
    </TiltCard>
  );
}



/* ─── MAIN COMPONENT ─── */
const tabs = [
  { id: 'wins', label: 'Hackathon Wins', icon: Trophy, color: '#F59E0B' },
  { id: 'events', label: 'Events & Participation', icon: CalendarCheck, color: '#EC4899' },
];

export default function Achievements() {
  const { data, loading } = usePortfolioData();
  const [activeTab, setActiveTab] = useState('wins');

  if (loading) return null;

  const achievements = data?.achievements || {};
  const hackathonWins = achievements.hackathons || [];
  const pastEvents = achievements.events || [];

  return (
    <section id="achievements" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--tertiary)' }}>&lt;achievements /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Hackathons, Events & <span className="text-gradient-warm">Wins</span></h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-2 max-w-lg">Building under pressure, learning from the community, always showing up.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/40'}`}>
                {isActive && (<motion.div layoutId="achievementTabBg" className="absolute inset-0 glass rounded-xl border border-zinc-300/50 dark:border-zinc-700/50" style={{ boxShadow: `0 0 15px ${tab.color}10` }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />)}
                <Icon size={16} className="relative z-10" style={{ color: isActive ? tab.color : undefined }} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'wins' && (
            <motion.div key="wins" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="space-y-6">
              {hackathonWins.map((item, i) => (<HackathonCard key={item._id || item.title} item={item} index={i} />))}
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              {/* Past Events */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                  <CalendarCheck size={18} className="text-cyber-pink" style={{ color: 'var(--tertiary)' }} /> Past Events & Experiences
                </h3>
                <div className="space-y-4">
                  {pastEvents.map((item, i) => (<EventCard key={item._id || item.title} item={item} index={i} />))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
