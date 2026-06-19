import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Code2, GraduationCap, Trophy, Terminal, BarChart2, MessageSquare, Rocket, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Magnetic from './Magnetic';

const navItems = [
  { id: 'hero', icon: Home, label: 'Home', href: '#' },
  { id: 'skills', icon: Layers, label: 'Skills', href: '#skills' },
  { id: 'projects', icon: Code2, label: 'Projects', href: '#projects' },
  { id: 'now', icon: Rocket, label: 'Building', href: '#now' },
  { id: 'education', icon: GraduationCap, label: 'Education', href: '#education' },
  { id: 'achievements', icon: Trophy, label: 'Wins', href: '#achievements' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', href: '#terminal' },
  { id: 'stats', icon: BarChart2, label: 'Stats', href: '#stats' },
  { id: 'contact', icon: Mail, label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  const handleNavClick = (id) => {
    setActiveSection(id);
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        if (!isClickingRef.current) {
          const sections = navItems.map(item => item.id);
          let current = 'hero';
          
          const scrollPosition = window.scrollY + window.innerHeight / 3;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top + window.scrollY <= scrollPosition) {
                current = section;
              }
            }
          }
          
          if (window.scrollY < 100) current = 'hero';
          setActiveSection(current);
        }
        timeoutId = null;
      }, 50); // 50ms throttle prevents layout thrashing
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        data-cursor-hide="true"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-strong px-2 py-2 md:px-4 md:py-3 rounded-full flex items-center gap-1 md:gap-2 border border-zinc-300/50 dark:border-zinc-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === index;

          return (
            <a
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleNavClick(item.id)}
              className="relative group p-2.5 md:p-3 rounded-full transition-all duration-300 outline-none block"
            >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-full border border-zinc-300/50 dark:border-zinc-700/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover Background */}
                <AnimatePresence>
                  {!isActive && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, transition: { delay: 0, duration: 0.1 } }}
                      transition={{ duration: 0.1, delay: 0 }}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ 
                        borderColor: 'var(--accent)',
                        background: 'rgba(var(--accent-rgb), 0.15)' 
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 glass bg-zinc-50 dark:bg-zinc-900 border border-zinc-300/50 dark:border-zinc-700/50 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap shadow-xl hidden md:block"
                    >
                      {item.label}
                      {/* Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-50 dark:bg-zinc-900 border-b border-r border-zinc-300/50 dark:border-zinc-700/50 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div 
                  animate={{ 
                    scale: isHovered ? 0.95 : isActive ? 1.1 : 1,
                    color: isActive ? 'var(--accent)' : isHovered ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}
                  className="relative z-10 flex items-center justify-center"
                >
                  <Icon size={18} className="md:w-5 md:h-5" />
                </motion.div>
              </a>
          );
        })}
        
        {/* Divider */}
        <div className="w-px h-6 md:h-8 bg-zinc-200 dark:bg-zinc-800 mx-1 md:mx-2" />

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Ask AI Button (Special) */}
        <a
          href="#terminal"
          className="relative group p-2.5 md:p-3 rounded-full transition-all block"
          style={{ background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', border: '1px solid rgba(var(--accent-rgb), 0.2)', boxShadow: '0 0 15px rgba(var(--accent-rgb), 0.15)' }}
          onMouseEnter={() => setHoveredIndex('ai')}
          onMouseLeave={() => setHoveredIndex(null)}
        >
            <AnimatePresence>
              {hoveredIndex === 'ai' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 glass bg-zinc-50 dark:bg-zinc-900 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl hidden md:block"
                  style={{ color: 'var(--accent)', borderColor: 'rgba(var(--accent-rgb), 0.4)' }}
                >
                  Ask My AI
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-50 dark:bg-zinc-900 border-b border-r rotate-45" style={{ borderColor: 'rgba(var(--accent-rgb), 0.4)' }} />
                </motion.div>
              )}
            </AnimatePresence>
            <MessageSquare size={18} className="md:w-5 md:h-5" />
          </a>

      </motion.nav>
    </div>
  );
}
