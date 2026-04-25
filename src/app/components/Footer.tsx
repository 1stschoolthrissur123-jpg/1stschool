'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const FooterLinks = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
];

const SocialLinks = [
    {
        label: 'Facebook', href: "https://www.facebook.com/1stschoolthrissur/", icon: () => (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
        )
    },
    {
        label: 'Instagram', href: "https://www.instagram.com/1stschoolthrissur/", icon: () => (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    },
    {
        label: 'YouTube', href: "https://www.youtube.com/@1stschool716", icon: () => (
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
            </svg>
        )
    },
];

export default function Footer() {
    const [logoUrl, setLogoUrl] = useState('/logo.png');
    const logoColors = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#8E24AA', '#FB8C00'];

    useEffect(() => {
        fetch('/api/gallery')
            .then(r => r.json())
            .then(data => {
                const logo = data.find((g: any) => g.slot === 'logo');
                if (logo) setLogoUrl(logo.url);
            })
            .catch(() => { });
    }, []);

    return (
        <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
            {/* Rainbow line */}
            <div style={{ height: '3px', background: 'var(--rainbow)' }} />

            <div className="container" style={{ padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{
                                height: 40, borderRadius: 'var(--r-md)', overflow: 'hidden',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <img 
                                    src={logoUrl} 
                                    alt="1st School Logo" 
                                    style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
                                    onError={(e) => {
                                        if (logoUrl === '/logo.png') {
                                            setLogoUrl('/logo.jpg');
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                            Nurturing young minds through play-based learning, creative exploration, and holistic development in Thrissur, Kerala.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {SocialLinks.map(s => {
                                const Icon = s.icon;
                                return (
                                    <a key={s.label} href={s.href} aria-label={s.label}
                                        style={{
                                            width: 36, height: 36, borderRadius: 'var(--r-full)',
                                            background: 'var(--surface-2)', border: '1px solid var(--border)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'var(--text-muted)', transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Quick Links
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                            {FooterLinks.map(l => (
                                <Link key={l.href} href={l.href}
                                    style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                                >{l.label}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Contact Us
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                                <Phone size={15} style={{ flexShrink: 0, color: 'var(--green)' }} />
                                <a href="tel:+919876543210" style={{ color: 'var(--text-muted)' }}>+91 9946555972</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                                <Phone size={15} style={{ flexShrink: 0, color: 'var(--orange)' }} />
                                <a href="tel:+918921056026" style={{ color: 'var(--text-muted)' }}>+91 8921056026</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                                <Mail size={15} style={{ flexShrink: 0, color: 'var(--blue)' }} />
                                <a href="mailto:1stschoolthrissur@gmail.com" style={{ color: 'var(--text-muted)' }}>1stschoolthrissur@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Map / Branches */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            Our Campuses
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <a href="https://share.google/iunmcB4bkCKKWdgNc" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                                <MapPin size={15} style={{ color: 'var(--green)', flexShrink: 0 }} /> Thrissur Westfort Branch
                            </a>
                            <a href="https://share.google/zIZR6GaHvvmiog24B" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                                <MapPin size={15} style={{ color: 'var(--orange)', flexShrink: 0 }} /> Thrissur Eastfort Branch
                            </a>



                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem',
                }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>
                        © {new Date().getFullYear()} 1st School. All rights reserved.
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Made with <Heart size={12} style={{ color: 'var(--red)' }} fill="var(--red)" /> by Sharp Intell
                    </p>
                </div>
            </div>
        </footer>
    );
}
