import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If no saved preference, default to dark. If light is saved, use light.
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = (e) => {
    const willBeDark = !isDark;
    
    if (!document.startViewTransition) {
      setIsDark(willBeDark);
      if (willBeDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const style = document.createElement('style');
    style.id = 'theme-transition-styles';
    style.innerHTML = `
      *, *::before, *::after { transition: none !important; }
      .glass, .glass-strong { 
        backdrop-filter: none !important; 
        -webkit-backdrop-filter: none !important; 
      }
    `;
    document.head.appendChild(style);
    
    // Force synchronous layout recalculation before capturing the old snapshot
    window.getComputedStyle(document.body).getPropertyValue('opacity');

    const transition = document.startViewTransition(() => {
      setIsDark(willBeDark);
      if (willBeDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: willBeDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 350,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          fill: 'forwards',
          pseudoElement: willBeDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });

    transition.finished.finally(() => {
      document.head.removeChild(style);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2.5 md:p-3 rounded-full transition-all block text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
      aria-label="Toggle Theme"
      title="Toggle Light/Dark Mode"
    >
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
      </div>
    </button>
  );
}
