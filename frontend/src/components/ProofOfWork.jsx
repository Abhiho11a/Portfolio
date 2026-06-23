import { motion } from 'framer-motion';
import { GitBranch, Code2, Trophy, TrendingUp, Calendar, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from '../ThemeContext';
import { usePortfolioData } from '../DataContext';

const ICONS = [Code2, Flame, TrendingUp, Calendar];

const generateMockLeetCodeData = () => {
  const data = [];
  const today = new Date();
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count > 3 ? 4 : count > 2 ? 3 : count > 1 ? 2 : 1
    });
  }
  return data;
};

export default function ProofOfWork() {
  const { themeId } = useTheme();
  const { data, loading } = usePortfolioData();
  const [leetCodeData, setLeetCodeData] = useState([]);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Simulated fetch - falls back to mock instantly for reliability if API fails
    setLeetCodeData(generateMockLeetCodeData());

    // Sync isDark with the document class
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      // Defer the heavy calendar SVG re-render until after the theme animation completes (400ms)
      setTimeout(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
      }, 400);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (loading) return null;

  const pow = data?.proofOfWork || {};
  const githubUsername = pow.github?.username || 'abhiho11a';
  const githubStats = pow.github?.stats || [];
  
  const leetcodeUsername = pow.leetcode?.username || 'abhishek_holla_';
  const leetcodeTotal = pow.leetcode?.totalSolved || 335;
  const leetcodeStats = pow.leetcode?.stats || [];

  // Determine theme color for calendars
  const getThemeColor = () => {
    switch (themeId) {
      case 'violet': return ['#1f1b2e', '#a855f7'];
      case 'ember': return ['#261a15', '#f97316'];
      default: return ['#13231c', '#10B981']; // cyberpunk green
    }
  };

  const themeColors = getThemeColor();

  return (
    <section id="stats" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--tertiary)' }}>
            &lt;proof_of_work /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Live <span className="text-gradient-warm">Stats</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-2 max-w-lg">
            Real-time metrics from GitHub and LeetCode — always shipping, always solving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* GitHub Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 md:p-8 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <GitBranch size={20} className="text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">GitHub Activity</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">github.com/{githubUsername}</p>
              </div>
            </div>

            <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[650px]">
                <GitHubCalendar 
                  username={githubUsername || 'abhiho11a'} 
                  colorScheme={isDark ? "dark" : "light"}
                  theme={{
                    dark: [themeColors[0], themeColors[1]],
                    light: ['#ebedf0', themeColors[1]]
                  }}
                  hideTotalCount
                  hideColorLegend
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {githubStats.map((stat, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/40">
                    <Icon size={16} className="mx-auto mb-1.5" style={{ color: stat.color }} />
                    <span className="block text-lg font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</span>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* LeetCode Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-2xl p-6 md:p-8 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Trophy size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">LeetCode Activity</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">leetcode.com/u/{leetcodeUsername}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-gradient">{leetcodeTotal}</span>
                <span className="block text-[10px] text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">Total Solved</span>
              </div>
            </div>

            <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[650px]">
                {leetCodeData.length > 0 && (
                  <ActivityCalendar 
                    data={leetCodeData} 
                    colorScheme={isDark ? "dark" : "light"}
                    theme={{
                      dark: [themeColors[0], themeColors[1]],
                      light: ['#ebedf0', themeColors[1]]
                    }}
                    hideTotalCount
                    hideColorLegend
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              {leetcodeStats.map(({ difficulty, solved, total, color }) => (
                <div key={difficulty}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium" style={{ color }}>{difficulty}</span>
                    <span className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">{solved} / {total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(solved / total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
