import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';

import { getActiveAnnouncements } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sellappku.netlify.app'),
  title: {
    default: 'Sellappku - Jual Beli Source Code & Aplikasi Premium',
    template: '%s | Sellappku',
  },
  description: 'Platform terpercaya untuk beli source code aplikasi, game, dan script website siap pakai. Lisensi lifetime, langsung dari developer handal Indonesia.',
  keywords: [
    'jual source code',
    'beli aplikasi',
    'source code mobile app',
    'script website',
    'jual script game',
    'developer indonesia',
    'software house indonesia',
    'buy source code',
    'sell app script'
  ],
  authors: [{ name: 'Ahmad', url: 'https://sellappku.netlify.app' }],
  creator: 'Ahmad',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://sellappku.netlify.app',
    siteName: 'Sellappku',
    title: 'Sellappku - Premium Source Code & Apps',
    description: 'Platform jual beli source code aplikasi, game, dan layanan web siap pakai dengan lisensi lifetime.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sellappku - Premium Source Code & Apps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sellappku - Jual Beli Source Code & Aplikasi Premium',
    description: 'Platform terpercaya untuk beli source code aplikasi, game, dan script website siap pakai.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '8RxQzdKAEASPOg_bkO-wIQULQGCqgXT2SNq-BCdER_k',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcements = await getActiveAnnouncements();
  const messages = announcements.map(a => a.message);

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="sellappku-theme"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
            <AnnouncementBar messages={messages} />
            <Navigation />
            <main className="flex-1 pt-[100px]">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
