'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Palette, Music, TreePine, Users, Clock,
    Star, ChevronRight, Heart, Sparkles, GraduationCap, Baby, X
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const PROGRAMS = [
    {
        title: 'Playgroup',
        age: '2 years',
        color: '#E53935',
        bg: 'rgba(229,57,53,0.1)',
        icon: Baby,
        emoji: '🧸',
        features: ['Sensory Exploration', 'Social Interaction', 'Motor Skill Development', 'Story Time & Songs', 'Safe Play Environment'],
        desc: 'A gentle introduction to structured learning through play, designed for toddlers to explore, discover, and develop early social skills in a safe, nurturing environment.',
        featured: false,
    },
    {
        title: 'Nursery (PreKG)',
        age: '3 years',
        color: '#1E88E5',
        bg: 'rgba(30,136,229,0.1)',
        icon: Sparkles,
        emoji: '🌈',
        features: ['Creative Arts & Crafts', 'Pre-Reading Activities', 'Number Basics', 'Outdoor Play', 'Circle Time'],
        desc: 'Building foundational skills through hands-on activities, creative arts, and guided play. Children develop curiosity, language, and pre-literacy skills.',
        featured: true,
    },

    {
        title: 'LKG (KG1)',
        age: '4 years',
        color: '#43A047',
        bg: 'rgba(67,160,71,0.1)',
        icon: Palette,
        emoji: '🎨',
        features: ['Phonics & Reading', 'Basic Mathematics', 'Science Discovery', 'Art & Music', 'Physical Education'],
        desc: 'A structured yet joyful learning experience where children begin formal academics while maintaining the magic of play and creative exploration.',
        featured: false,
    },
    {
        title: 'UKG (KG2)',
        age: '5 years',
        color: '#FB8C00',
        bg: 'rgba(251,140,0,0.1)',
        icon: GraduationCap,
        emoji: '🎓',
        features: ['Advanced Literacy', 'Math Operations', 'Environmental Studies', 'Computer Awareness', 'School Readiness Program'],
        desc: 'Comprehensive preparation for primary school with strong foundations in literacy, numeracy, and social skills. We ensure your child transitions with confidence.',
        featured: false,
    },
];

const APPROACH = [
    { icon: Heart, title: 'Child-Centered', desc: "Every activity is designed around the child's interests and developmental stage.", color: '#E53935' },
    { icon: Users, title: 'Small Groups', desc: 'Low student-teacher ratio ensures personalized attention for every child.', color: '#1E88E5' },
    { icon: TreePine, title: 'Nature-Based', desc: 'Outdoor activities and nature exploration are integral to our curriculum.', color: '#43A047' },
    { icon: Music, title: 'Arts Integrated', desc: 'Music, dance, drama, and art are woven into everyday learning.', color: '#8E24AA' },
];

export default function ProgramsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [selectedVideo, setSelectedVideo] = useState<{ name: string, url: string } | null>(null);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.ok ? res.json() : {})
            .then(data => setSettings(data))
            .catch(console.error);
    }, []);

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
            <Navbar />

            {/* Header section with 3D Background */}
            <section style={{ paddingTop: 'calc(72px + clamp(3rem,6vw,5rem))', paddingBottom: 'clamp(2rem,4vw,3rem)', position: 'relative', overflow: 'hidden' }}>
                <PageBackground slot="programs-bg" />
                <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                    <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow hero-text-white">
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'white' }}>Our Programs</motion.p>
                        <motion.h1 variants={fadeUp} style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.25rem', color: 'white' }}>
                            Learning Programs for Every Age
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.95)' }}>
                            From playgroup to UKG, we offer age-appropriate programs that nurture curiosity, creativity, and confidence in every child.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="section">
                <div className="container">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {PROGRAMS.map((p, i) => {
                            const Icon = p.icon;
                            const isEven = i % 2 === 0;
                            return (
                                <motion.div key={p.title} variants={fadeUp} className="bento-card"
                                    style={{
                                        padding: 'clamp(1.5rem,3vw,2.5rem)',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr',
                                        gap: '1.5rem',
                                        borderLeft: `4px solid ${p.color}`,
                                    }}>
                                    <div>
                                        {/* Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{
                                                width: 52, height: 52, borderRadius: 'var(--r-lg)',
                                                background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <Icon size={26} color={p.color} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem,2vw,1.5rem)', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {p.emoji} {p.title}
                                                    {p.featured && (
                                                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: p.color, background: p.bg, padding: '0.2rem 0.6rem', borderRadius: 'var(--r-full)' }}>Popular</span>
                                                    )}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                                                    <span style={{ fontSize: 'var(--text-xs)', color: p.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <Clock size={12} /> Age: {p.age}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{p.desc}</p>

                                        {/* Features */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {p.features.map(f => {
                                                const videoUrl = settings[f];
                                                const isClickable = !!videoUrl;
                                                return (
                                                    <button key={f}
                                                        onClick={() => isClickable && setSelectedVideo({ name: f, url: videoUrl })}
                                                        style={{
                                                            padding: '0.375rem 0.875rem', borderRadius: 'var(--r-full)',
                                                            background: p.bg, fontSize: 'var(--text-xs)', color: p.color, fontWeight: 600,
                                                            border: `1px solid ${p.color}22`,
                                                            cursor: isClickable ? 'pointer' : 'default',
                                                            transform: 'scale(1)',
                                                            transition: 'transform 0.2s, filter 0.2s',
                                                            filter: isClickable ? 'brightness(1.05)' : 'none',
                                                        }}
                                                        onMouseOver={e => isClickable && (e.currentTarget.style.transform = 'scale(1.05)')}
                                                        onMouseOut={e => isClickable && (e.currentTarget.style.transform = 'scale(1)')}
                                                    >
                                                        {f} {isClickable && '▶'}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Our Approach</motion.p>
                        <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>How We Teach</motion.h2>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))', gap: '1rem' }}>
                        {APPROACH.map(a => {
                            const Icon = a.icon;
                            return (
                                <motion.div key={a.title} variants={fadeUp} className="neu-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div style={{
                                        width: 56, height: 56, borderRadius: 'var(--r-full)',
                                        background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1rem',
                                    }}>
                                        <Icon size={24} color={a.color} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-base)', marginBottom: '0.5rem', color: 'var(--text)' }}>{a.title}</h3>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', marginBottom: '1rem' }}>
                            Ready to Enroll Your Little One?
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '45ch', margin: '0 auto 2rem' }}>
                            Schedule a campus visit or start the admission process today!
                        </p>
                        <Link href="/contact" className="btn-rainbow" style={{ padding: '0.875rem 2rem' }}>
                            Start Enrollment <ChevronRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 100,
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: 'var(--surface)', borderRadius: 'var(--r-lg)',
                                width: '100%', maxWidth: '800px', overflow: 'hidden',
                                display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                                <h3 style={{ fontWeight: 600 }}>{selectedVideo.name}</h3>
                                <button onClick={() => setSelectedVideo(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: 'black' }}>
                                {selectedVideo.url.includes('youtube.com') || selectedVideo.url.includes('youtu.be') ? (
                                    <iframe
                                        src={selectedVideo.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={selectedVideo.url}
                                        controls
                                        autoPlay
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
