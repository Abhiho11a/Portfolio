import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // You must provide this in your frontend/.env file
      // VITE_WEB3FORMS_KEY=your_key_here
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
      
      if (!accessKey) {
        throw new Error('VITE_WEB3FORMS_KEY is missing in your .env file!');
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        onClose();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass-strong rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50/30 dark:bg-zinc-900/30">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Mail size={20} style={{ color: 'var(--accent)' }} />
                Send me a message
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Your Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3.5 top-4 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm focus:border-[var(--accent)] outline-none transition-colors resize-none"
                    placeholder="Hi, I'd like to talk to you about..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 mt-2 disabled:opacity-50 hover:opacity-90"
                style={{
                  background: 'var(--accent)',
                  color: '#09090b',
                  boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.2)',
                }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-zinc-200 dark:border-zinc-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
