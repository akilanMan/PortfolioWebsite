import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  title: 'Akilan Manivannan | Software Engineer',
  description: 'Portfolio of Akilan Manivannan - Software Engineer with focus in Data Science and ML.',
  openGraph: {
    title: 'Akilan Manivannan | Portfolio',
    description: 'Software Engineer + Data Science / ML projects and experience.',
    type: 'website',
    url: 'https://example.com',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Akilan Manivannan Portfolio'
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
