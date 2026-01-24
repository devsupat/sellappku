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
 metadataBase: new URL('https://sellappku.com'),
 title: {
 default: 'Sellappku - Jual Beli Source Code & Aplikasi Tanpa Ribet',
 template: '%s | Sellappku',
 },
 description:
 'Temukan source code siap pakai, aplikasi mobile, dan layanan web dari developer terpercaya. Semua dengan lisensi lifetime.',
 keywords: [
 'source code',
 'aplikasi mobile',
 'web services',
 'jual source code',
 'beli aplikasi',
 'developer indonesia',
 ],
 authors: [{ name: 'Ahmad' }],
 creator: 'Ahmad',
 publisher: 'Sellappku',
 openGraph: {
 type: 'website',
 locale: 'id_ID',
 url: 'https://sellappku.com',
 siteName: 'Sellappku',
 title: 'Sellappku - Jual Beli Source Code & Aplikasi Tanpa Ribet',
 description:
 'Temukan source code siap pakai, aplikasi mobile, dan layanan web dari developer terpercaya.',
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
 title: 'Sellappku - Jual Beli Source Code & Aplikasi Tanpa Ribet',
 description:
 'Temukan source code siap pakai, aplikasi mobile, dan layanan web dari developer terpercaya.',
 images: ['/og-image.png'],
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
 defaultTheme="light"
 enableSystem={false}
 storageKey="sellappku-theme"
 disableTransitionOnChange
 >
 <div className="min-h-screen flex flex-col bg-white">
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
