import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, Layers, Code2, Rocket, GraduationCap, Trophy,
  BarChart2, Mail, Globe, LogOut, ExternalLink, Settings,
  ChevronRight, Database
} from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { usePortfolioData } from '../DataContext';

const sections = [
  {
    id: 'hero',
    label: 'Hero / About',
    description: 'Name, tagline, description, location, status',
    icon: Home,
    color: '#10B981',
    getCount: (d) => d?.hero ? '1 profile' : '—',
  },
  {
    id: 'skills',
    label: 'Skills & Expertise',
    description: 'Skill categories and proficiency levels',
    icon: Layers,
    color: '#06B6D4',
    getCount: (d) => d?.skills ? `${d.skills.length} categories` : '—',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Featured portfolio projects',
    icon: Code2,
    color: '#8B5CF6',
    getCount: (d) => d?.projects ? `${d.projects.length} projects` : '—',
  },
  {
    id: 'currentlyBuilding',
    label: 'Currently Building',
    description: 'Active work-in-progress projects',
    icon: Rocket,
    color: '#F59E0B',
    getCount: (d) => d?.currentlyBuilding ? `${d.currentlyBuilding.length} items` : '—',
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Academic journey and qualifications',
    icon: GraduationCap,
    color: '#EC4899',
    getCount: (d) => d?.education ? `${d.education.length} entries` : '—',
  },
  {
    id: 'achievements',
    label: 'Achievements & Events',
    description: 'Hackathon wins and event participation',
    icon: Trophy,
    color: '#F97316',
    getCount: (d) => {
      const h = d?.achievements?.hackathons?.length || 0;
      const e = d?.achievements?.events?.length || 0;
      return `${h} wins, ${e} events`;
    },
  },
  {
    id: 'proofOfWork',
    label: 'Stats & Proof of Work',
    description: 'GitHub activity, LeetCode progress',
    icon: BarChart2,
    color: '#06B6D4',
    getCount: () => 'GitHub + LeetCode',
  },
  {
    id: 'contact',
    label: 'Contact & Socials',
    description: 'Email, LinkedIn, location, availability',
    icon: Mail,
    color: '#10B981',
    getCount: () => 'Contact info',
  },
  {
    id: 'footer',
    label: 'Footer & Links',
    description: 'Social media links',
    icon: Globe,
    color: '#8B5CF6',
    getCount: (d) => d?.footer?.socials ? `${d.footer.socials.length} links` : '—',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data, loading } = usePortfolioData();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Top Bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.2)' }}>
              <Settings size={20} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-zinc-100">Admin Panel</h1>
              <p className="text-[11px] font-mono text-zinc-500">portfolio://admin/dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900/60 border border-zinc-800/50 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Portfolio</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900/60 border border-zinc-800/50 text-red-400 hover:text-red-300 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>
            &lt;admin_panel /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
            Manage <span className="text-gradient">Content</span>
          </h2>
          <p className="text-zinc-500 mt-2 max-w-lg">
            Select a section to edit its content. Changes are saved to the database and reflected instantly on the portfolio.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/40 border border-zinc-800/40 flex-shrink-0">
            <Database size={14} style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-mono text-zinc-400">
              {loading ? 'Loading...' : 'Database connected'}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/40 border border-zinc-800/40 flex-shrink-0">
            <span className="text-xs font-mono text-zinc-400">
              {sections.length} editable sections
            </span>
          </div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => navigate(`/admin/edit/${section.id}`)}
                className="glass rounded-2xl p-6 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 text-left group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: `${section.color}12`, border: `1px solid ${section.color}25` }}
                  >
                    <Icon size={20} style={{ color: section.color }} />
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-1">{section.label}</h3>
                <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{section.description}</p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md"
                    style={{ color: section.color, background: `${section.color}12`, border: `1px solid ${section.color}20` }}
                  >
                    {section.getCount(data)}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
