'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoUrl, setLogoUrl] = useState('/logo.png');
    const pathname = usePathname();

    useEffect(() => {
        const saved = localStorage.getItem('firstschool_theme');
        const prefersDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
    }, []);

    const toggleTheme = useCallback(() => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        try { localStorage.setItem('firstschool_theme', next ? 'dark' : 'light'); } catch { }
    }, [isDark]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        fetch('/api/gallery')
            .then(r => r.json())
            .then(data => {
                const logo = data.find((g: any) => g.slot === 'logo');
                if (logo) setLogoUrl(logo.url);
            })
            .catch(() => { });
    }, []);

    const logoColors = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#8E24AA', '#FB8C00'];

    return (
        <header
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                transition: 'all 0.3s ease',
                background: scrolled
                    ? isDark ? 'rgba(15,15,15,0.88)' : 'rgba(255,253,247,0.88)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
            }}
        >
            <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{
                        height: 48, borderRadius: 'var(--r-md)', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <img 
                            src={logoUrl} 
                            alt="1st School Logo" 
                            style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
                            onError={(e) => {
                                // Fallback to jpg if png is not found and we're not using a managed URL
                                if (logoUrl === '/logo.png') {
                                    setLogoUrl('/logo.jpg');
                                }
                            }}
                        />
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hide-mobile" style={{ alignItems: 'center', gap: '0.25rem' }}>
                    {NAV_LINKS.map(l => {
                        const isActive = pathname === l.href;
                        return (
                            <Link key={l.href} href={l.href}
                                style={{
                                    padding: '0.5rem 1rem', borderRadius: 'var(--r-full)', fontSize: 'var(--text-sm)',
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                                    background: isActive ? 'var(--accent-bg)' : 'transparent',
                                    textDecoration: 'none', transition: 'all 0.2s ease',
                                }}
                            >{l.label}</Link>
                        );
                    })}
                </nav>

                {/* Right actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    <button
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        style={{
                            width: 40, height: 40, borderRadius: 'var(--r-full)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'var(--surface-2)', border: '1px solid var(--border)',
                            color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s ease',
                        }}
                    >
                        {isDark ? <Sun size={17} /> : <Moon size={17} />}
                    </button>

                    <Link href="/contact" className="btn-rainbow hide-mobile" style={{ padding: '0.625rem 1.25rem', fontSize: '0.8125rem' }}>
                        Enroll Now
                    </Link>

                    <button
                        className="show-mobile"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{
                            width: 40, height: 40, borderRadius: 'var(--r-full)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'var(--surface-2)', border: '1px solid var(--border)',
                            color: 'var(--text)', cursor: 'pointer',
                        }}
                    >
                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                            overflow: 'hidden',
                            background: isDark ? 'rgba(15,15,15,0.97)' : 'rgba(255,253,247,0.97)',
                            backdropFilter: 'blur(20px)',
                            borderTop: '1px solid var(--border)',
                        }}
                    >
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {NAV_LINKS.map(l => {
                                const isActive = pathname === l.href;
                                return (
                                    <Link key={l.href} href={l.href}
                                        style={{
                                            padding: '0.875rem 1rem', borderRadius: 'var(--r-md)',
                                            fontSize: 'var(--text-base)', fontWeight: isActive ? 700 : 500,
                                            color: isActive ? 'var(--accent)' : 'var(--text)',
                                            background: isActive ? 'var(--accent-bg)' : 'var(--surface-2)',
                                            textDecoration: 'none',
                                        }}
                                    >{l.label}</Link>
                                );
                            })}
                            <Link href="/contact" className="btn-rainbow" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                                Enroll Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
