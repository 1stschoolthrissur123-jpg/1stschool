'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GalleryItem { id: string; url: string; slot: string; alt: string; }

export default function HeroBackground() {
    const [heroImg, setHeroImg] = useState<string | null>(null);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax: image moves up as user scrolls down — creates depth
    const imgY = useTransform(scrollY, [0, 600], ['0%', '18%']);
    const imgScale = useTransform(scrollY, [0, 600], [1.08, 1.18]);
    const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.82]);

    useEffect(() => {
        fetch('/api/gallery', { cache: 'no-store' })
            .then(r => r.ok ? r.json() : [])
            .then((data: any) => {
                const items: GalleryItem[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.gallery) ? data.gallery : [];
                const hero = items.find(g => g.slot === 'hero');
                if (hero) setHeroImg(hero.url);
            })
            .catch(() => { });
    }, []);

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

    if (!heroImg) return null;

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
                    src={heroImg}
                    alt="1st School campus"
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
                    background: `
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.88) 0%,
              rgba(255,255,255,0.75) 40%,
              rgba(255,255,255,0.82) 100%
            )
          `,
                }}
            />

            {/* Dark mode overlay */}
            <div className="hero-dark-overlay" style={{ position: 'absolute', inset: 0 }} />
        </div>
    );
}
