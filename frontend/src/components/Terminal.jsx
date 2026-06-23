import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../DataContext';

/* ─── BOOT SEQUENCE ─── */
const bootSequence = [
  { type: 'prompt', text: 'guest@portfolio:~$ ', cmd: 'execute interview_mode.sh' },
  { type: 'output', text: '' },
  { type: 'system', text: '⚡ Loading neural weights...' },
  { type: 'system', text: '🔗 Connecting to vector database...' },
  { type: 'system', text: '✅ RAG pipeline initialized' },
  { type: 'output', text: '' },
  { type: 'success', text: '🤖 Welcome to the Interactive Terminal!' },
  { type: 'text', text: '   Type "help" to see all available commands.' },
  { type: 'output', text: '' },
];

export default function TerminalUI() {
  const { data, loading } = usePortfolioData();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [booted, setBooted] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Boot animation
  useEffect(() => {
    if (bootIndex < bootSequence.length) {
      const timer = setTimeout(() => setBootIndex((p) => p + 1), 150);
      return () => clearTimeout(timer);
    } else {
      setBooted(true);
    }
  }, [bootIndex]);

  // Auto-scroll inside container only
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, bootIndex]);

  if (loading) return null;

  /* ─── DYNAMIC COMMAND DATABASE ─── */
  const commandResponses = {
    help: {
      lines: [
        { type: 'info', text: '📋 Available commands:' },
        { type: 'cmd', text: '  help              → Show all commands' },
        { type: 'cmd', text: '  whoami            → About me' },
        { type: 'cmd', text: '  skills            → View technical expertise' },
        { type: 'cmd', text: '  projects          → Browse portfolio projects' },
        { type: 'cmd', text: '  education         → Academic background' },
        { type: 'cmd', text: '  achievements      → Hackathons & Events' },
        { type: 'cmd', text: '  experience        → What I\'m building now' },
        { type: 'cmd', text: '  contact           → Get in touch' },
        { type: 'cmd', text: '  resume            → Download my resume' },
        { type: 'cmd', text: '  tech-stack        → View this site\'s stack' },
        { type: 'cmd', text: '  clear             → Clear the terminal' },
        { type: 'cmd', text: '  sudo hire-me      → 😏' },
      ],
    },
    whoami: {
      lines: [
        { type: 'success', text: `👋 Hey! I'm ${data?.hero?.name || 'Abhishek'}.` },
        { type: 'output', text: '' },
        { type: 'info', text: `   ${data?.hero?.tagline || 'Full-Stack Developer'}` },
        { type: 'info', text: `   Based in ${data?.hero?.location || 'Bengaluru, India'}` },
        { type: 'output', text: '' },
        { type: 'text', text: `   ${data?.hero?.description || 'I build scalable web apps.'}` },
        { type: 'text', text: `   ${data?.hero?.status || 'Open for Placements'}` },
        { type: 'output', text: '' },
        { type: 'text', text: '   When I\'m not coding, I\'m probably at a hackathon 🚀' },
      ],
    },
    skills: {
      lines: [
        { type: 'success', text: '⚡ Technical Skills' },
        { type: 'output', text: '' },
        ...(data?.skills?.map(cat => [
          { type: 'info', text: `   ┌─ ${cat.label.padEnd(28, '─')}┐` },
          ...(cat.skills.map(skill => (
            { type: 'text', text: `   │ ${skill.name.padEnd(15)} ${'█'.repeat(Math.floor(skill.level/10))}${'░'.repeat(10-Math.floor(skill.level/10))} ${skill.level}%           │` }
          ))),
          { type: 'info', text: '   └──────────────────────────────────────┘' },
          { type: 'output', text: '' },
        ]).flat() || []),
      ],
    },
    projects: {
      lines: [
        { type: 'success', text: '🔬 Featured Projects' },
        { type: 'output', text: '' },
        ...(data?.projects?.map((proj, i) => [
          { type: 'info', text: `   ${i + 1}. ${proj.title} — ${proj.tagline}` },
          { type: 'text', text: `      ${proj.techStack?.join(' + ')}` },
          { type: 'output', text: '' },
        ]).flat() || []),
        { type: 'text', text: '   → Scroll up to #projects for live demos' },
      ],
    },
    education: {
      lines: [
        { type: 'success', text: '🎓 Academic Background' },
        { type: 'output', text: '' },
        ...(data?.education?.map(edu => [
          { type: 'info', text: `   ┌─ ${edu.level.padEnd(31, '─')}┐` },
          { type: 'text', text: `   │ ${edu.duration.padEnd(31)}│` },
          { type: 'text', text: `   │ ${edu.institution.padEnd(31)}│` },
          { type: 'text', text: `   │ Score: ${edu.score.padEnd(24)}│` },
          { type: 'info', text: '   └──────────────────────────────────────┘' },
          { type: 'output', text: '' },
        ]).flat() || []),
      ],
    },
    achievements: {
      lines: [
        { type: 'success', text: '🏆 Hackathons & Events' },
        { type: 'output', text: '' },
        ...(data?.achievements?.hackathons?.map(hack => [
          { type: 'warn', text: `   ${hack.trophy} ${hack.title}` },
          { type: 'text', text: `      Built project @ ${hack.location}` },
          { type: 'output', text: '' },
        ]).flat() || []),
        ...(data?.achievements?.events?.map(event => [
          { type: 'info', text: `   ${event.mood} ${event.title}` },
          { type: 'text', text: `      ${event.type} @ ${event.location}` },
          { type: 'output', text: '' },
        ]).flat() || []),
      ],
    },
    experience: {
      lines: [
        { type: 'success', text: '🚀 Currently Building' },
        { type: 'output', text: '' },
        ...(data?.currentlyBuilding?.map(proj => [
          { type: 'info', text: `   ● ${proj.title.padEnd(25, '.')} ${proj.progress}%` },
          { type: 'text', text: `     ${proj.techStack?.join(' + ')}` },
          { type: 'output', text: '' },
        ]).flat() || []),
      ],
    },
    contact: {
      lines: [
        { type: 'success', text: '📬 Let\'s Connect!' },
        { type: 'output', text: '' },
        { type: 'info', text: `   ✉  Email    → ${data?.contact?.email || ''}` },
        { type: 'info', text: `   🔗 LinkedIn → ${data?.contact?.linkedin || ''}` },
        { type: 'info', text: `   🐙 GitHub   → ${data?.contact?.github || ''}` },
        { type: 'output', text: '' },
        { type: 'text', text: `   Open for: ${data?.contact?.availability?.join(' • ') || ''}` },
        { type: 'text', text: `   Location: ${data?.contact?.location || ''}` },
      ],
    },
    resume: {
      lines: [
        { type: 'success', text: '📄 Resume' },
        { type: 'output', text: '' },
        { type: 'text', text: '   Opening resume in a new tab...' },
        { type: 'info', text: '   → /resume.pdf' },
        { type: 'output', text: '' },
      ],
      action: () => window.open('/resume.pdf', '_blank'),
    },
    'tech-stack': {
      lines: [
        { type: 'success', text: '🛠  This Portfolio\'s Tech Stack' },
        { type: 'output', text: '' },
        { type: 'info', text: '   Framework    → React 19 + Vite + React Router' },
        { type: 'info', text: '   Backend      → Node.js + Express + MongoDB Atlas' },
        { type: 'info', text: '   Styling      → Tailwind CSS' },
        { type: 'info', text: '   Animations   → Framer Motion' },
        { type: 'info', text: '   Icons        → Lucide React' },
        { type: 'output', text: '' },
      ],
    },
    'sudo hire-me': {
      lines: [
        { type: 'output', text: '' },
        { type: 'success', text: '   ╔══════════════════════════════════════╗' },
        { type: 'success', text: '   ║                                      ║' },
        { type: 'success', text: '   ║   ✅  ACCESS GRANTED                 ║' },
        { type: 'success', text: '   ║                                      ║' },
        { type: 'success', text: '   ║   You\'ve found the easter egg!       ║' },
        { type: 'success', text: '   ║   I\'m ready to join your team 🚀     ║' },
        { type: 'success', text: '   ║                                      ║' },
        { type: 'success', text: '   ║   Let\'s build something amazing.     ║' },
        { type: 'success', text: '   ║                                      ║' },
        { type: 'success', text: '   ╚══════════════════════════════════════╝' },
        { type: 'output', text: '' },
      ],
    },
  };

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add the prompt line
    const newLines = [{ type: 'prompt', text: 'guest@portfolio:~$ ', cmd: rawCmd }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const response = commandResponses[cmd];
    if (response) {
      newLines.push(...response.lines);
      if (response.action) response.action();
    } else {
      newLines.push(
        { type: 'error', text: `  bash: ${rawCmd}: command not found` },
        { type: 'text', text: '  Type "help" for available commands.' },
      );
    }

    newLines.push({ type: 'output', text: '' });
    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleCommand(input);
    }
  };

  const getLineProps = (type) => {
    switch (type) {
      case 'prompt': return { className: '', style: { color: 'var(--accent)' } };
      case 'system': return { className: 'text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500', style: {} };
      case 'success': return { className: 'font-medium', style: { color: 'var(--accent)' } };
      case 'info': return { className: '', style: { color: 'var(--secondary)' } };
      case 'warn': return { className: '', style: { color: 'var(--tertiary)' } };
      case 'error': return { className: 'text-red-400', style: {} };
      case 'cmd': return { className: 'text-zinc-600 dark:text-zinc-400', style: {} };
      case 'text': return { className: 'text-zinc-600 dark:text-zinc-400', style: {} };
      default: return { className: 'text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500', style: {} };
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <section id="terminal" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-xs font-mono tracking-widest uppercase mb-3 block" style={{ color: 'var(--tertiary)' }}>&lt;terminal /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">Interactive <span className="text-gradient">Console</span></h2>
          <p className="text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 mt-2">Try typing <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono" style={{ color: 'var(--accent)' }}>help</code> to explore</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)] transition-shadow duration-500"
          onClick={focusInput}
        >
          {/* Mac Window Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 dark:text-zinc-500 font-mono">portfolio — bash — 80×24</span>
            <span className="ml-auto text-[10px] text-zinc-600 font-mono hidden sm:block">interactive mode</span>
          </div>

          {/* Terminal Body */}
          <div ref={containerRef} className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed min-h-[360px] max-h-[500px] overflow-y-auto overflow-x-auto bg-white/50 dark:bg-zinc-950/50 cursor-text scrollbar-hide">
            {/* Boot sequence */}
            {bootSequence.slice(0, bootIndex).map((line, i) => {
              const props = getLineProps(line.type);
              return (
                <div key={`boot-${i}`} className={`${props.className} ${line.type === 'output' ? 'h-3' : ''}`} style={props.style}>
                  {line.type === 'prompt' ? (
                    <span><span style={{ color: 'var(--accent)' }}>{line.text}</span><span className="text-zinc-900 dark:text-zinc-100">{line.cmd}</span></span>
                  ) : (
                    <span style={{ whiteSpace: 'pre' }}>{line.text}</span>
                  )}
                </div>
              );
            })}

            {/* Command history */}
            {history.map((line, i) => {
              const props = getLineProps(line.type);
              return (
                <div key={`hist-${i}`} className={`${props.className} ${line.type === 'output' ? 'h-3' : ''}`} style={props.style}>
                  {line.type === 'prompt' ? (
                    <span><span style={{ color: 'var(--accent)' }}>{line.text}</span><span className="text-zinc-900 dark:text-zinc-100">{line.cmd}</span></span>
                  ) : (
                    <span style={{ whiteSpace: 'pre' }}>{line.text}</span>
                  )}
                </div>
              );
            })}

            {/* Active input line */}
            {booted && (
              <div className="flex items-center">
                <span style={{ color: 'var(--accent)' }}>guest@portfolio:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 outline-none border-none font-mono text-sm"
                  style={{ caretColor: 'var(--accent)' }}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="w-2 h-4 opacity-80 animate-blink" style={{ background: 'var(--accent)' }} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
