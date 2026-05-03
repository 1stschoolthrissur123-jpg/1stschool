'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Users, Award, BookOpen, Heart, Star, Target, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';
import ThinkTankers from '../components/ThinkTankers';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

interface GalleryItem { id: string; url: string; slot: string; alt: string; }

const VALUES = [
    { icon: Heart, title: 'Compassion', desc: 'Every child is treated with love, respect, and understanding.', color: '#E53935' },
    { icon: Star, title: 'Excellence', desc: 'We strive for the highest quality in education and care.', color: '#FDD835' },
    { icon: Shield, title: 'Safety', desc: 'A secure and protected environment for every child.', color: '#1E88E5' },
    { icon: Users, title: 'Community', desc: 'Building strong bonds between children, parents, and teachers.', color: '#43A047' },
    { icon: BookOpen, title: 'Innovation', desc: 'Modern teaching methods blended with timeless values.', color: '#8E24AA' },
    { icon: Target, title: 'Growth', desc: 'Nurturing each child to reach their full potential.', color: '#FB8C00' },
];

const FEATURES = [
    'CCTV-monitored classrooms',
    'Air-conditioned learning spaces',
    'Dedicated play areas & gardens',
    'Montessori materials & equipment',
    'Safe Transportation',
    'Regular parent-teacher meetings',
    'Musical-morning assemblies',
    'Splash pool',
];

export default function AboutPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);

    useEffect(() => {
        fetch('/api/gallery', { cache: 'no-store' })
            .then(r => r.ok ? r.json() : [])
            .then((items: GalleryItem[]) => setGallery(items))
            .catch(() => { });
    }, []);

    const aboutImg = Array.isArray(gallery) ? gallery.find(g => g.slot === 'about') : undefined;

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
            <Navbar />

            {/* Header section with 3D Background */}
            <section style={{ paddingTop: 'calc(72px + clamp(3rem,6vw,5rem))', paddingBottom: 'clamp(2rem,4vw,3rem)', position: 'relative', overflow: 'hidden' }}>
                <PageBackground slot="about-bg" />
                <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                    <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow hero-text-white">
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'white' }}>About Us</motion.p>
                        <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', marginBottom: '1rem', lineHeight: 1.1, color: 'white' }}>
                            Our Story & Mission
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-base)', maxWidth: '55ch', margin: '0 auto', color: 'rgba(255,255,255,0.95)' }}>
                            Discover the heart behind 1st School — where passion for early childhood education meets decades of experience.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'center' }}>
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Image */}
                            <motion.div variants={fadeUp} style={{ borderRadius: 'var(--r-2xl)', overflow: 'hidden', aspectRatio: '16/9', background: 'var(--surface-2)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
                                {aboutImg ? (
                                    <img src={aboutImg.url} alt={aboutImg.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '2rem', background: 'var(--rainbow-soft)' }}>
                                        <div style={{ fontSize: '3rem' }}>🏫</div>
                                        <div style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>School image — add via Admin panel</div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Vision & Mission */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.25rem' }}>
                                <motion.div variants={fadeUp} className="glass-card" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'rgba(30,136,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Eye size={20} color="#1E88E5" />
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: '#1E88E5' }}>Our Vision</h3>
                                    </div>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                        To be the most trusted and admired early childhood education center in Kerala — a place where children discover the joy of learning, develop lifelong values, and grow into confident, compassionate individuals.
                                    </p>
                                </motion.div>

                                <motion.div variants={fadeUp} className="glass-card" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'rgba(229,57,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Target size={20} color="#E53935" />
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: '#E53935' }}>Our Mission</h3>
                                    </div>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                        To provide a nurturing, inclusive, and stimulating environment where every child receives personalized attention, develops holistically, and builds strong foundations for academic and personal success.
                                    </p>
                                </motion.div>
                            </div>

                            {/* Story text */}
                            <motion.div variants={fadeUp}>
                                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
                                    Founded with a passion for early childhood education, <strong style={{ color: 'var(--text)' }}>1st School</strong> has been a beacon of quality preschool learning in Thrissur's Ayyanthole and Nellikunnu areas. We believe that the first years of a child's life are the most crucial for building character, curiosity, and a love for learning.
                                </p>
                                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.75 }}>
                                    Our team of experienced educators combines the Montessori philosophy with modern pedagogical practices to create an environment where children thrive. Every classroom is designed to spark imagination, every activity crafted to develop essential skills, and every interaction rooted in care and respect.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ThinkTankers */}
            <ThinkTankers />

            {/* Values */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Our Values</motion.p>
                        <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>What We Stand For</motion.h2>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))', gap: '1rem' }}>
                        {VALUES.map(v => {
                            const Icon = v.icon;
                            return (
                                <motion.div key={v.title} variants={fadeUp} className="bento-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 'var(--r-full)',
                                        background: `${v.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 0.75rem',
                                    }}>
                                        <Icon size={22} color={v.color} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '0.375rem' }}>{v.title}</h3>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{v.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Facilities */}
            <section className="section">
                <div className="container">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Facilities</motion.p>
                        <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>World-Class Infrastructure</motion.h2>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))', gap: '0.75rem', maxWidth: '700px', margin: '0 auto' }}>
                        {FEATURES.map(f => (
                            <motion.div key={f} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', background: 'var(--surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                                <div style={{ width: 24, height: 24, borderRadius: 'var(--r-full)', background: 'rgba(67,160,71,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Check size={13} color="#43A047" strokeWidth={2.5} />
                                </div>
                                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{f}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link href="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600 }}>
                            View Our Gallery <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
