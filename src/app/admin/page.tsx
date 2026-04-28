'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, Image as ImageIcon, Loader2, CheckCircle, AlertCircle, ArrowLeft, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem { id: string; url: string; slot: string; alt: string; addedAt?: string; }

const FIXED_SLOTS = [
    { slot: 'hero', label: '🏠 Hero Banner', desc: 'Main homepage hero background' },
    { slot: 'logo', label: '🖼️ School Logo', desc: 'Main logo (transparent PNG recommended)' },
    { slot: 'programs-bg', label: '📚 Programs Background', desc: 'Programs page 3D background' },
    { slot: 'about-bg', label: '📖 About Background', desc: 'About page 3D background' },
    { slot: 'contact-bg', label: '📞 Contact Background', desc: 'Contact page 3D background' },
    { slot: 'about', label: '📖 About Section Image', desc: 'About page inline image' },
];

export default function AdminPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [savingSetting, setSavingSetting] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeSlot, setActiveSlot] = useState<string | null>(null);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null means checking
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        const auth = sessionStorage.getItem('firstschool_admin_auth');
        if (auth === 'true') {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError('');
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (data.success) {
                setIsAuthorized(true);
                sessionStorage.setItem('firstschool_admin_auth', 'true');
            } else {
                setAuthError(data.error || 'Invalid password');
            }
        } catch {
            setAuthError('Authentication failed');
        } finally {
            setAuthLoading(false);
        }
    };

    const fetchGallery = () => {
        fetch('/api/gallery', { cache: 'no-store' })
            .then(r => r.ok ? r.json() : [])
            .then((items: GalleryItem[]) => {
                setGallery(Array.isArray(items) ? items : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const fetchSettings = () => {
        fetch('/api/settings', { cache: 'no-store' })
            .then(r => r.ok ? r.json() : {})
            .then(data => setSettings(data))
            .catch(console.error);
    };

    useEffect(() => {
        if (isAuthorized) {
            fetchGallery();
            fetchSettings();
        }
    }, [isAuthorized]);

    const saveSetting = async (key: string, value: string) => {
        setSavingSetting(key);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            if (!res.ok) throw new Error(await res.text());
            setMessage({ type: 'success', text: `Saved successfully!` });
            fetchSettings();
        } catch (err) {
            setMessage({ type: 'error', text: `Save failed: ${String(err)}` });
        } finally {
            setSavingSetting(null);
        }
    };

    const handleUploadVideo = async (featureName: string, file: File) => {
        setUploading(featureName);
        setMessage(null);
        try {
            const form = new FormData();
            form.append('file', file);
            form.append('slot', `video-${featureName.replace(/[^a-z0-9]/gi, '').toLowerCase()}`);
            const res = await fetch('/api/upload', { method: 'POST', body: form });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            await saveSetting(featureName, data.url);
        } catch (err) {
            setMessage({ type: 'error', text: `Upload failed: ${String(err)}` });
            setUploading(null);
        }
    };

    const handleUpload = async (slot: string, file: File) => {
        setUploading(slot);
        setMessage(null);
        try {
            const form = new FormData();
            form.append('file', file);
            form.append('slot', slot);
            form.append('alt', `1st School — ${slot}`);
            const res = await fetch('/api/upload', { method: 'POST', body: form });
            if (!res.ok) throw new Error(await res.text());
            setMessage({ type: 'success', text: `Image uploaded to ${slot}!` });
            fetchGallery();
        } catch (err) {
            setMessage({ type: 'error', text: `Upload failed: ${String(err)}` });
        } finally {
            setUploading(null);
        }
    };

    const handleDelete = async (slot: string) => {
        if (!confirm(`Delete image from slot "${slot}"?`)) return;
        setDeleting(slot);
        setMessage(null);
        try {
            const res = await fetch('/api/delete', { method: 'DELETE', body: JSON.stringify({ slot }), headers: { 'Content-Type': 'application/json' } });
            if (!res.ok) throw new Error(await res.text());
            setMessage({ type: 'success', text: `Image removed from ${slot}` });
            fetchGallery();
        } catch (err) {
            setMessage({ type: 'error', text: `Delete failed: ${String(err)}` });
        } finally {
            setDeleting(null);
        }
    };

    const handleDeleteVideo = async (activity: string) => {
        if (!confirm(`Delete media for "${activity}"?`)) return;
        setSavingSetting(activity);
        setMessage(null);
        try {
            const slot = `video-${activity.replace(/[^a-z0-9]/gi, '').toLowerCase()}`;
            
            // 1. Delete from storage (GitHub/Local)
            // We ignore errors here in case it was just a manual YouTube link not in storage
            await fetch('/api/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot })
            });
            
            // 2. Clear from settings
            const setRes = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: activity, value: '' })
            });
            if (!setRes.ok) throw new Error(await setRes.text());
            
            setMessage({ type: 'success', text: `Media removed for ${activity}` });
            fetchSettings();
            fetchGallery();
        } catch (err) {
            setMessage({ type: 'error', text: `Failed to remove media: ${String(err)}` });
        } finally {
            setSavingSetting(null);
        }
    };

    const logoColors = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#8E24AA', '#FB8C00'];

    if (isAuthorized === null) return null;

    if (!isAuthorized) {
        return (
            <div style={{
                background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)', minHeight: '100dvh',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bento-card"
                    style={{ maxWidth: '400px', width: '100%', padding: '2rem', textAlign: 'center' }}
                >
                    <div style={{
                        width: 60, height: 60, borderRadius: 'var(--r-lg)', background: 'var(--surface-2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                        color: 'var(--accent)',
                    }}>
                        <Lock size={28} />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.5rem' }}>
                        Admin Access
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: '2rem' }}>
                        Please enter the administrator password to manage the gallery.
                    </p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                autoFocus
                                style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--r-md)',
                                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                                    color: 'var(--text)', fontSize: 'var(--text-sm)', outline: 'none',
                                }}
                            />
                        </div>
                        {authError && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#E53935', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                                {authError}
                            </motion.div>
                        )}
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="btn-rainbow"
                            style={{
                                width: '100%', padding: '0.75rem', justifyContent: 'center', gap: '0.5rem',
                                opacity: authLoading ? 0.7 : 1, transition: 'all 0.2s',
                            }}
                        >
                            {authLoading ? <Loader2 size={18} className="spin" /> : <>Unlock <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-faint)', fontSize: 'var(--text-xs)', textDecoration: 'none' }}>
                        <ArrowLeft size={14} /> Back to Homepage
                    </Link>
                </motion.div>
                <style>{` .spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } } `}</style>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)', minHeight: '100dvh' }}>
            {/* Header */}
            <header style={{
                padding: '1rem 0', borderBottom: '1px solid var(--border)',
                background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 50,
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                            <ArrowLeft size={16} /> Back to Site
                        </Link>
                        <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, display: 'flex', gap: '1px' }}>
                            {'Admin'.split('').map((c, i) => (
                                <span key={i} style={{ color: logoColors[i % logoColors.length] }}>{c}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            onClick={() => { sessionStorage.removeItem('firstschool_admin_auth'); setIsAuthorized(false); }}
                            style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', cursor: 'pointer', background: 'none', border: 'none' }}
                        >
                            Logout
                        </button>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', background: 'var(--surface-2)', padding: '0.25rem 0.75rem', borderRadius: 'var(--r-full)' }}>
                            Gallery Manager
                        </span>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '2rem clamp(1rem,4vw,2rem)' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', marginBottom: '0.5rem' }}>
                        Gallery Management
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                        Upload, replace, or delete images for your website. Each slot maps to a specific position.
                    </p>
                </div>

                {/* Status message */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            style={{
                                padding: '0.875rem 1.25rem', borderRadius: 'var(--r-md)', marginBottom: '1.5rem',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: message.type === 'success' ? 'rgba(67,160,71,0.1)' : 'rgba(229,57,53,0.1)',
                                border: `1px solid ${message.type === 'success' ? 'rgba(67,160,71,0.3)' : 'rgba(229,57,53,0.3)'}`,
                                color: message.type === 'success' ? '#43A047' : '#E53935',
                                fontSize: 'var(--text-sm)', fontWeight: 600,
                            }}
                        >
                            {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <Loader2 size={32} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
                        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading gallery...</p>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '1rem', marginTop: '1rem' }}>Core Pages & Backgrounds</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1rem' }}>
                            {FIXED_SLOTS.map(s => {
                                const existing = Array.isArray(gallery) ? gallery.find(g => g.slot === s.slot) : undefined;
                                const isUploading = uploading === s.slot;
                                const isDeleting = deleting === s.slot;
                                return (
                                    <div key={s.slot} className="bento-card" style={{ overflow: 'hidden' }}>
                                        {/* Image preview */}
                                        <div style={{
                                            aspectRatio: '16/10', background: 'var(--surface-2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            position: 'relative', overflow: 'hidden',
                                        }}>
                                            {existing ? (
                                                <img src={existing.url} alt={existing.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ textAlign: 'center', color: 'var(--text-faint)', padding: '1rem' }}>
                                                    <ImageIcon size={32} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
                                                    <div style={{ fontSize: 'var(--text-xs)' }}>No image</div>
                                                </div>
                                            )}
                                            {(isUploading || isDeleting) && (
                                                <div style={{
                                                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <Loader2 size={28} color="white" style={{ animation: 'spin 1s linear infinite' }} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info & Actions */}
                                        <div style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: '0.25rem' }}>{s.label}</div>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>{s.desc}</div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <label style={{
                                                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                                                    padding: '0.5rem', borderRadius: 'var(--r-md)', background: 'var(--accent-bg)',
                                                    color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
                                                    border: '1px solid var(--accent-ring)', transition: 'all 0.2s',
                                                }}>
                                                    <Upload size={13} /> {existing ? 'Replace' : 'Upload'}
                                                    <input type="file" accept="image/*" hidden
                                                        onChange={e => {
                                                            const f = e.target.files?.[0];
                                                            if (f) handleUpload(s.slot, f);
                                                            e.target.value = '';
                                                        }}
                                                    />
                                                </label>
                                                {existing && (
                                                    <button
                                                        onClick={() => handleDelete(s.slot)}
                                                        disabled={isDeleting}
                                                        style={{
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                                                            padding: '0.5rem 0.75rem', borderRadius: 'var(--r-md)',
                                                            background: 'rgba(229,57,53,0.1)', color: '#E53935',
                                                            fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
                                                            border: '1px solid rgba(229,57,53,0.25)', transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        <Trash2 size={13} /> Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginBottom: '1.5rem', marginTop: '3.5rem' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Program Activity Videos</h2>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Upload an .mp4 video or paste a YouTube/Vimeo link for each activity.</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1rem' }}>
                            {[
                                'Sensory Exploration', 'Social Interaction', 'Motor Skill Development', 'Story Time & Songs', 'Safe Play Environment',
                                'Creative Arts & Crafts', 'Pre-Reading Activities', 'Number Basics', 'Outdoor Play', 'Circle Time',
                                'Phonics & Reading', 'Basic Mathematics', 'Science Discovery', 'Art & Music', 'Physical Education',
                                'Advanced Literacy', 'Math Operations', 'Environmental Studies', 'Computer Awareness', 'School Readiness Program'
                            ].map(activity => {
                                const val = settings[activity] || '';
                                const isSaving = savingSetting === activity || uploading === activity;
                                return (
                                    <div key={activity} className="bento-card" style={{ padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                                        {isSaving && (
                                            <div style={{
                                                position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', zIndex: 10,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>
                                                {activity}
                                            </div>
                                            {val && (
                                                <button 
                                                    onClick={() => handleDeleteVideo(activity)}
                                                    style={{ color: '#E53935', cursor: 'pointer', background: 'none', border: 'none', padding: '0.25rem', display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
                                                    title="Delete Media"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Paste YouTube or video link..."
                                                    defaultValue={val}
                                                    onBlur={e => {
                                                        if (e.target.value !== val) {
                                                            saveSetting(activity, e.target.value);
                                                        }
                                                    }}
                                                    style={{
                                                        flex: 1, padding: '0.5rem', borderRadius: 'var(--r-md)',
                                                        background: 'var(--surface-2)', border: '1px solid var(--border)',
                                                        color: 'var(--text)', fontSize: 'var(--text-xs)'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                                                <span style={{ fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', fontWeight: 700 }}>OR</span>
                                                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                                            </div>
                                            <label style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                                                padding: '0.5rem', borderRadius: 'var(--r-md)', background: 'var(--surface-2)',
                                                color: 'var(--text)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
                                                border: '1px dashed var(--border)', transition: 'all 0.2s',
                                            }}>
                                                <Upload size={13} /> Upload .mp4 Video
                                                <input type="file" accept="video/mp4,video/webm" hidden
                                                    onChange={e => {
                                                        const f = e.target.files?.[0];
                                                        if (f) handleUploadVideo(activity, f);
                                                        e.target.value = '';
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>


                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', marginTop: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Gallery Images</h2>
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Upload an unlimited number of photos. They will be displayed in descending order.</p>
                            </div>
                            <label className="btn-rainbow" style={{ padding: '0.6rem 1.25rem', fontSize: 'var(--text-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--r-full)' }}>
                                <Upload size={16} /> Add to Gallery
                                <input type="file" accept="image/*" hidden
                                    onChange={e => {
                                        const f = e.target.files?.[0];
                                        if (f) {
                                            handleUpload(`gallery-${Date.now()}`, f);
                                        }
                                        e.target.value = '';
                                    }}
                                />
                            </label>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1rem' }}>
                            {gallery.filter(g => g.slot.startsWith('gallery-'))
                                .sort((a, b) => new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime())
                                .map(g => {
                                    const isUploading = uploading === g.slot;
                                    const isDeleting = deleting === g.slot;

                                    return (
                                        <div key={g.slot} className="bento-card" style={{ overflow: 'hidden' }}>
                                            <div style={{
                                                aspectRatio: '16/10', background: 'var(--surface-2)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                position: 'relative', overflow: 'hidden',
                                            }}>
                                                <img src={g.url} alt={g.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                {(isUploading || isDeleting) && (
                                                    <div style={{
                                                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <Loader2 size={28} color="white" style={{ animation: 'spin 1s linear infinite' }} />
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: '0.25rem' }}>Gallery Photo</div>
                                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>
                                                    {g.addedAt ? new Date(g.addedAt).toLocaleString() : 'N/A'}
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <button
                                                        onClick={() => handleDelete(g.slot)}
                                                        disabled={isDeleting}
                                                        style={{
                                                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
                                                            padding: '0.5rem', borderRadius: 'var(--r-md)',
                                                            background: 'rgba(229,57,53,0.1)', color: '#E53935',
                                                            fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
                                                            border: '1px solid rgba(229,57,53,0.25)', transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        <Trash2 size={13} /> Delete Image
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                            {gallery.filter(g => g.slot.startsWith('gallery-')).length === 0 && (
                                <div style={{
                                    gridColumn: '1 / -1', padding: '3rem', textAlign: 'center',
                                    borderRadius: 'var(--r-xl)', border: '2px dashed var(--border)',
                                    color: 'var(--text-muted)'
                                }}>
                                    <ImageIcon size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                    <p style={{ fontWeight: 600 }}>No images in the gallery</p>
                                    <p style={{ fontSize: 'var(--text-sm)' }}>Click "Add to Gallery" above to upload.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
