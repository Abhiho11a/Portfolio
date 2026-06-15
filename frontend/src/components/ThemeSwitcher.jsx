import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme, themes } from '../ThemeContext';

export default function ThemeSwitcher() {
  const { themeId, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);

  const themeList = Object.values(themes);
  const current = themes[themeId];

  return (
    <div className="fixed top-5 right-5 z-50">
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg"
        style={{
          background: 'var(--bg-card-strong)',
          border: '1px solid var(--border-medium)',
          color: 'var(--accent)',
          boxShadow: open ? `0 0 20px rgba(var(--accent-rgb), 0.2)` : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <Palette size={17} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 rounded-xl overflow-hidden shadow-2xl min-w-[180px]"
            style={{
              background: 'var(--bg-card-strong)',
              border: '1px solid var(--border-medium)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Theme
              </span>
            </div>
            {themeList.map((theme) => {
              const isActive = themeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => { setThemeId(theme.id); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200"
                  style={{
                    background: isActive ? `rgba(var(--accent-rgb), 0.1)` : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="text-base">{theme.emoji}</span>
                  <span className="text-sm font-medium">{theme.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="themeCheck"
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ background: 'var(--accent)', boxShadow: `0 0 6px rgba(var(--accent-rgb), 0.5)` }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
