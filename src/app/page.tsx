import Link from 'next/link';
import {
 ArrowRight,
 Code2,
 Smartphone,
 Globe,
 Shield,
 Clock,
 CheckCircle2,
 Sparkles,
 MessageCircle,
 Users,
 Zap
} from 'lucide-react';
import { generateWhatsAppLinkGeneral } from '@/lib/whatsapp';
import { getFeaturedProducts, getFeaturedApps } from '@/lib/data';
import { Product, App } from '@/lib/supabase';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

const features = [
 {
 icon: Shield,
 title: 'Transaksi Aman',
 description: 'Semua produk langsung dari developer, tanpa perantara.',
 },
 {
 icon: Clock,
 title: 'Lisensi Lifetime',
 description: 'Bayar sekali, pakai selamanya tanpa biaya bulanan.',
 },
 {
 icon: MessageCircle,
 title: 'Support WhatsApp',
 description: 'Langsung chat untuk konsultasi dan bantuan teknis.',
 },
 {
 icon: Users,
 title: '200+ Happy Clients',
 description: 'Dipercaya developer dan bisnis di seluruh Indonesia.',
 },
];

const categories = [
 { icon: Code2, name: 'Source Code', href: '/products', description: 'Aplikasi siap pakai' },
 { icon: Smartphone, name: 'Mobile Apps', href: '/apps', description: 'Android & iOS' },
 { icon: Globe, name: 'Web Services', href: '/webs', description: 'Layanan online' },
];

export default async function HomePage() {
 const [featuredProducts, featuredApps] = await Promise.all([
 getFeaturedProducts(),
 getFeaturedApps()
 ]);

 return (
 <div className="min-h-screen bg-gray-50 ">
 {/* Hero Section - Clean & Minimal like rekberin */}
 <section className="bg-white border-b border-gray-100 ">
 <div className="max-w-7xl mx-auto px-4 sm lg py-16 lg">
 <div className="text-center max-w-4xl mx-auto">
 <h1 className="text-3xl sm lg font-bold text-gray-900 mb-6 leading-tight">
 Source Code <span className="text-indigo-600 ">Aplikasi Siap Pakai</span> Lisensi Lifetime
 <br />Tanpa Ribet
 </h1>
 <p className="text-lg lg text-gray-600 mb-8 max-w-2xl mx-auto">
 Temukan source code siap pakai, aplikasi mobile, dan layanan web dari developer terpercaya.
 Semua dengan lisensi lifetime.
 </p>
 <div className="flex flex-col sm items-center justify-center gap-4">
 <Link
 href="/products"
 className="w-full sm px-8 py-4 bg-indigo-600 hover text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
 >
 Jelajahi Produk
 <ArrowRight className="h-5 w-5" />
 </Link>
 <a
 href={generateWhatsAppLinkGeneral()}
 target="_blank"
 rel="noopener noreferrer"
 className="w-full sm px-8 py-4 bg-gray-100 hover text-gray-900 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
 >
 <MessageCircle className="h-5 w-5" />
 Konsultasi Gratis
 </a>
 </div>
 </div>
 </div>
 </section>

 {/* Features Section */}
 <section className="py-12 bg-white border-b border-gray-100 ">
 <div className="max-w-7xl mx-auto px-4 sm lg">
 <div className="grid grid-cols-2 lg gap-6">
 {features.map((feature, i) => (
 <div key={i} className="flex items-start gap-3 p-4">
 <div className="p-2 bg-indigo-100 rounded-lg">
 <feature.icon className="h-5 w-5 text-indigo-600" />
 </div>
 <div>
 <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
 <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Categories Section */}
 <section className="py-12">
 <div className="max-w-7xl mx-auto px-4 sm lg">
 <h2 className="text-xl font-bold text-gray-900 mb-6">
 Jelajahi Kategori
 </h2>
 <div className="grid md gap-4">
 {categories.map((cat, i) => (
 <Link
 key={i}
 href={cat.href}
 className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover hover transition-all"
 >
 <div className="p-3 bg-indigo-100 rounded-xl">
 <cat.icon className="h-6 w-6 text-indigo-600" />
 </div>
 <div>
 <h3 className="font-semibold text-gray-900 ">{cat.name}</h3>
 <p className="text-sm text-gray-500 ">{cat.description}</p>
 </div>
 <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* Featured Products Section */}
 <section className="py-12">
 <div className="max-w-7xl mx-auto px-4 sm lg">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h2 className="text-xl font-bold text-gray-900 ">
 Produk Terbaru
 </h2>
 <p className="text-sm text-gray-500 ">
 Source code terlaris dari penjual terverifikasi
 </p>
 </div>
 <Link
 href="/products"
 className="text-indigo-600 font-medium text-sm hover flex items-center gap-1"
 >
 Lihat Semua <ArrowRight className="h-4 w-4" />
 </Link>
 </div>

 <div className="grid md lg gap-4">
 {featuredProducts.slice(0, 4).map((product: Product) => (
 <Link
 key={product.id}
 href={`/products/${product.slug}`}
 className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover hover transition-all"
 >
 {/* Thumbnail */}
 <div className="aspect-video bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center">
 <Code2 className="h-12 w-12 text-indigo-200" />
 </div>

 {/* Content */}
 <div className="p-4">
 <span className="text-xs font-medium text-indigo-600 ">
 {product.category}
 </span>
 <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-1 group-hover transition-colors">
 {product.title}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-2 mb-3">
 {product.short_description}
 </p>
 <div className="flex items-center justify-between">
 <span className="text-lg font-bold text-indigo-600 ">
 {product.price}
 </span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* Featured Apps Section */}
 <section className="py-12">
 <div className="max-w-7xl mx-auto px-4 sm lg">
 <div className="flex items-center justify-between mb-6">
 <div>
 <h2 className="text-xl font-bold text-gray-900 ">
 Aplikasi Mobile
 </h2>
 <p className="text-sm text-gray-500 ">
 Download atau jadi tester resmi
 </p>
 </div>
 <Link
 href="/apps"
 className="text-indigo-600 font-medium text-sm hover flex items-center gap-1"
 >
 Lihat Semua <ArrowRight className="h-4 w-4" />
 </Link>
 </div>

 <div className="grid md lg gap-4">
 {featuredApps.slice(0, 3).map((app: App) => (
 <Link
 key={app.id}
 href={`/apps/${app.slug}`}
 className="group flex gap-4 bg-white p-4 rounded-2xl border border-gray-200 hover hover transition-all"
 >
 {/* Thumbnail */}
 <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center">
 <Smartphone className="h-8 w-8 text-indigo-300" />
 </div>

 {/* Content */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 mb-1">
 {app.download_type === 'playstore' && (
 <span className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-700 rounded">
 Play Store
 </span>
 )}
 {app.has_tester && (
 <span className="text-xs font-medium px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
 Tester
 </span>
 )}
 </div>
 <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover transition-colors">
 {app.title}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-1 mt-1">
 {app.short_description}
 </p>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* What You Get Section */}
 <section className="py-12 bg-indigo-600 ">
 <div className="max-w-7xl mx-auto px-4 sm lg">
 <div className="text-center mb-8">
 <h2 className="text-2xl font-bold text-white mb-2">
 Yang Anda Dapatkan
 </h2>
 <p className="text-indigo-200">
 Semua produk dilengkapi dengan dokumentasi dan support
 </p>
 </div>

 <div className="grid md lg gap-4">
 {[
 'Full Source Code',
 'Dokumentasi',
 'Video Tutorial',
 '30 Hari Support',
 'Update Gratis',
 'Lisensi Lifetime',
 ].map((item, index) => (
 <div
 key={index}
 className="flex items-center gap-2 p-3 rounded-xl bg-white/10"
 >
 <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
 <span className="text-sm font-medium text-white">{item}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="py-16 bg-white ">
 <div className="max-w-3xl mx-auto px-4 sm lg text-center">
 <div className="inline-flex p-3 bg-indigo-100 rounded-2xl mb-6">
 <Zap className="h-8 w-8 text-indigo-600" />
 </div>
 <h2 className="text-2xl lg font-bold text-gray-900 mb-4">
 Siap Mewujudkan Ide Anda?
 </h2>
 <p className="text-gray-600 mb-8">
 Konsultasi gratis tanpa komitmen. Ceritakan kebutuhan Anda.
 </p>
 <a
 href={generateWhatsAppLinkGeneral()}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover text-white font-semibold rounded-xl transition-colors"
 >
 <MessageCircle className="h-5 w-5" />
 Chat via WhatsApp
 </a>
 </div>
 </section>
 </div>
 );
}
