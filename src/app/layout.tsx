import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sellappku.vercel.app'),
  title: {
    default: 'Sellappku - Premium Source Code & Apps',
    template: '%s | Sellappku',
  },
  description: 'Platform jual beli source code aplikasi, game, dan layanan web siap pakai dengan lisensi lifetime. Langsung dari developer, tanpa perantara.',
  keywords: ['source code', 'aplikasi', 'game', 'web', 'mobile app', 'indonesia', 'developer'],
  authors: [{ name: 'Ahmad', url: 'https://sellappku.com' }],
  creator: 'Ahmad',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://sellappku.com',
    siteName: 'Sellappku',
    title: 'Sellappku - Premium Source Code & Apps',
    description: 'Platform jual beli source code aplikasi, game, dan layanan web siap pakai dengan lisensi lifetime.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sellappku',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sellappku - Premium Source Code & Apps',
    description: 'Platform jual beli source code aplikasi, game, dan layanan web siap pakai dengan lisensi lifetime.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="sellappku-theme"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
            <AnnouncementBar
              messages={[
                "🎉 Promo Januari! Diskon 20% untuk semua source code hingga akhir bulan",
                "💬 Konsultasi gratis via WhatsApp 24/7",
                "🚀 Produk baru: Invoice Generator & QR Menu Restaurant",
              ]}
            />
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
