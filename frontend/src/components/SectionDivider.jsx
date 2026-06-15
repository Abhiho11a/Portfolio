import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="section-divider"
      />
    </div>
  );
}
