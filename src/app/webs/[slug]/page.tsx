import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    ArrowLeft,
    Globe,
    Code2,
    CreditCard,
    ExternalLink,
    CheckCircle2,
    MessageCircle,
    Shield,
    Zap,
    Clock
} from 'lucide-react';
import Image from 'next/image';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { getWebBySlug, getWebs, getRelatedWebs } from '@/lib/data';
import { RelatedItems } from '@/components/related-items';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all webs
export async function generateStaticParams() {
    const webs = await getWebs();
    return webs.map((web) => ({
        slug: web.slug,
    }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const web = await getWebBySlug(slug);

    if (!web) {
        return {
            title: 'Layanan Tidak Ditemukan | Sellappku',
            description: 'Layanan web yang Anda cari tidak ditemukan.',
        };
    }

    return {
        title: `${web.title} - Layanan Web & SaaS Premium`,
        description: web.short_description,
        alternates: {
            canonical: `https://sellappku.netlify.app/webs/${slug}`,
        },
        openGraph: {
            title: web.title,
            description: web.short_description,
            type: 'article',
            url: `https://sellappku.netlify.app/webs/${slug}`,
            images: web.thumbnail_url ? [web.thumbnail_url] : [],
        },
    };
}

export default async function WebDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const [web, relatedWebs] = await Promise.all([
        getWebBySlug(slug),
        getRelatedWebs(slug)
    ]);

    if (!web) {
        notFound();
    }

    const whatsappSourceCode = generateWhatsAppLink(
        web.title,
        `Halo, saya ingin *BELI SOURCE CODE* untuk *${web.title}* dengan harga ${web.price_source_code}. Mohon info selengkapnya.`
    );

    const whatsappSubscription = generateWhatsAppLink(
        web.title,
        `Halo, saya ingin *PAKAI LANGSUNG* layanan *${web.title}* dengan harga ${web.price_subscription}/device (lifetime). Mohon info selengkapnya.`
    );

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: web.title,
        description: web.short_description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        author: {
            '@type': 'Organization',
            name: 'Sellappku',
        },
        offers: {
            '@type': 'Offer',
            price: web.price_subscription?.replace(/[^0-9]/g, ''),
            priceCurrency: 'IDR',
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
                        href="/webs"
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Kembali ke Daftar Layanan
                    </Link>
                    {web.is_featured && (
                        <span className="badge badge-amber">Featured</span>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Media */}
                    <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl overflow-hidden flex items-center justify-center mb-6 shadow-lg">
                            {web.thumbnail_url ? (
                                <Image
                                    src={web.thumbnail_url}
                                    alt={web.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <Globe className="h-24 w-24 text-emerald-300 " />
                            )}
                        </div>

                        {/* Demo Button */}
                        {web.demo_url && (
                            <a
                                href={web.demo_url ?? undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center space-x-2 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-transparent dark:border-gray-800 hover:shadow-md transition-shadow mb-6"
                            >
                                <ExternalLink className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    Lihat Demo Live
                                </span>
                            </a>
                        )}

                        {/* Tech Stack */}
                        {web.tech_stack && web.tech_stack.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {web.tech_stack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right - Info & Pricing */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {web.title}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            {web.short_description}
                        </p>

                        {/* Pricing Cards */}
                        <div className="space-y-4 mb-8">
                            {/* Option 1: Source Code */}
                            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/10 dark:to-indigo-900/10 rounded-2xl p-6 border-2 border-violet-200 dark:border-violet-800/50">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                                            <Code2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                Beli Source Code
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Full akses, modifikasi bebas
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                            {web.price_source_code}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">One-time</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                                        Full source code (commented)
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                                        Dokumentasi instalasi
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                                        30 hari support WhatsApp
                                    </li>
                                </ul>
                                <a
                                    href={whatsappSourceCode}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn w-full bg-violet-600 hover:bg-violet-700 text-white"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Beli Source Code
                                </a>
                            </div>

                            {/* Option 2: Subscription */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-800/50">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                                            <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                Pakai Langsung
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                1 lisensi = 1 device
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                            {web.price_subscription}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Lifetime/device</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                                        Akses langsung ke layanan
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                                        Lisensi lifetime (selamanya)
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                                        Update gratis
                                    </li>
                                </ul>
                                <a
                                    href={whatsappSubscription}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Pakai Langsung
                                </a>
                            </div>
                        </div>

                        {/* Features */}
                        {web.features && web.features.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Fitur Layanan
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {web.features.map((feature, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <Shield className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                {web.description && (
                    <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-transparent dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Tentang Layanan
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            {web.description.split('\n').map((line, i) => {
                                if (line.startsWith('## ')) {
                                    return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{line.replace('## ', '')}</h3>;
                                }
                                if (line.startsWith('- ')) {
                                    return (
                                        <div key={i} className="flex items-start space-x-2 my-2">
                                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                                            <span className="text-gray-600 dark:text-gray-400">{line.replace('- ', '')}</span>
                                        </div>
                                    );
                                }
                                if (line.trim()) {
                                    return <p key={i} className="mb-4 text-gray-600 dark:text-gray-400">{line}</p>;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                )}

                {/* Why Choose Section */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm text-center border border-transparent dark:border-gray-800">
                        <div className="inline-flex p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
                            <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Langsung Pakai</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tidak perlu setup rumit, langsung aktif setelah pembayaran
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm text-center border border-transparent dark:border-gray-800">
                        <div className="inline-flex p-4 bg-violet-100 dark:bg-violet-900/30 rounded-2xl mb-4">
                            <Clock className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lifetime License</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Bayar sekali, pakai selamanya tanpa biaya bulanan
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm text-center border border-transparent dark:border-gray-800">
                        <div className="inline-flex p-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl mb-4">
                            <MessageCircle className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Support WhatsApp</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Langsung chat dengan developer untuk bantuan
                        </p>
                    </div>
                </div>

                {/* Related Webs */}
                <div className="mt-16">
                    <RelatedItems
                        title="Layanan Web Lainnya"
                        items={relatedWebs}
                        type="webs"
                    />
                </div>
            </div>
        </div>
    );
}
