import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://1stschool.com'),
  title: '1st School — Preschool & Montessori | Thrissur, Kerala',
  description:
    'Welcome to 1st School — a premier preschool and Montessori in Nellikunnu, Thrissur. Nurturing young minds through play-based learning, creative exploration, and holistic development. Admissions open for 2026.',
  keywords: ['preschool', 'montessori', 'thrissur', 'kerala', '1st school', 'kindergarten', 'playschool', 'nellikunnu'],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '1st School — Preschool & Montessori | Thrissur',
    description: 'Nurturing young minds through play-based learning in Thrissur, Kerala.',
    url: 'https://1stschool.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1st School — Preschool & Montessori | Thrissur',
    description: 'Nurturing young minds through play-based learning in Thrissur, Kerala.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "1st School",
    "description": "Welcome to 1st School — a premier preschool and Montessori in Nellikunnu, Thrissur.",
    "url": "https://1stschool.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thrissur",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1E88E5" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
