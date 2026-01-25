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
import Image from 'next/image';
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section - Clean & Minimal like rekberin */}
      <section className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              <span className="gradient-text block mb-2 sm:mb-4">Source Code & Aplikasi</span>
              Siap Pakai, <span className="text-indigo-600 dark:text-indigo-400">Lisensi Lifetime</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Temukan source code siap pakai, aplikasi mobile, dan layanan web dari developer terpercaya.
              Semua dengan lisensi lifetime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Jelajahi Produk
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={generateWhatsAppLinkGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <feature.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Jelajahi Kategori
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <cat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cat.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Produk Terbaru
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Source code terlaris dari penjual terverifikasi
              </p>
            </div>
            <Link
              href="/products"
              className="text-indigo-600 font-medium text-sm hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map((product: Product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              >
                <div className="relative aspect-video bg-gradient-to-br from-indigo-50 to-violet-50 overflow-hidden">
                  {product.thumbnail_url ? (
                    <Image
                      src={product.thumbnail_url}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 className="h-12 w-12 text-indigo-200" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Aplikasi Mobile
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download atau jadi tester resmi
              </p>
            </div>
            <Link
              href="/apps"
              className="text-indigo-600 font-medium text-sm hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredApps.slice(0, 3).map((app: App) => (
              <Link
                key={app.id}
                href={`/apps/${app.slug}`}
                className="group flex gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl overflow-hidden flex items-center justify-center relative">
                  {app.thumbnail_url ? (
                    <Image
                      src={app.thumbnail_url}
                      alt={app.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <Smartphone className="h-8 w-8 text-indigo-300" />
                  )}
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
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Yang Anda Dapatkan
            </h2>
            <p className="text-indigo-200">
              Semua produk dilengkapi dengan dokumentasi dan support
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-6">
            <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Siap Mewujudkan Ide Anda?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Konsultasi gratis tanpa komitmen. Ceritakan kebutuhan Anda.
          </p>
          <a
            href={generateWhatsAppLinkGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Chat via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
