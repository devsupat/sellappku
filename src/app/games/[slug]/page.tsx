import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    ArrowLeft,
    Gamepad2,
    Download,
    ExternalLink,
    Star,
    Users,
    Shield,
    Play,
    MessageCircle,
    Info,
    Layout
} from 'lucide-react';
import Image from 'next/image';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { getGameBySlug, getGames, getRelatedGames } from '@/lib/data';
import { RelatedItems } from '@/components/related-items';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// Allow on-demand ISR for slugs
export const dynamicParams = true;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all games
export async function generateStaticParams() {
    const games = await getGames();
    return games.map((game) => ({
        slug: game.slug,
    }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const game = await getGameBySlug(slug);

    if (!game) {
        return {
            title: 'Game Tidak Ditemukan | Sellappku',
            description: 'Game yang Anda cari tidak ditemukan.',
        };
    }

    return {
        title: `${game.title} - Download Game Mobile Premium`,
        description: game.short_description,
        alternates: {
            canonical: `https://sellappku.netlify.app/games/${slug}`,
        },
        openGraph: {
            title: game.title,
            description: game.short_description,
            type: 'article',
            url: `https://sellappku.netlify.app/games/${slug}`,
            images: game.thumbnail_url ? [game.thumbnail_url] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: game.title,
            description: game.short_description,
            images: game.thumbnail_url ? [game.thumbnail_url] : [],
        },
    };
}

function getDownloadInfo(type: string) {
    switch (type) {
        case 'playstore':
            return { label: 'Download dari Play Store', icon: Play, color: 'bg-emerald-600 hover:bg-emerald-700' };
        case 'drive':
            return { label: 'Download dari Google Drive', icon: Download, color: 'bg-blue-600 hover:bg-blue-700' };
        case 'mediafire':
            return { label: 'Download dari Mediafire', icon: Download, color: 'bg-teal-600 hover:bg-teal-700' };
        default:
            return { label: 'Download APK', icon: Download, color: 'bg-emerald-600 hover:bg-emerald-700' };
    }
}

export default async function GameDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const game = await getGameBySlug(slug);

    if (!game) {
        notFound();
    }

    const relatedGames = await getRelatedGames(game.genre, slug);
    const downloadInfo = getDownloadInfo(game.download_type);
    const whatsappLink = generateWhatsAppLink(game.title, `Halo, saya ingin bertanya tentang game *${game.title}*. Apakah ada info lebih lanjut?`);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: game.title,
        description: game.short_description,
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android, iOS',
        author: {
            '@type': 'Organization',
            name: 'Sellappku',
        },
        softwareVersion: game.version,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: game.rating || '4.5',
            ratingCount: '100',
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/games"
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Kembali ke Daftar Game
                    </Link>
                    {game.is_featured && (
                        <span className="badge badge-amber">Featured</span>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Media */}
                    <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-3xl overflow-hidden flex items-center justify-center mb-6 shadow-lg border border-transparent dark:border-gray-800">
                            {game.thumbnail_url ? (
                                <Image
                                    src={game.thumbnail_url}
                                    alt={game.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <Gamepad2 className="h-24 w-24 text-emerald-300 dark:text-emerald-700" />
                            )}
                        </div>

                        {/* Game Info Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Info className="h-5 w-5 text-emerald-500" />
                                Informasi Game
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Versi</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{game.version || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Ukuran</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{game.size || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Genre</p>
                                    <p className="font-medium text-gray-900 dark:text-white capitalize">{game.genre || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Downloads</p>
                                    <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                                        <Users className="h-4 w-4 text-emerald-500" />
                                        {game.downloads}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                                    <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        {game.rating} / 5.0
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Platform</p>
                                    <p className="font-medium text-gray-900 dark:text-white capitalize">{game.platform || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Screenshots if any */}
                        {game.screenshots && game.screenshots.length > 0 && (
                            <div className="mt-8">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Layout className="h-5 w-5 text-emerald-500" />
                                    Screenshots
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {game.screenshots.map((s: any, i: number) => (
                                        <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                                            <Image
                                                src={s.url || s}
                                                alt={s.caption || `Screenshot ${i + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right - Content */}
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {game.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                {game.short_description}
                            </p>

                            {/* Main CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={game.download_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`btn flex-1 flex items-center justify-center gap-2 py-4 shadow-lg shadow-emerald-500/20 text-white ${downloadInfo.color}`}
                                >
                                    <downloadInfo.icon className="h-5 w-5" />
                                    {downloadInfo.label}
                                </a>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary flex-1 flex items-center justify-center gap-2 py-4"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    Tanya Penjual
                                </a>
                            </div>
                        </div>

                        {/* Full Description */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-transparent dark:border-gray-800 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Deskripsi Game
                            </h3>
                            <div className="prose prose-emerald dark:prose-invert max-w-none">
                                {game.description ? (
                                    <div className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                                        {game.description}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">Tidak ada deskripsi lengkap.</p>
                                )}
                            </div>
                        </div>

                        {/* Features */}
                        {game.features && game.features.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-transparent dark:border-gray-800">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Fitur Utama
                                </h3>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {game.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-transparent dark:border-gray-700/50">
                                            <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">
                        Penasaran dengan Game Ini?
                    </h2>
                    <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
                        Hubungi saya untuk info lebih lanjut atau bantuan instalasi game
                    </p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-white text-emerald-600 hover:bg-emerald-50"
                    >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Chat via WhatsApp
                    </a>
                </div>

                {/* Related Games */}
                <div className="mt-16">
                    <RelatedItems
                        title="Game Serupa Lainnya"
                        items={relatedGames}
                        type="games"
                    />
                </div>
            </div>
        </div>
    );
}
