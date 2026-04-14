'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GalleryItem { id: string; url: string; slot: string; alt: string; }

interface PageBackgroundProps {
    slot: string;
    lightGradient?: string;
}

export default function PageBackground({
    slot,
    lightGradient = `linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.95) 100%)`
}: PageBackgroundProps) {
    const [bgImg, setBgImg] = useState<string | null>(null);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax: image moves up as user scrolls down — creates depth
    const imgY = useTransform(scrollY, [0, 600], ['0%', '18%']);
    const imgScale = useTransform(scrollY, [0, 600], [1.08, 1.18]);
    const overlayOpacity = useTransform(scrollY, [0, 400], [0.8, 0.95]); // Increased for text readability

    useEffect(() => {
        fetch('/api/gallery', { cache: 'no-store' })
            .then(r => r.ok ? r.json() : [])
            .then((data: any) => {
                const items: GalleryItem[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.gallery) ? data.gallery : [];
                const match = items.find(g => g.slot === slot);
                if (match) setBgImg(match.url);
            })
            .catch(() => { });
    }, [slot]);

    function handleMouseMove(e: React.MouseEvent) {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 2;   // -1 to 1
        const y = ((e.clientY - top) / height - 0.5) * 2;
        setMouseX(x);
        setMouseY(y);
    }

    function handleMouseLeave() {
        setMouseX(0);
        setMouseY(0);
    }

    if (!bgImg) return null;

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'auto',
            }}
        >
            {/* 3-D Parallax Image Layer */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: '-12%',          // oversized so parallax never shows edges
                    y: imgY,
                    scale: imgScale,
                    // Mouse-track tilt (subtle, desktop only)
                    x: mouseX * -14,
                    rotateY: mouseX * 3,
                    rotateX: mouseY * -2,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                    willChange: 'transform',
                }}
                transition={{ type: 'spring', damping: 40, stiffness: 160 }}
            >
                <img
                    src={bgImg}
                    alt={`1st School background for ${slot}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                    }}
                />
            </motion.div>

            {/* Gradient overlay for text readability — stays fixed */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: overlayOpacity,
                    background: lightGradient,
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                }}
            />

            {/* Dark mode overlay */}
            <div className="hero-dark-overlay" style={{ position: 'absolute', inset: 0 }} />
        </div>
    );
}
