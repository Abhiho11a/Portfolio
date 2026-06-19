import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      if (target.closest('[data-cursor-hide="true"]')) {
        setVisible(false);
        setIsHovering(false);
        return;
      }
      
      if (!visible) setVisible(true);
      
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: position.x - 200,
          y: position.y - 200,
          opacity: visible ? 0.12 : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, rgba(var(--accent-rgb),0.4) 0%, rgba(var(--secondary-rgb),0.15) 40%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      {/* Small sharp dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - (isHovering ? 0 : 4),
          y: position.y - (isHovering ? 0 : 4),
          opacity: visible ? (isHovering ? 0 : 1) : 0,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 500, mass: 0.2 }}
        style={{
          width: isHovering ? 0 : 8,
          height: isHovering ? 0 : 8,
          background: 'var(--accent)',
          borderRadius: '50%',
          boxShadow: `0 0 12px rgba(var(--accent-rgb),0.6), 0 0 30px rgba(var(--accent-rgb),0.2)`,
        }}
      />

      {/* Ring follower */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: visible ? (isHovering ? 0.8 : 0.5) : 0,
          scale: isHovering ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150, mass: 0.8 }}
        style={{
          width: 40,
          height: 40,
          border: `1px solid rgba(var(--accent-rgb),0.3)`,
          borderRadius: '50%',
        }}
      />
    </>
  );
}
