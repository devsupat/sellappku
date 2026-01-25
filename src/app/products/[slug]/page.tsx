import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    ArrowLeft,
    Code2,
    Play,
    ExternalLink,
    CheckCircle2,
    MessageCircle,
    Star,
    Clock,
    FileCode,
    BookOpen
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { getProductBySlug, getProducts } from '@/lib/data';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Produk Tidak Ditemukan | Sellappku',
            description: 'Produk yang Anda cari tidak ditemukan.',
        };
    }

    return {
        title: `${product.title} | Sellappku`,
        description: product.short_description,
        openGraph: {
            title: product.title,
            description: product.short_description,
            type: 'website',
            images: product.thumbnail_url ? [product.thumbnail_url] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.short_description,
            images: product.thumbnail_url ? [product.thumbnail_url] : [],
        },
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const whatsappLink = generateWhatsAppLink(product.title);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/products"
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Kembali ke Katalog
                    </Link>
                    <div className="flex items-center space-x-2">
                        <span className="badge bg-white/20 text-white">{product.category}</span>
                        {product.is_featured && (
                            <span className="badge badge-amber">Featured</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Media */}
                    <div>
                        {/* Thumbnail */}
                        <div className="aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                            <Code2 className="h-24 w-24 text-violet-300 " />
                        </div>

                        {/* Video Demo Button */}
                        {product.video_url && (
                            <a
                                href={product.video_url ?? undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-transparent dark:border-gray-800 hover:shadow-md transition-shadow mb-6"
                            >
                                <div className="p-3 bg-red-500 rounded-full">
                                    <Play className="h-5 w-5 text-white fill-white" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    Lihat Video Demo
                                </span>
                            </a>
                        )}

                        {/* Live Demo Button */}
                        {product.demo_url && (
                            <a
                                href={product.demo_url ?? undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center space-x-2 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-transparent dark:border-gray-800 hover:shadow-md transition-shadow"
                            >
                                <ExternalLink className="h-5 w-5 text-violet-600" />
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    Lihat Demo Live
                                </span>
                            </a>
                        )}
                    </div>

                    {/* Right - Info */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {product.title}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            {product.short_description}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline space-x-3 mb-6">
                            <span className="text-4xl font-bold text-violet-600 ">
                                {product.price}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                One-time payment
                            </span>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tech_stack?.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary flex-1"
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Beli via WhatsApp
                            </a>
                        </div>

                        {/* What's Included */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                Yang Anda Dapatkan:
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { icon: FileCode, text: 'Full Source Code (Commented)' },
                                    { icon: BookOpen, text: 'Dokumentasi Instalasi' },
                                    { icon: Play, text: 'Video Tutorial Setup' },
                                    { icon: MessageCircle, text: '30 Hari Support WhatsApp' },
                                    { icon: Star, text: 'Update Gratis (Minor)' },
                                    { icon: Clock, text: 'Lisensi Lifetime' },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center space-x-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            Fitur Lengkap
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800"
                                >
                                    <div className="inline-flex p-3 bg-violet-100 rounded-xl mb-4">
                                        <CheckCircle2 className="h-6 w-6 text-violet-600 " />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                {product.description && (
                    <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-transparent dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Deskripsi Lengkap
                        </h2>
                        <div className="prose prose-gray max-w-none">
                            {product.description.split('\n').map((line, i) => {
                                if (line.startsWith('# ')) {
                                    return <h2 key={i} className="text-2xl font-bold mt-6 mb-4">{line.replace('# ', '')}</h2>;
                                }
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

                {/* FAQ */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Pertanyaan Umum
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Apakah bisa custom sesuai kebutuhan?',
                                a: 'Ya, source code bisa Anda modifikasi sesuai kebutuhan. Untuk customization yang kompleks, silakan konsultasi via WhatsApp.',
                            },
                            {
                                q: 'Berapa lama support via WhatsApp?',
                                a: 'Support via WhatsApp berlaku 30 hari sejak pembelian untuk bantuan instalasi dan troubleshooting.',
                            },
                            {
                                q: 'Bagaimana cara pengiriman source code?',
                                a: 'Source code dikirim via Google Drive link atau GitHub repository setelah pembayaran dikonfirmasi.',
                            },
                            {
                                q: 'Apakah ada garansi?',
                                a: 'Ya, kami garansi source code berfungsi sesuai demo. Jika ada error, akan kami bantu perbaiki.',
                            },
                        ].map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-transparent dark:border-gray-800"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
