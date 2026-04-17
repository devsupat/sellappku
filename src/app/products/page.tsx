'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Code2,
    Grid3X3,
    ArrowRight,
    MessageCircle,
    X,
    Loader2
} from 'lucide-react';
import Image from 'next/image';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { Product, Game, App, Web } from '@/lib/supabase';
import { getProducts, getGames, getApps, getWebs } from '@/lib/data';

// Categories
const categories = [
    { slug: 'all', name: 'Semua', icon: Grid3X3 },
    { slug: 'web-apps', name: 'Web Apps', icon: Code2 },
    { slug: 'mobile-apps', name: 'Mobile Apps', icon: Code2 },
    { slug: 'admin-dashboards', name: 'Admin Dashboard', icon: Code2 },
    { slug: 'e-commerce', name: 'E-commerce', icon: Code2 },
    { slug: 'educational-tools', name: 'Educational Tools', icon: Code2 },
    { slug: 'games', name: 'Games', icon: Code2 },
];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [apps, setApps] = useState<App[]>([]);
    const [webs, setWebs] = useState<Web[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Fetch data from Supabase
    useEffect(() => {
        async function fetchData() {
            try {
                const [productsData, gamesData, appsData, websData] = await Promise.all([
                    getProducts(),
                    getGames(),
                    getApps(),
                    getWebs()
                ]);
                setProducts(productsData);
                setGames(gamesData);
                setApps(appsData);
                setWebs(websData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredItems = useMemo(() => {
        // Combine all data sources
        const allItems = [
            ...products.map(p => ({ ...p, type: 'product' as const })),
            ...games.map(g => ({ 
                ...g, 
                type: 'game' as const, 
                category: 'games', 
                price: g.downloads || 'Free Download'
            })),
            ...apps.map(a => ({
                ...a,
                type: 'app' as const,
                category: 'mobile-apps',
                price: a.downloads || 'Get App'
            })),
            ...webs.map(w => ({
                ...w,
                type: 'web' as const,
                category: 'web-apps',
                price: 'Services'
            }))
        ];

        return allItems.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.short_description.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [products, games, apps, webs, searchQuery, selectedCategory]);

    // Re-use current display logic but with filteredItems instead of filteredProducts
    const displayItems = filteredItems;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4">
                        Source Code Premium
                    </h1>
                    <p className="text-lg text-violet-100 text-center max-w-2xl mx-auto mb-8">
                        Semua source code siap pakai dengan dokumentasi lengkap dan lisensi lifetime
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari source code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Kategori
                            </h3>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li key={category.slug}>
                                        <button
                                            onClick={() => setSelectedCategory(category.slug)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === category.slug
                                                ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 '
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 '
                                                }`}
                                        >
                                            <category.icon className="h-5 w-5" />
                                            <span className="font-medium">{category.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden flex items-center justify-between mb-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            {loading ? 'Memuat...' : `${displayItems.length} produk ditemukan`}
                        </p>
                        <button
                            onClick={() => setShowMobileFilter(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
                        >
                            <Filter className="h-5 w-5" />
                            <span>Filter</span>
                        </button>
                    </div>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilter && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)}></div>
                            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Kategori
                                    </h3>
                                    <button onClick={() => setShowMobileFilter(false)}>
                                        <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>
                                <ul className="space-y-2">
                                    {categories.map((category) => (
                                        <li key={category.slug}>
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category.slug);
                                                    setShowMobileFilter(false);
                                                }}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === category.slug
                                                    ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 '
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 '
                                                    }`}
                                            >
                                                <category.icon className="h-5 w-5" />
                                                <span className="font-medium">{category.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <p className="text-gray-600 dark:text-gray-400">
                                {loading ? 'Memuat produk...' : `${displayItems.length} produk ditemukan`}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                                <span className="ml-3 text-gray-600 dark:text-gray-400">Memuat produk...</span>
                            </div>
                        ) : displayItems.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {displayItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={
                                            item.type === 'game' ? `/games/${item.slug}` : 
                                            item.type === 'app' ? `/apps/${item.slug}` :
                                            item.type === 'web' ? `/webs/${item.slug}` :
                                            `/products/${item.slug}`
                                        }
                                        className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent dark:border-gray-800 card-hover"
                                    >
                                        <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 overflow-hidden">
                                            {item.thumbnail_url ? (
                                                <Image
                                                    src={item.thumbnail_url}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Code2 className="h-16 w-16 text-violet-300" />
                                                </div>
                                            )}
                                            {item.is_featured && (
                                                <div className="absolute top-4 right-4 z-10">
                                                    <span className="badge badge-amber">Featured</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                {item.type === 'game' && (
                                                    <span className="text-[10px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full font-bold uppercase tracking-wider">
                                                        Game
                                                    </span>
                                                )}
                                                {item.type === 'app' && (
                                                    <span className="text-[10px] px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-bold uppercase tracking-wider">
                                                        App
                                                    </span>
                                                )}
                                                {item.type === 'web' && (
                                                    <span className="text-[10px] px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full font-bold uppercase tracking-wider">
                                                        Web
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                {item.short_description}
                                            </p>

                                            {/* Tech Stack / Genre */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.type === 'product' ? (
                                                    item.tech_stack?.slice(0, 3).map((tech, i) => (
                                                        <span key={i} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                                                            {tech}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                                                        {(item as any).genre}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                                                    {item.price}
                                                </span>
                                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Code2 className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Tidak ada produk ditemukan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Coba ubah kata kunci pencarian atau filter kategori
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white dark:bg-gray-950 py-16 border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Tidak menemukan yang Anda cari?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Hubungi saya untuk custom project atau request fitur khusus
                    </p>
                    <a
                        href={generateWhatsAppLink('Custom Project')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Konsultasi Gratis
                    </a>
                </div>
            </div>
        </div>
    );
}
