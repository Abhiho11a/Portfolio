import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Prof. Ramesh K.',
    role: 'HOD, CSE Department',
    relation: 'Academic Mentor',
    text: 'One of the most driven students I\'ve mentored. His ability to bridge theoretical CS concepts with production-grade implementations is remarkable. The SimplifiED platform he built showcases a maturity well beyond his academic level.',
    rating: 5,
    avatar: 'RK',
    color: '#10B981',
  },
  {
    id: 2,
    name: 'Aditya Sharma',
    role: 'SDE-2, Microsoft',
    relation: 'Hackathon Team Lead',
    text: 'Collaborated with Abhishek during HackRevolution. His full-stack skills and speed of execution are exceptional. He single-handedly built the real-time monitoring pipeline while the rest of us handled frontend. Absolute team asset.',
    rating: 5,
    avatar: 'AS',
    color: '#06B6D4',
  },
  {
    id: 3,
    name: 'Sneha Patel',
    role: 'ML Engineer, Flipkart',
    relation: 'Project Collaborator',
    text: 'Working with Abhishek on the RAG Codebase Q&A engine was a great experience. His understanding of vector databases and retrieval systems is impressive. He writes clean, well-documented code and communicates ideas clearly.',
    rating: 5,
    avatar: 'SP',
    color: '#8B5CF6',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(timerRef.current);
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startAutoPlay();
  };

  const prev = () => goTo(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => goTo((current + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-cyber-purple tracking-widest uppercase mb-3 block">
            &lt;social_proof /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
            What People <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-10 border border-zinc-800/60 relative overflow-hidden"
        >
          {/* Background Quote Mark */}
          <Quote size={120} className="absolute top-4 right-4 text-zinc-800/20 rotate-180" />

          <div className="relative z-10">
            {/* Testimonial Text */}
            <motion.p
              key={t.id}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8 italic"
            >
              "{t.text}"
            </motion.p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Author Row */}
            <div className="flex items-center justify-between">
              <motion.div
                key={t.id + '-author'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${t.color}20`, color: t.color, border: `2px solid ${t.color}40` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <span className="block text-sm font-semibold text-zinc-100">{t.name}</span>
                  <span className="block text-xs text-zinc-500">{t.role}</span>
                  <span className="block text-[11px] font-mono" style={{ color: t.color }}>{t.relation}</span>
                </div>
              </motion.div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button onClick={prev} className="w-9 h-9 rounded-full glass border border-zinc-800/50 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next} className="w-9 h-9 rounded-full glass border border-zinc-800/50 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === current ? testimonials[current].color : 'rgba(113,113,122,0.3)',
                    transform: i === current ? 'scale(1.5)' : 'scale(1)',
                    boxShadow: i === current ? `0 0 8px ${testimonials[current].color}60` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
