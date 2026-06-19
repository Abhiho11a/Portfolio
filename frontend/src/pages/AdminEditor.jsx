import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Save, RotateCcw, Plus, Trash2, ChevronDown,
  ChevronUp, Check, AlertCircle, X, Palette
} from 'lucide-react';
import { usePortfolioData } from '../DataContext';

// ═══════════════════════════════════════════════════════════════
//  SECTION CONFIGS — defines the editable fields for each section
// ═══════════════════════════════════════════════════════════════

const SECTION_CONFIGS = {
  hero: {
    label: 'Hero / About',
    type: 'object',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'description', label: 'Description', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'status', label: 'Status Text', type: 'text' },
      { key: 'highlights', label: 'Tech Highlights', type: 'highlights' },
    ],
  },
  skills: {
    label: 'Skills & Expertise',
    type: 'array',
    titleKey: 'label',
    fields: [
      { key: 'id', label: 'ID (unique)', type: 'text' },
      { key: 'label', label: 'Category Name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'color', label: 'Color (hex)', type: 'color' },
      { key: 'skills', label: 'Skills', type: 'skillsArray' },
    ],
    defaultItem: { id: '', label: '', tagline: '', color: '#10B981', skills: [] },
  },
  projects: {
    label: 'Projects',
    type: 'array',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'techStack', label: 'Tech Stack (comma separated)', type: 'tags' },
      { key: 'colorHex', label: 'Color (hex)', type: 'color' },
      { key: 'accent', label: 'Accent Name', type: 'text' },
      { key: 'stats', label: 'Stats (JSON)', type: 'json' },
      { key: 'links', label: 'Links', type: 'links' },
    ],
    defaultItem: { title: '', tagline: '', description: '', techStack: [], colorHex: '#10B981', accent: 'emerald', stats: {}, links: { live: '', github: '' } },
  },
  currentlyBuilding: {
    label: 'Currently Building',
    type: 'array',
    titleKey: 'title',
    fields: [
      { key: 'status', label: 'Status', type: 'select', options: ['In Progress', 'Shipping Soon', 'Research Phase', 'On Hold'] },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'progress', label: 'Progress (%)', type: 'range' },
      { key: 'techStack', label: 'Tech Stack (comma separated)', type: 'tags' },
      { key: 'color', label: 'Color (hex)', type: 'color' },
      { key: 'started', label: 'Started', type: 'text' },
    ],
    defaultItem: { status: 'In Progress', title: '', description: '', progress: 0, techStack: [], color: '#10B981', started: '' },
  },
  education: {
    label: 'Education',
    type: 'array',
    titleKey: 'level',
    fields: [
      { key: 'level', label: 'Degree / Level', type: 'text' },
      { key: 'institution', label: 'Institution', type: 'text' },
      { key: 'board', label: 'Board / University', type: 'text' },
      { key: 'duration', label: 'Duration', type: 'text' },
      { key: 'score', label: 'Score', type: 'text' },
      { key: 'highlights', label: 'Subjects / Highlights (comma separated)', type: 'tags' },
      { key: 'color', label: 'Color (hex)', type: 'color' },
      { key: 'current', label: 'Currently Studying', type: 'checkbox' },
    ],
    defaultItem: { level: '', institution: '', board: '', duration: '', score: '', highlights: [], color: '#10B981', current: false },
  },
  achievements: {
    label: 'Achievements & Events',
    type: 'achievements',
    hackathonFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'event', label: 'Event Name', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'teamSize', label: 'Team Size', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'whatWeBuilt', label: 'What We Built (one per line)', type: 'lines' },
      { key: 'techStack', label: 'Tech Stack (comma separated)', type: 'tags' },
      { key: 'liveDemo', label: 'Live Demo URL', type: 'text' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'color', label: 'Color (hex)', type: 'color' },
      { key: 'trophy', label: 'Trophy Emoji', type: 'text' },
    ],
    eventFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'type', label: 'Type', type: 'select', options: ['Hackathon', 'Tech Conference', 'Meetup', 'Workshop', 'Bootcamp'] },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'experience', label: 'Experience', type: 'textarea' },
      { key: 'takeaways', label: 'Key Takeaways (one per line)', type: 'lines' },
      { key: 'mood', label: 'Mood Emoji', type: 'text' },
      { key: 'color', label: 'Color (hex)', type: 'color' },
    ],
    defaultHackathon: { title: '', event: '', location: '', date: '', teamSize: '', description: '', whatWeBuilt: [], techStack: [], liveDemo: '', github: '', images: [], color: '#10B981', trophy: '🏆' },
    defaultEvent: { title: '', type: 'Hackathon', location: '', date: '', status: 'completed', experience: '', takeaways: [], mood: '🔥', color: '#10B981' },
  },
  proofOfWork: {
    label: 'Stats & Proof of Work',
    type: 'proofOfWork',
    fields: [],
  },
  contact: {
    label: 'Contact & Socials',
    type: 'object',
    fields: [
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
      { key: 'github', label: 'GitHub URL', type: 'text' },
      { key: 'location', label: 'Location Text', type: 'text' },
      { key: 'availability', label: 'Availability (comma separated)', type: 'tags' },
    ],
  },
  footer: {
    label: 'Footer & Links',
    type: 'footer',
    fields: [],
  },
};

// ═══════════════════════════════════════════════════════════════
//  FIELD RENDERERS
// ═══════════════════════════════════════════════════════════════

const inputClass = "w-full px-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-600 outline-none transition-all duration-300 focus:border-[rgba(var(--accent-rgb),0.5)]";

function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case 'text':
      return <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={field.label} />;

    case 'textarea':
      return <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${inputClass} min-h-[100px] resize-y`} placeholder={field.label} />;

    case 'tags':
      return (
        <div>
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : value || ''}
            onChange={(e) => onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            className={inputClass}
            placeholder="Tag1, Tag2, Tag3..."
          />
          {Array.isArray(value) && value.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {value.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded-md border" style={{ background: 'rgba(var(--accent-rgb), 0.08)', color: 'var(--accent)', borderColor: 'rgba(var(--accent-rgb), 0.2)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case 'lines':
      return (
        <textarea
          value={Array.isArray(value) ? value.join('\n') : value || ''}
          onChange={(e) => onChange(e.target.value.split('\n').filter(Boolean))}
          className={`${inputClass} min-h-[100px] resize-y`}
          placeholder="One item per line..."
        />
      );

    case 'color':
      return (
        <div className="flex items-center gap-3">
          <input type="color" value={value || '#10B981'} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
          <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${inputClass} flex-1`} placeholder="#10B981" />
          <div className="w-8 h-8 rounded-lg border border-zinc-300/50 dark:border-zinc-700/50" style={{ background: value || '#10B981' }} />
        </div>
      );

    case 'range':
      return (
        <div className="flex items-center gap-4">
          <input type="range" min="0" max="100" value={value || 0} onChange={(e) => onChange(parseInt(e.target.value))} className="flex-1 accent-[var(--accent)]" />
          <span className="text-sm font-bold font-mono w-12 text-right" style={{ color: 'var(--accent)' }}>{value || 0}%</span>
        </div>
      );

    case 'checkbox':
      return (
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${value ? 'border-[var(--accent)]' : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-900/60'}`} style={value ? { background: 'var(--accent)' } : {}} onClick={() => onChange(!value)}>
            {value && <Check size={14} className="text-zinc-900" />}
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">{field.label}</span>
        </label>
      );

    case 'select':
      return (
        <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );

    case 'json':
      return (
        <textarea
          value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || '{}'}
          onChange={(e) => { try { onChange(JSON.parse(e.target.value)); } catch {} }}
          className={`${inputClass} min-h-[80px] resize-y font-mono text-xs`}
          placeholder='{"key": "value"}'
        />
      );

    case 'links':
      return (
        <div className="space-y-2">
          <input type="text" value={value?.live || ''} onChange={(e) => onChange({ ...value, live: e.target.value })} className={inputClass} placeholder="Live Demo URL" />
          <input type="text" value={value?.github || ''} onChange={(e) => onChange({ ...value, github: e.target.value })} className={inputClass} placeholder="GitHub URL" />
        </div>
      );

    case 'highlights':
      return (
        <div className="space-y-2">
          {(value || []).map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" value={h.text || ''} onChange={(e) => { const arr = [...(value || [])]; arr[i] = { ...arr[i], text: e.target.value }; onChange(arr); }} className={`${inputClass} flex-1`} placeholder="Highlight text" />
              <input type="text" value={h.color || ''} onChange={(e) => { const arr = [...(value || [])]; arr[i] = { ...arr[i], color: e.target.value }; onChange(arr); }} className={`${inputClass} w-40`} placeholder="CSS color" />
              <button onClick={() => { const arr = (value || []).filter((_, idx) => idx !== i); onChange(arr); }} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={() => onChange([...(value || []), { text: '', color: 'var(--accent)', label: '' }])} className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all" style={{ color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.08)' }}>
            <Plus size={12} /> Add Highlight
          </button>
        </div>
      );

    case 'skillsArray':
      return (
        <div className="space-y-4 pl-2 border-l-2" style={{ borderColor: 'rgba(var(--accent-rgb), 0.2)' }}>
          {(value || []).map((skill, i) => (
            <div key={i} className="flex flex-col gap-3 bg-zinc-50/40 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 uppercase mb-1">Skill Name</label>
                  <input type="text" value={skill.name || ''} onChange={(e) => { const arr = [...(value || [])]; arr[i] = { ...arr[i], name: e.target.value }; onChange(arr); }} className={inputClass} placeholder="e.g. React" />
                </div>
                <div className="w-24">
                  <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 uppercase mb-1">Level (%)</label>
                  <input type="number" min="0" max="100" value={skill.level || 0} onChange={(e) => { const arr = [...(value || [])]; arr[i] = { ...arr[i], level: parseInt(e.target.value) }; onChange(arr); }} className={inputClass} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 uppercase mb-1">Description (Optional)</label>
                  <input type="text" value={skill.desc || ''} onChange={(e) => { const arr = [...(value || [])]; arr[i] = { ...arr[i], desc: e.target.value }; onChange(arr); }} className={inputClass} placeholder="e.g. Hooks, Context" />
                </div>
                <button onClick={() => onChange((value || []).filter((_, idx) => idx !== i))} className="mt-5 p-3 rounded-lg text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/20 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => onChange([...(value || []), { name: '', level: 50, desc: '' }])} className="flex items-center gap-2 text-xs font-medium px-4 py-3 rounded-xl transition-all" style={{ color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.1)' }}>
            <Plus size={14} /> Add Skill
          </button>
        </div>
      );

    default:
      return <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
  }
}

// ═══════════════════════════════════════════════════════════════
//  COLLAPSIBLE ITEM CARD (for array sections)
// ═══════════════════════════════════════════════════════════════

function ItemCard({ item, index, fields, titleKey, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const title = item[titleKey] || `Item ${index + 1}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800/40 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 text-left">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(index); }}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 size={14} />
          </button>
          {expanded ? <ChevronUp size={16} className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-zinc-200/40 dark:border-zinc-800/40 pt-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <FieldRenderer
                    field={field}
                    value={item[field.key]}
                    onChange={(val) => onUpdate(index, field.key, val)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PROOF OF WORK EDITOR
// ═══════════════════════════════════════════════════════════════

function ProofOfWorkEditor({ data, onChange }) {
  const gh = data?.github || { username: '', stats: [] };
  const lc = data?.leetcode || { username: '', totalSolved: 0, stats: [] };

  const updateGithub = (key, val) => onChange({ ...data, github: { ...gh, [key]: val } });
  const updateLeetcode = (key, val) => onChange({ ...data, leetcode: { ...lc, [key]: val } });

  return (
    <div className="space-y-8">
      {/* GitHub */}
      <div className="glass rounded-xl p-6 border border-zinc-200/60 dark:border-zinc-800/60">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} /> GitHub
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Username</label>
            <input type="text" value={gh.username || ''} onChange={(e) => updateGithub('username', e.target.value)} className={inputClass} placeholder="GitHub username" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Stats</label>
            {(gh.stats || []).map((stat, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input type="text" value={stat.label || ''} onChange={(e) => { const arr = [...(gh.stats || [])]; arr[i] = { ...arr[i], label: e.target.value }; updateGithub('stats', arr); }} className={`${inputClass} flex-1`} placeholder="Label" />
                <input type="text" value={stat.value || ''} onChange={(e) => { const arr = [...(gh.stats || [])]; arr[i] = { ...arr[i], value: e.target.value }; updateGithub('stats', arr); }} className={`${inputClass} w-32`} placeholder="Value" />
                <input type="color" value={stat.color || '#10B981'} onChange={(e) => { const arr = [...(gh.stats || [])]; arr[i] = { ...arr[i], color: e.target.value }; updateGithub('stats', arr); }} className="w-8 h-8 rounded cursor-pointer" />
                <button onClick={() => updateGithub('stats', (gh.stats || []).filter((_, idx) => idx !== i))} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => updateGithub('stats', [...(gh.stats || []), { label: '', value: '', color: '#10B981' }])} className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.08)' }}>
              <Plus size={12} /> Add Stat
            </button>
          </div>
        </div>
      </div>

      {/* LeetCode */}
      <div className="glass rounded-xl p-6 border border-zinc-200/60 dark:border-zinc-800/60">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} /> LeetCode
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Username</label>
            <input type="text" value={lc.username || ''} onChange={(e) => updateLeetcode('username', e.target.value)} className={inputClass} placeholder="LeetCode username" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Total Solved</label>
            <input type="number" value={lc.totalSolved || 0} onChange={(e) => updateLeetcode('totalSolved', parseInt(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Difficulty Stats</label>
            {(lc.stats || []).map((stat, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input type="text" value={stat.difficulty || ''} onChange={(e) => { const arr = [...(lc.stats || [])]; arr[i] = { ...arr[i], difficulty: e.target.value }; updateLeetcode('stats', arr); }} className={`${inputClass} w-28`} placeholder="Difficulty" />
                <input type="number" value={stat.solved || 0} onChange={(e) => { const arr = [...(lc.stats || [])]; arr[i] = { ...arr[i], solved: parseInt(e.target.value) }; updateLeetcode('stats', arr); }} className={`${inputClass} w-24`} placeholder="Solved" />
                <span className="text-zinc-600">/</span>
                <input type="number" value={stat.total || 0} onChange={(e) => { const arr = [...(lc.stats || [])]; arr[i] = { ...arr[i], total: parseInt(e.target.value) }; updateLeetcode('stats', arr); }} className={`${inputClass} w-24`} placeholder="Total" />
                <input type="color" value={stat.color || '#10B981'} onChange={(e) => { const arr = [...(lc.stats || [])]; arr[i] = { ...arr[i], color: e.target.value }; updateLeetcode('stats', arr); }} className="w-8 h-8 rounded cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  FOOTER EDITOR
// ═══════════════════════════════════════════════════════════════

function FooterEditor({ data, onChange }) {
  const socials = data?.socials || [];
  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">Social Links</label>
      {socials.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <input type="text" value={s.label || ''} onChange={(e) => { const arr = [...socials]; arr[i] = { ...arr[i], label: e.target.value }; onChange({ ...data, socials: arr }); }} className={`${inputClass} w-36`} placeholder="Label" />
          <input type="text" value={s.href || ''} onChange={(e) => { const arr = [...socials]; arr[i] = { ...arr[i], href: e.target.value }; onChange({ ...data, socials: arr }); }} className={`${inputClass} flex-1`} placeholder="URL" />
          <button onClick={() => onChange({ ...data, socials: socials.filter((_, idx) => idx !== i) })} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={() => onChange({ ...data, socials: [...socials, { label: '', href: '' }] })} className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.08)' }}>
        <Plus size={12} /> Add Link
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ACHIEVEMENTS EDITOR
// ═══════════════════════════════════════════════════════════════

function AchievementsEditor({ data, onChange }) {
  const hackathons = data?.hackathons || [];
  const events = data?.events || [];
  const config = SECTION_CONFIGS.achievements;

  const updateHackathon = (index, key, val) => {
    const arr = [...hackathons];
    arr[index] = { ...arr[index], [key]: val };
    onChange({ ...data, hackathons: arr });
  };

  const updateEvent = (index, key, val) => {
    const arr = [...events];
    arr[index] = { ...arr[index], [key]: val };
    onChange({ ...data, events: arr });
  };

  return (
    <div className="space-y-8">
      {/* Hackathons */}
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          🏆 Hackathon Wins
          <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.1)' }}>{hackathons.length} items</span>
        </h3>
        <div className="space-y-3">
          {hackathons.map((item, i) => (
            <ItemCard
              key={i}
              item={item}
              index={i}
              fields={config.hackathonFields}
              titleKey="title"
              onUpdate={updateHackathon}
              onDelete={(idx) => onChange({ ...data, hackathons: hackathons.filter((_, j) => j !== idx) })}
            />
          ))}
          <button onClick={() => onChange({ ...data, hackathons: [...hackathons, { ...config.defaultHackathon }] })} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-300/50 dark:border-zinc-700/50 text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all">
            <Plus size={16} /> Add Hackathon Win
          </button>
        </div>
      </div>

      {/* Events */}
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          📅 Events & Participation
          <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ color: 'var(--secondary)', background: 'rgba(var(--secondary-rgb), 0.1)' }}>{events.length} items</span>
        </h3>
        <div className="space-y-3">
          {events.map((item, i) => (
            <ItemCard
              key={i}
              item={item}
              index={i}
              fields={config.eventFields}
              titleKey="title"
              onUpdate={updateEvent}
              onDelete={(idx) => onChange({ ...data, events: events.filter((_, j) => j !== idx) })}
            />
          ))}
          <button onClick={() => onChange({ ...data, events: [...events, { ...config.defaultEvent }] })} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-300/50 dark:border-zinc-700/50 text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all">
            <Plus size={16} /> Add Event
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN EDITOR COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AdminEditor() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { data: portfolioData, refreshData } = usePortfolioData();
  const [sectionData, setSectionData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const config = SECTION_CONFIGS[section];

  useEffect(() => {
    if (portfolioData && portfolioData[section] !== undefined) {
      setSectionData(JSON.parse(JSON.stringify(portfolioData[section])));
    }
  }, [portfolioData, section]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin-token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/data/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sectionData)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to save');
      }
      await refreshData();
      showToast('Changes saved successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      const token = localStorage.getItem('admin-token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/data/reset/${section}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to reset');
      }
      await refreshData();
      showToast('Section reset to defaults', 'success');
      setShowResetConfirm(false);
    } catch (err) {
      showToast(err.message || 'Failed to reset', 'error');
    } finally {
      setResetting(false);
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Section not found</h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mb-4">The section "{section}" doesn't exist.</p>
          <button onClick={() => navigate('/admin/dashboard')} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--accent)', color: '#09090b' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!sectionData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  // ── Update handlers ──
  const updateField = (key, value) => {
    setSectionData((prev) => ({ ...prev, [key]: value }));
  };

  const updateArrayItem = (index, key, value) => {
    setSectionData((prev) => {
      const arr = [...prev];
      arr[index] = { ...arr[index], [key]: value };
      return arr;
    });
  };

  const deleteArrayItem = (index) => {
    setSectionData((prev) => prev.filter((_, i) => i !== index));
  };

  const addArrayItem = () => {
    setSectionData((prev) => [...prev, { ...config.defaultItem }]);
  };

  // ── Render content ──
  const renderContent = () => {
    if (config.type === 'object') {
      return (
        <div className="glass rounded-xl p-6 border border-zinc-200/60 dark:border-zinc-800/60 space-y-5">
          {config.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                {field.label}
              </label>
              <FieldRenderer field={field} value={sectionData[field.key]} onChange={(val) => updateField(field.key, val)} />
            </div>
          ))}
        </div>
      );
    }

    if (config.type === 'array') {
      return (
        <div className="space-y-3">
          <AnimatePresence>
            {(sectionData || []).map((item, i) => (
              <ItemCard
                key={i}
                item={item}
                index={i}
                fields={config.fields}
                titleKey={config.titleKey}
                onUpdate={updateArrayItem}
                onDelete={deleteArrayItem}
              />
            ))}
          </AnimatePresence>
          <button onClick={addArrayItem} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-300/50 dark:border-zinc-700/50 text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all">
            <Plus size={16} /> Add New Item
          </button>
        </div>
      );
    }

    if (config.type === 'achievements') {
      return <AchievementsEditor data={sectionData} onChange={setSectionData} />;
    }

    if (config.type === 'proofOfWork') {
      return <ProofOfWorkEditor data={sectionData} onChange={setSectionData} />;
    }

    if (config.type === 'footer') {
      return <FooterEditor data={sectionData} onChange={setSectionData} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-all"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
              style={{ background: 'var(--accent)', color: '#09090b' }}
            >
              {saving ? <div className="w-4 h-4 border-2 border-zinc-200 dark:border-zinc-900 border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>
            &lt;edit_{section} /&gt;
          </span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{config.label}</h2>
        </motion.div>

        {renderContent()}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl glass-strong border shadow-2xl"
            style={{
              borderColor: toast.type === 'success' ? 'rgba(var(--accent-rgb), 0.3)' : 'rgba(239,68,68,0.3)',
            }}
          >
            {toast.type === 'success' ? (
              <Check size={16} style={{ color: 'var(--accent)' }} />
            ) : (
              <AlertCircle size={16} className="text-red-400" />
            )}
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 max-w-sm w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <AlertCircle size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Reset Section?</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">This will revert to default data</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                All changes to <strong className="text-zinc-800 dark:text-zinc-200">{config.label}</strong> will be lost. This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  disabled={resetting}
                  className="px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-zinc-900 hover:bg-amber-400 transition-all disabled:opacity-50"
                >
                  {resetting ? 'Resetting...' : 'Reset to Defaults'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
