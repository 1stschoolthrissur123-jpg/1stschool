'use client';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

interface TeamMember {
    name: string;
    role: string;
    qualification: string;
    description: string;
    image: string;
    accentColor: string;
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Krishnamurthy M',
        role: 'Managing Partner',
        qualification: 'M.A. (English), M.A. (Political Science), M.Phil, B.Ed',
        description:
            'With over 25 years of experience in teaching, training, and school administration, Mr. Krishnamurthy M brings strong academic and administrative leadership and a commitment to quality education.',
        image: '/team/krishnamurthy.jpg',
        accentColor: '#1E88E5',
    },
    {
        name: 'Dr. Archana Krishnamurthy',
        role: 'Principal',
        qualification: 'Ph.D. in Child Psychology',
        description:
            'A visionary academician with over 25 years of experience in teaching, research, and educational leadership, Dr. Archana Krishnamurthy brings deep expertise in child development & early childhood education and a strong commitment to progressive school education.',
        image: '/team/archana.jpg',
        accentColor: '#E53935',
    },
    {
        name: 'Mary Nanmaja',
        role: 'Centre Head',
        qualification: 'B.Sc., M.Ed.',
        description:
            'With over 25 years of academic experience spanning schools in India and abroad, along with strong administrative expertise in managing a preschool centre, Mary Nanmaja brings a fresh, well-rounded, innovative and practical approach to education, fostering a dynamic learning environment for young minds.',
        image: '/team/mary.jpg',
        accentColor: '#43A047',
    },
    {
        name: 'M. Honnappa',
        role: 'Executive Partner',
        qualification: 'M.A., M.Ed.',
        description:
            'With over 20 years of experience in school and college administration, Mr. Honnappa brings strong leadership and operational expertise to the institution.',
        image: '/team/honnappa.jpg',
        accentColor: '#8E24AA',
    },
];

export default function ThinkTankers() {
    return (
        <section className="section" style={{ background: 'var(--surface)' }}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                    <motion.p
                        variants={fadeUp}
                        style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            color: 'var(--accent)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '0.5rem',
                        }}
                    >
                        Our ThinkTankers
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: 'var(--text-2xl)',
                            color: 'var(--text)',
                            marginBottom: '0.75rem',
                        }}
                    >
                        Meet the Team
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-muted)',
                            maxWidth: '50ch',
                            margin: '0 auto',
                            lineHeight: 1.7,
                        }}
                    >
                        The passionate educators and leaders behind 1st School — dedicated to nurturing every child&apos;s potential.
                    </motion.p>
                </motion.div>

                {/* Team Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={stagger}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
                        gap: 'clamp(1rem, 2vw, 1.5rem)',
                    }}
                >
                    {TEAM_MEMBERS.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            className="thinktanker-card"
                            style={{
                                background: 'var(--bg)',
                                borderRadius: 'var(--r-2xl)',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                            }}
                        >
                            {/* Accent Top Bar */}
                            <div
                                style={{
                                    height: 4,
                                    background: `linear-gradient(90deg, ${member.accentColor}, ${member.accentColor}88)`,
                                }}
                            />

                            {/* Image Container */}
                            <div
                                style={{
                                    padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.5rem) 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        width: 'clamp(140px, 30vw, 180px)',
                                        height: 'clamp(140px, 30vw, 180px)',
                                        borderRadius: 'var(--r-2xl)',
                                        overflow: 'hidden',
                                        border: `3px solid ${member.accentColor}22`,
                                        boxShadow: `0 8px 24px ${member.accentColor}15`,
                                        position: 'relative',
                                        flexShrink: 0,
                                    }}
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'top center',
                                            transition: 'transform 0.5s ease',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div
                                style={{
                                    padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 2vw, 1.5rem)',
                                    textAlign: 'center',
                                }}
                            >
                                {/* Role Badge */}
                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.375rem',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--r-full)',
                                        background: `${member.accentColor}12`,
                                        border: `1px solid ${member.accentColor}25`,
                                        marginBottom: '0.625rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: member.accentColor,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: '0.6875rem',
                                            fontWeight: 600,
                                            color: member.accentColor,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        {member.role}
                                    </span>
                                </div>

                                {/* Name */}
                                <h3
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 700,
                                        fontSize: 'var(--text-lg)',
                                        color: 'var(--text)',
                                        marginBottom: '0.25rem',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {member.name}
                                </h3>

                                {/* Qualification */}
                                <p
                                    style={{
                                        fontSize: '0.75rem',
                                        color: member.accentColor,
                                        fontWeight: 500,
                                        marginBottom: '0.75rem',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {member.qualification}
                                </p>

                                {/* Divider */}
                                <div
                                    style={{
                                        width: 40,
                                        height: 2,
                                        borderRadius: 1,
                                        background: `linear-gradient(90deg, transparent, ${member.accentColor}40, transparent)`,
                                        margin: '0 auto 0.75rem',
                                    }}
                                />

                                {/* Description */}
                                <p
                                    style={{
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--text-muted)',
                                        lineHeight: 1.65,
                                    }}
                                >
                                    {member.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
