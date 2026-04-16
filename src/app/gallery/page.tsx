'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

interface GalleryItem { id: string; url: string; slot: string; alt: string; addedAt?: string; }

export default function GalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

    useEffect(() => {
        fetch('/api/gallery', { cache: 'no-store' })
            .then(r => r.ok ? r.json() : [])
            .then((items: GalleryItem[]) => {
                const list = Array.isArray(items) ? items : [];
                const sorted = list
                    .filter(g => g.slot.startsWith('gallery'))
                    .sort((a, b) => new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime());
                setGallery(sorted);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
            <Navbar />

            {/* Header */}
            <section style={{ paddingTop: 'calc(72px + clamp(3rem,6vw,5rem))', paddingBottom: 'clamp(2rem,4vw,3rem)', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(251,140,0,0.08) 0%, transparent 65%)', borderRadius: '50%' }} />
                </div>
                <div className="container" style={{ position: 'relative' }}>
                    <motion.div initial="hidden" animate="show" variants={stagger} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Our Space</motion.p>
                            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>Photo Gallery</motion.h1>
                        </div>
                        <motion.div variants={fadeUp}>
                            <Link href="/admin" style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                Manage Photos <ChevronRight size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section">
                <div className="container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                            <p style={{ color: 'var(--text-muted)' }}>Loading gallery...</p>
                        </div>
                    ) : gallery.length === 0 ? (
                        <div style={{
                            padding: 'clamp(3rem,8vw,5rem)', textAlign: 'center',
                            background: 'var(--surface)', borderRadius: 'var(--r-xl)',
                            border: '2px dashed var(--border-strong)',
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🖼️</div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>No Gallery Images Yet</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: '1.25rem' }}>
                                Add photos of your school, classrooms, and events via the admin panel.
                            </p>
                            <Link href="/admin" className="btn-primary">Go to Admin Panel</Link>
                        </div>
                    ) : (
                        <>
                            <div style={{ columns: 'auto 280px', columnGap: '1rem' }}>
                                {gallery.map((img, i) => (
                                    <motion.div key={img.id}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        style={{ marginBottom: '1rem', breakInside: 'avoid', cursor: 'pointer' }}
                                        onClick={() => setSelectedImg(img)}
                                    >
                                        <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--surface-3)', lineHeight: 0, position: 'relative' }}>
                                            <img
                                                src={img.url} alt={img.alt}
                                                style={{ width: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                                loading="lazy"
                                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Lightbox */}
                            {selectedImg && (
                                <div
                                    onClick={() => setSelectedImg(null)}
                                    style={{
                                        position: 'fixed', inset: 0, zIndex: 200,
                                        background: 'rgba(0,0,0,0.85)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        padding: '2rem', cursor: 'pointer',
                                    }}
                                >
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        src={selectedImg.url}
                                        alt={selectedImg.alt}
                                        style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 'var(--r-xl)', objectFit: 'contain', boxShadow: '0 16px 64px rgba(0,0,0,0.5)' }}
                                        onClick={e => e.stopPropagation()}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
