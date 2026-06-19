import { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  cyberpunk: {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    emoji: '🟢',
    colors: {
      '--accent': '#10B981',
      '--accent-rgb': '16, 185, 129',
      '--secondary': '#06B6D4',
      '--secondary-rgb': '6, 182, 212',
      '--tertiary': '#8B5CF6',
      '--tertiary-rgb': '139, 92, 246',
      '--theme-bg-primary': '#09090b',
      '--theme-bg-card': 'rgba(24, 24, 27, 0.6)',
      '--theme-bg-card-strong': 'rgba(24, 24, 27, 0.8)',
      '--theme-border-subtle': 'rgba(63, 63, 70, 0.4)',
      '--theme-border-medium': 'rgba(63, 63, 70, 0.5)',
      '--theme-text-primary': '#fafafa',
      '--theme-text-secondary': '#a1a1aa',
      '--theme-text-muted': '#71717a',
      '--scrollbar-thumb': '#10B981',
      '--selection-bg': 'rgba(16, 185, 129, 0.3)',
      '--selection-color': '#10B981',
    },
  },
  violet: {
    id: 'violet',
    label: 'Neon Violet',
    emoji: '🟪',
    colors: {
      '--accent': '#A855F7',
      '--accent-rgb': '168, 85, 247',
      '--secondary': '#F472B6',
      '--secondary-rgb': '244, 114, 182',
      '--tertiary': '#38BDF8',
      '--tertiary-rgb': '56, 189, 248',
      '--theme-bg-primary': '#0B0910',
      '--theme-bg-card': 'rgba(25, 20, 35, 0.6)',
      '--theme-bg-card-strong': 'rgba(25, 20, 35, 0.85)',
      '--theme-border-subtle': 'rgba(107, 70, 193, 0.4)',
      '--theme-border-medium': 'rgba(107, 70, 193, 0.5)',
      '--theme-text-primary': '#faf5ff',
      '--theme-text-secondary': '#d8b4fe',
      '--theme-text-muted': '#9333ea',
      '--scrollbar-thumb': '#A855F7',
      '--selection-bg': 'rgba(168, 85, 247, 0.3)',
      '--selection-color': '#A855F7',
    },
  },
  ember: {
    id: 'ember',
    label: 'Ember',
    emoji: '🟠',
    colors: {
      '--accent': '#F97316',
      '--accent-rgb': '249, 115, 22',
      '--secondary': '#EF4444',
      '--secondary-rgb': '239, 68, 68',
      '--tertiary': '#F59E0B',
      '--tertiary-rgb': '245, 158, 11',
      '--theme-bg-primary': '#0c0a09',
      '--theme-bg-card': 'rgba(28, 25, 23, 0.6)',
      '--theme-bg-card-strong': 'rgba(28, 25, 23, 0.85)',
      '--theme-border-subtle': 'rgba(68, 64, 60, 0.4)',
      '--theme-border-medium': 'rgba(68, 64, 60, 0.5)',
      '--theme-text-primary': '#fafaf9',
      '--theme-text-secondary': '#a8a29e',
      '--theme-text-muted': '#78716c',
      '--scrollbar-thumb': '#F97316',
      '--selection-bg': 'rgba(249, 115, 22, 0.3)',
      '--selection-color': '#F97316',
    },
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'cyberpunk';
  });

  useEffect(() => {
    const theme = themes[themeId];
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem('portfolio-theme', themeId);
  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { themes };
