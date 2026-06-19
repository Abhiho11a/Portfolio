import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { usePortfolioData } from '../DataContext';
import ContactModal from './ContactModal';

export default function Contact() {
  const { data, loading } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactData = data?.contact;

  if (loading || !contactData) return null;

  return (
    <section id="contact" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>&lt;connect /&gt;</span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Let's Build Something <span className="text-gradient">Together</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl mx-auto">
            {contactData.availability?.join(', ') || 'Open for new opportunities. Let\'s talk.'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-8 md:p-10 border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button onClick={() => setIsModalOpen(true)} className="w-full group flex items-center gap-3 p-4 rounded-xl bg-zinc-50/40 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all text-left">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb), 0.1)' }}>
                <Mail size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 block">Email Me</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">Send a direct message</span>
              </div>
              <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-[var(--accent)] transition-colors" />
            </button>
            <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 rounded-xl bg-zinc-50/40 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 hover:border-[var(--secondary)]/30 hover:bg-[var(--secondary)]/5 transition-all">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(var(--secondary-rgb), 0.1)' }}>
                <Send size={18} style={{ color: 'var(--secondary)' }} />
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 block">LinkedIn</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">Connect with me</span>
              </div>
              <ArrowUpRight size={14} className="ml-auto text-zinc-600 group-hover:text-[var(--secondary)] transition-colors" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">
            <MapPin size={14} style={{ color: 'var(--accent)' }} />
            <span>{contactData.location}</span>
          </div>
        </motion.div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
