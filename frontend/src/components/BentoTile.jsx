import { motion } from 'framer-motion';

export default function BentoTile({ children, className = '', delay = 0, glowColor = 'cyber-green' }) {
  const glowMap = {
    'cyber-green': 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    'cyber-blue': 'hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    'cyber-purple': 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
    'cyber-pink': 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
    'cyber-orange': 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-6 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 cursor-default group ${glowMap[glowColor] || glowMap['cyber-green']} ${className}`}
    >
      {children}
    </motion.div>
  );
}
