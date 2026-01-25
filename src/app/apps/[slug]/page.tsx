import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    ArrowLeft,
    Smartphone,
    Download,
    ExternalLink,
    TestTube,
    Star,
    Users,
    Shield,
    Play,
    MessageCircle
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { getAppBySlug, getApps } from '@/lib/data';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all apps
export async function generateStaticParams() {
    const apps = await getApps();
    return apps.map((app) => ({
        slug: app.slug,
    }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const app = await getAppBySlug(slug);

    if (!app) {
        return {
            title: 'Aplikasi Tidak Ditemukan | Sellappku',
            description: 'Aplikasi yang Anda cari tidak ditemukan.',
        };
    }

    return {
        title: `${app.title} | Sellappku`,
        description: app.short_description,
        openGraph: {
            title: app.title,
            description: app.short_description,
            type: 'website',
            images: app.thumbnail_url ? [app.thumbnail_url] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: app.title,
            description: app.short_description,
            images: app.thumbnail_url ? [app.thumbnail_url] : [],
        },
    };
}

function getDownloadInfo(type: string) {
    switch (type) {
        case 'playstore':
            return { label: 'Download dari Play Store', icon: Play, color: 'bg-green-600 hover:bg-green-700' };
        case 'drive':
            return { label: 'Download dari Google Drive', icon: Download, color: 'bg-blue-600 hover:bg-blue-700' };
        case 'mediafire':
            return { label: 'Download dari Mediafire', icon: Download, color: 'bg-indigo-600 hover:bg-indigo-700' };
        default:
            return { label: 'Download APK', icon: Download, color: 'bg-violet-600 hover:bg-violet-700' };
    }
}

export default async function AppDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const app = await getAppBySlug(slug);

    if (!app) {
        notFound();
    }

    const downloadInfo = getDownloadInfo(app.download_type);
    const whatsappLink = generateWhatsAppLink(app.title, `Halo, saya ingin bertanya tentang aplikasi *${app.title}*. Apakah ada info lebih lanjut?`);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/apps"
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Kembali ke Daftar Aplikasi
                    </Link>
                    {app.is_featured && (
                        <span className="badge badge-amber">Featured</span>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Media */}
                    <div>
                        {/* Thumbnail */}
                        <div className="aspect-video bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                            <Smartphone className="h-24 w-24 text-indigo-300 " />
                        </div>

                        {/* App Info Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                Informasi Aplikasi
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Versi</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{app.version || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Ukuran</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{app.size || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Terakhir Update</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{app.updated_date || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Downloads</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{app.downloads || '0'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Info */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="flex items-center space-x-1 text-amber-500">
                                <Star className="h-5 w-5 fill-current" />
                                <span className="font-bold text-lg">{app.rating || 0}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                                <Download className="h-4 w-4" />
                                <span>{app.downloads || '0'} downloads</span>
                            </div>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {app.title}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            {app.short_description}
                        </p>

                        {/* Download Button */}
                        <div className="space-y-4 mb-8">
                            <a
                                href={app.download_url ?? undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn w-full text-white ${downloadInfo.color}`}
                            >
                                <downloadInfo.icon className="mr-2 h-5 w-5" />
                                {downloadInfo.label}
                            </a>

                            {/* Tester Button */}
                            {app.has_tester && app.tester_group_url && (
                                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-900/50">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <TestTube className="h-5 w-5 text-amber-600 " />
                                        <h3 className="font-semibold text-amber-800 ">
                                            Jadi Tester Beta
                                        </h3>
                                    </div>
                                    <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                                        Dapatkan akses awal ke fitur terbaru dan bantu kami meningkatkan aplikasi ini.
                                    </p>
                                    <div className="space-y-2">
                                        <a
                                            href={app.tester_group_url ?? undefined}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-secondary w-full text-sm"
                                        >
                                            <Users className="mr-2 h-4 w-4" />
                                            1. Join Google Group Tester
                                        </a>
                                        {app.tester_invite_url && (
                                            <a
                                                href={app.tester_invite_url ?? undefined}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-secondary w-full text-sm dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                2. Accept Tester Invite
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        {app.features && app.features.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Fitur Utama
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {app.features.map((feature, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <Shield className="h-4 w-4 text-violet-500 dark:text-violet-400 flex-shrink-0" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                {app.description && (
                    <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-transparent dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Tentang Aplikasi
                        </h2>
                        <div className="prose prose-gray max-w-none">
                            {app.description.split('\n').map((line, i) => {
                                if (line.startsWith('## ')) {
                                    return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h3>;
                                }
                                if (line.startsWith('- ')) {
                                    return (
                                        <div key={i} className="flex items-start space-x-2 my-2">
                                            <span className="text-violet-500 mt-1">•</span>
                                            <span>{line.replace('- ', '')}</span>
                                        </div>
                                    );
                                }
                                if (line.trim()) {
                                    return <p key={i} className="mb-4">{line}</p>;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                )}

                {/* Contact CTA */}
                <div className="mt-12 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700 rounded-3xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">
                        Ada Pertanyaan?
                    </h2>
                    <p className="text-violet-100 mb-6 max-w-xl mx-auto">
                        Hubungi saya untuk info lebih lanjut atau request fitur baru
                    </p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-white text-violet-600 hover:bg-violet-50"
                    >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Chat via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
