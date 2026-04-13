import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '1st School — Preschool & Montessori | Thrissur, Kerala',
  description:
    'Welcome to 1st School — a premier preschool and Montessori in Nellikunnu, Thrissur. Nurturing young minds through play-based learning, creative exploration, and holistic development. Admissions open for 2026.',
  keywords: ['preschool', 'montessori', 'thrissur', 'kerala', '1st school', 'kindergarten', 'playschool', 'nellikunnu'],
  openGraph: {
    title: '1st School — Preschool & Montessori | Thrissur',
    description: 'Nurturing young minds through play-based learning in Thrissur, Kerala.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1E88E5" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
