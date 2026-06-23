import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, User, Terminal, ArrowRight, Shield } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      localStorage.setItem('admin-token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-screen blur-[120px] opacity-10" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full mix-blend-screen blur-[120px] opacity-10" style={{ background: 'var(--tertiary)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        className="w-full max-w-md"
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="glass-strong rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.2)' }}>
                <Shield size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">Admin Access</h1>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">portfolio://admin/auth</p>
              </div>
            </div>
          </div>

          {/* Terminal-style divider */}
          <div className="px-8 py-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800/40">
              <Terminal size={13} style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500">
                <span style={{ color: 'var(--accent)' }}>admin@portfolio</span>:~$ authenticate
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm font-mono placeholder-zinc-600 outline-none transition-all duration-300"
                  style={{ '--tw-ring-color': 'var(--accent)' }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(var(--accent-rgb), 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(63, 63, 70, 0.5)'}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm font-mono placeholder-zinc-600 outline-none transition-all duration-300"
                  onFocus={(e) => e.target.style.borderColor = 'rgba(var(--accent-rgb), 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(63, 63, 70, 0.5)'}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-50"
              style={{
                background: 'var(--accent)',
                color: '#09090b',
                boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.3)',
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-zinc-200 dark:border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Back to portfolio */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors font-mono">
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}
