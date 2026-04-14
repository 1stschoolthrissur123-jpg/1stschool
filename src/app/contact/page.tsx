'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBackground from '../components/PageBackground';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const SCHOOL_WHATSAPP = '+919946555972';

const CONTACT_INFO = [
    {
        icon: MapPin, title: 'Location', color: '#E53935',
        lines: ['Nellikunnu', 'Thrissur, Kerala — 680 005'],
        link: 'https://www.google.com/maps/search/1st+School+Nellikunnu+Thrissur+Kerala',
    },
    {
        icon: Clock, title: 'Working Hours', color: '#43A047',
        lines: ['Mon – Fri: 8:30 AM – 3:30 PM', 'Saturday: 9:00 AM – 12:00 PM'],
    },
    {
        icon: Phone, title: 'Phone', color: '#1E88E5',
        lines: ['+91 9946555972'],
        link: 'tel:+919946555972',
    },
    {
        icon: Mail, title: 'Email', color: '#8E24AA',
        lines: ['info@1stschool.in'],
        link: 'mailto:info@1stschool.in',
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({ parentName: '', childName: '', childAge: '', phone: '', program: '', message: '' });
    const [formSent, setFormSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const lines = [
            '🏫 *New Admission Inquiry — 1st School*',
            '',
            `👤 *Parent Name:* ${formData.parentName}`,
            `👶 *Child Name:* ${formData.childName}`,
            `📅 *Child Age:* ${formData.childAge}`,
            `📞 *Phone:* ${formData.phone}`,
            `📚 *Program:* ${formData.program || 'Not specified'}`,
            formData.message ? `💬 *Message:* ${formData.message}` : '',
            '',
            '_Sent via 1st School website_',
        ].filter(Boolean).join('\n');

        const url = `https://wa.me/${SCHOOL_WHATSAPP}?text=${encodeURIComponent(lines)}`;
        window.open(url, '_blank', 'noopener,noreferrer');

        setFormSent(true);
        setTimeout(() => {
            setFormSent(false);
            setFormData({ parentName: '', childName: '', childAge: '', phone: '', program: '', message: '' });
        }, 4000);
    };

    const inputStyle = {
        width: '100%', padding: '0.75rem 1rem',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)', color: 'var(--text)',
        fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
        transition: 'all 0.2s ease', outline: 'none',
    };

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
            <Navbar />

            {/* Header section with 3D Background */}
            <section style={{ paddingTop: 'calc(72px + clamp(3rem,6vw,5rem))', paddingBottom: 'clamp(2rem,4vw,3rem)', position: 'relative', overflow: 'hidden' }}>
                <PageBackground slot="contact-bg" />
                <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                    <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow hero-text-white">
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'white' }}>Get in Touch</motion.p>
                        <motion.h1 variants={fadeUp} style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.25rem', color: 'white' }}>
                            Contact & Enrollment
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-base)', maxWidth: '50ch', margin: '0 auto', color: 'rgba(255,255,255,0.95)' }}>
                            Reach out to schedule a campus visit or begin the enrollment process for your little one.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>

                        {/* Contact Info Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))', gap: '1rem' }}>
                            {CONTACT_INFO.map(item => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bento-card"
                                        style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                                    >
                                        <div style={{
                                            width: 42, height: 42, borderRadius: 'var(--r-md)',
                                            background: `${item.color}15`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            <Icon size={18} color={item.color} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: '0.375rem' }}>{item.title}</div>
                                            {item.lines.map((line, li) => (
                                                item.link && li === 0
                                                    ? <a key={line} href={item.link} style={{ display: 'block', fontSize: 'var(--text-sm)', color: item.color, fontWeight: 600 }}>{line}</a>
                                                    : <div key={line} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>{line}</div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Enrollment Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="bento-card"
                            style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.5rem' }}>
                                Enrollment Inquiry
                            </h3>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                Fill in the details and we'll connect with you on WhatsApp instantly.
                            </p>

                            <AnimatePresence mode="wait">
                                {formSent ? (
                                    <motion.div key="success"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                        style={{ textAlign: 'center', padding: '3rem 1rem' }}
                                    >
                                        <CheckCircle size={48} color="var(--green)" style={{ margin: '0 auto 1rem' }} />
                                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>We'll connect with you on WhatsApp shortly.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: '1rem' }}
                                    >
                                        <div>
                                            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>Parent Name *</label>
                                            <input required value={formData.parentName} onChange={e => setFormData(d => ({ ...d, parentName: e.target.value }))} style={inputStyle} placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>Child&apos;s Name *</label>
                                            <input required value={formData.childName} onChange={e => setFormData(d => ({ ...d, childName: e.target.value }))} style={inputStyle} placeholder="Child's name" />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>Child&apos;s Age</label>
                                            <input value={formData.childAge} onChange={e => setFormData(d => ({ ...d, childAge: e.target.value }))} style={inputStyle} placeholder="e.g. 3 years" />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>Phone Number *</label>
                                            <input required type="tel" value={formData.phone} onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))} style={inputStyle} placeholder="+91 ..." />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>Preferred Program</label>
                                            <select value={formData.program} onChange={e => setFormData(d => ({ ...d, program: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                                                <option value="">Select program...</option>
                                                <option>Playgroup (1.5–2.5 yrs)</option>
                                                <option>Nursery (2.5–3.5 yrs)</option>
                                                <option>Montessori (2.5–5 yrs)</option>
                                                <option>LKG (3.5–4.5 yrs)</option>
                                                <option>UKG (4.5–5.5 yrs)</option>
                                            </select>
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>Message</label>
                                            <textarea value={formData.message} onChange={e => setFormData(d => ({ ...d, message: e.target.value }))} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Any specific queries or requirements..." />
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <button type="submit" className="btn-rainbow" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: 'var(--text-sm)' }}>
                                                <MessageCircle size={16} /> Send via WhatsApp
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Map */}

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
