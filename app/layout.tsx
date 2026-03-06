import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  title: 'akilan | software engineer',
  description: 'portfolio of akilan.',
  openGraph: {
    title: 'Aakilan | software engineer',
    description: 'Software Engineer + Data Science / ML projects and experience.',
    type: 'website',
    url: 'https://example.com',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'akilan'
      }
    ]
  }
};

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const isDark = stored ? stored === 'dark' : true;
    document.documentElement.classList.toggle('dark', isDark);
  } catch {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
