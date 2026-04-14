'use client';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, Users, Award, BookOpen, Palette,
  Music, TreePine, Sparkles, GraduationCap, ChevronRight, Quote,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroBackground from './components/HeroBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const STATS = [
  { num: '10+', label: 'Years of Excellence', color: '#E53935' },
  { num: '500+', label: 'Happy Students', color: '#1E88E5' },
  { num: '30+', label: 'Expert Teachers', color: '#43A047' },
  { num: '5★', label: 'Parent Rating', color: '#FB8C00' },
];

const HIGHLIGHTS = [
  { icon: BookOpen, title: 'Montessori Method', desc: 'Hands-on learning fostering independence and curiosity.', color: '#E53935', bg: 'rgba(229,57,53,0.1)' },
  { icon: Palette, title: 'Arts & Creativity', desc: 'Painting, crafts, and creative expression every day.', color: '#8E24AA', bg: 'rgba(142,36,170,0.1)' },
  { icon: Music, title: 'Music & Movement', desc: 'Rhythm, dance, and musical exploration for joy.', color: '#1E88E5', bg: 'rgba(30,136,229,0.1)' },
  { icon: TreePine, title: 'Outdoor Play', desc: 'Nature-based activities in our green campus.', color: '#43A047', bg: 'rgba(67,160,71,0.1)' },
  { icon: Sparkles, title: 'STEM Activities', desc: 'Early science, math, and exploration programs.', color: '#FB8C00', bg: 'rgba(251,140,0,0.1)' },
  { icon: GraduationCap, title: 'School Readiness', desc: 'Preparing for primary school with confidence.', color: '#FDD835', bg: 'rgba(253,216,53,0.15)' },
];

const TESTIMONIALS = [
  { name: 'Anitha S.', role: 'Parent of Arun (LKG)', text: 'My son has blossomed since joining 1st School. The teachers are incredibly caring and the Montessori approach really works!', rating: 5 },
  { name: 'Rajesh K.', role: 'Parent of Meera (Nursery)', text: 'The best decision we made for our daughter. She loves going to school every day and comes home excited about what she learned.', rating: 5 },
  { name: 'Priya M.', role: 'Parent of Arjun (UKG)', text: 'Excellent infrastructure, wonderful teachers, and a curriculum that perfectly balances learning with play. Highly recommend!', rating: 5 },
];

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <Navbar />

      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        {/* 3D Parallax Hero Background (from Admin > Hero Banner slot) */}
        <HeroBackground />

        {/* CSS blob fallback — shows when no hero image is uploaded */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', background: 'radial-gradient(circle, rgba(229,57,53,0.12) 0%, transparent 65%)', borderRadius: '60% 40% 30% 70%', animation: 'blob 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 'clamp(250px,40vw,500px)', height: 'clamp(250px,40vw,500px)', background: 'radial-gradient(circle, rgba(30,136,229,0.1) 0%, transparent 65%)', borderRadius: '30% 60% 70% 40%', animation: 'blob 10s ease-in-out infinite reverse' }} />
          <div style={{ position: 'absolute', top: '40%', left: '30%', width: 'clamp(150px,25vw,300px)', height: 'clamp(150px,25vw,300px)', background: 'radial-gradient(circle, rgba(253,216,53,0.1) 0%, transparent 65%)', borderRadius: '50%', animation: 'blob 12s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '20%', right: '20%', width: 'clamp(100px,15vw,200px)', height: 'clamp(100px,15vw,200px)', background: 'radial-gradient(circle, rgba(67,160,71,0.08) 0%, transparent 65%)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }} />
        </div>

        <div className="container section" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>
            {/* Content */}
            <motion.div initial="hidden" animate="show" variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.5vw,1.75rem)', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.375rem 1rem', borderRadius: 'var(--r-full)',
                  background: 'var(--accent-bg)', border: '1px solid var(--accent-ring)',
                  fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  🌟 Admissions Open 2026-27
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1,
                fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
                letterSpacing: '-0.01em',
              }}>
                Where{' '}
                <span style={{ color: '#E53935' }}>Little</span>{' '}
                <span style={{ color: '#1E88E5' }}>Minds</span>{' '}
                Grow{' '}
                <span style={{ color: '#43A047' }}>Big</span>{' '}
                <span style={{ color: '#FB8C00' }}>Dreams</span>
              </motion.h1>

              {/* Desc */}
              <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '60ch', margin: '0 auto' }}>
                Welcome to 1st School — a nurturing preschool and Montessori in Thrissur where every child's unique potential is celebrated through play-based learning and creative exploration.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
                <Link href="/contact" className="btn-rainbow" style={{ fontSize: 'var(--text-sm)', padding: '0.875rem 2rem' }}>
                  Apply for Admission <ArrowRight size={16} />
                </Link>
                <Link href="/programs" className="btn-ghost" style={{ fontSize: 'var(--text-sm)' }}>
                  Explore Programs
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeUp} style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem',
                paddingTop: '1.5rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem',
              }}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', color: s.color, lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating emoji decorations */}
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', left: '5%', fontSize: '2.5rem', opacity: 0.6 }}>🎨</motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', bottom: '25%', right: '8%', fontSize: '2.5rem', opacity: 0.6 }}>📚</motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', top: '60%', left: '10%', fontSize: '2rem', opacity: 0.5 }}>🌈</motion.div>
      </section>

      {/* ═══ HIGHLIGHTS ═════════════════════════════════ */}
      <section style={{ background: 'var(--surface)' }} className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger} style={{ marginBottom: 'clamp(2rem,4vw,3.5rem)', textAlign: 'center' }}>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              Why Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)', marginBottom: '1rem' }}>
              A World of Learning Awaits
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', maxWidth: '55ch', margin: '0 auto' }}>
              Our holistic approach combines the best of Montessori and play-based methodologies to unlock every child's potential.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '1rem' }}>
            {HIGHLIGHTS.map(h => {
              const Icon = h.icon;
              return (
                <motion.div key={h.title} variants={fadeUp} className="bento-card" style={{ padding: '1.5rem' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 'var(--r-md)',
                    background: h.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
                  }}>
                    <Icon size={24} color={h.color} strokeWidth={2} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', marginBottom: '0.5rem', color: 'var(--text)' }}>{h.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'var(--text-muted)' }}>{h.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600 }}>
              View All Programs <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══════════════════════════════ */}
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger} style={{ marginBottom: 'clamp(2rem,4vw,3.5rem)', textAlign: 'center' }}>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>
              What Parents Say
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1.25rem' }}>
            {TESTIMONIALS.map((t, i) => {
              const colors = ['#E53935', '#1E88E5', '#43A047'];
              return (
                <motion.div key={t.name} variants={fadeUp} className="glass-card"
                  style={{ padding: 'clamp(1.5rem,3vw,2rem)', position: 'relative' }}>
                  <Quote size={32} style={{ color: colors[i], opacity: 0.15, position: 'absolute', top: '1rem', right: '1rem' }} />
                  <div style={{ display: 'flex', marginBottom: '0.75rem' }}>
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill={colors[i]} color={colors[i]} />)}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>{t.role}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═════════════════════════════════ */}
      <section style={{ background: 'var(--rainbow)', padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', color: 'white', marginBottom: '1rem' }}>
              Give Your Child the Best Start in Life
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '50ch', margin: '0 auto 2rem' }}>
              Admissions are now open for the 2026-27 academic year. Limited seats available — secure your child's spot today!
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', background: 'white', color: '#1A1A1A',
              borderRadius: 'var(--r-full)', fontWeight: 700, fontSize: 'var(--text-sm)',
              transition: 'all 0.25s ease', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>
              Start Enrollment <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
