import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

export default function AmbientBackground() {
  const { themeId } = useTheme();

  // Adjust opacity based on theme
  const opacity = themeId === 'ocean' ? 0.2 : 0.15;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[120px] opacity-20"
        style={{ background: 'var(--accent)' }}
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          rotate: [360, 180, 90, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full mix-blend-screen blur-[120px] opacity-20"
        style={{ background: 'var(--secondary)' }}
      />
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[50vw] rounded-full mix-blend-screen blur-[140px] opacity-15"
        style={{ background: 'var(--tertiary)' }}
      />
    </div>
  );
}
