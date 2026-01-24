'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Smartphone,
    Download,
    TestTube,
    Star,
    Filter,
    X,
    Grid3X3,
    Loader2
} from 'lucide-react';
import { App } from '@/lib/supabase';
import { getApps } from '@/lib/data';

const downloadTypes = [
    { slug: 'all', name: 'Semua' },
    { slug: 'playstore', name: 'Play Store' },
    { slug: 'drive', name: 'Google Drive' },
    { slug: 'mediafire', name: 'Mediafire' },
];

function getDownloadBadge(type: string) {
    switch (type) {
        case 'playstore':
            return { label: 'Play Store', color: 'badge-emerald' };
        case 'drive':
            return { label: 'Google Drive', color: 'badge-indigo' };
        case 'mediafire':
            return { label: 'Mediafire', color: 'badge-violet' };
        default:
            return { label: 'Download', color: 'badge-violet' };
    }
}

export default function AppsPage() {
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [showTesterOnly, setShowTesterOnly] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Fetch apps from Supabase
    useEffect(() => {
        async function fetchApps() {
            try {
                const data = await getApps();
                setApps(data);
            } catch (error) {
                console.error('Error fetching apps:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchApps();
    }, []);

    const filteredApps = useMemo(() => {
        return apps.filter((app) => {
            const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.short_description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'all' || app.download_type === selectedType;
            const matchesTester = !showTesterOnly || app.has_tester;
            return matchesSearch && matchesType && matchesTester;
        });
    }, [apps, searchQuery, selectedType, showTesterOnly]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4">
                        Aplikasi & Games
                    </h1>
                    <p className="text-lg text-indigo-100 text-center max-w-2xl mx-auto mb-8">
                        Download aplikasi langsung dari Play Store atau dapatkan APK tester eksklusif
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari aplikasi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Platform
                            </h3>
                            <ul className="space-y-2 mb-6">
                                {downloadTypes.map((type) => (
                                    <li key={type.slug}>
                                        <button
                                            onClick={() => setSelectedType(type.slug)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedType === type.slug
                                                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            <Grid3X3 className="h-5 w-5" />
                                            <span className="font-medium">{type.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Tester Toggle */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showTesterOnly}
                                        onChange={(e) => setShowTesterOnly(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <TestTube className="h-5 w-5 text-amber-500" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            Tester Available
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden flex items-center justify-between mb-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            {loading ? 'Memuat...' : `${filteredApps.length} aplikasi ditemukan`}
                        </p>
                        <button
                            onClick={() => setShowMobileFilter(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
                        >
                            <Filter className="h-5 w-5" />
                            <span>Filter</span>
                        </button>
                    </div>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilter && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)}></div>
                            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Filter
                                    </h3>
                                    <button onClick={() => setShowMobileFilter(false)}>
                                        <X className="h-6 w-6 text-gray-500" />
                                    </button>
                                </div>
                                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Platform</h4>
                                <ul className="space-y-2 mb-6">
                                    {downloadTypes.map((type) => (
                                        <li key={type.slug}>
                                            <button
                                                onClick={() => {
                                                    setSelectedType(type.slug);
                                                }}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedType === type.slug
                                                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                    }`}
                                            >
                                                <span className="font-medium">{type.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showTesterOnly}
                                        onChange={(e) => setShowTesterOnly(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <TestTube className="h-5 w-5 text-amber-500" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            Tester Only
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Apps Grid */}
                    <div className="flex-1">
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <p className="text-gray-600 dark:text-gray-400">
                                {loading ? 'Memuat aplikasi...' : `${filteredApps.length} aplikasi ditemukan`}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                                <span className="ml-3 text-gray-600 dark:text-gray-400">Memuat aplikasi...</span>
                            </div>
                        ) : filteredApps.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredApps.map((app) => {
                                    const badge = getDownloadBadge(app.download_type);
                                    return (
                                        <Link
                                            key={app.id}
                                            href={`/apps/${app.slug}`}
                                            className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative aspect-video bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Smartphone className="h-16 w-16 text-indigo-300 dark:text-indigo-700" />
                                                </div>
                                                <div className="absolute top-4 left-4 flex gap-2">
                                                    <span className={`badge ${badge.color}`}>{badge.label}</span>
                                                </div>
                                                {app.has_tester && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className="badge badge-amber flex items-center gap-1">
                                                            <TestTube className="h-3 w-3" />
                                                            Tester
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {app.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                    {app.short_description}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center space-x-1 text-amber-500">
                                                        <Star className="h-4 w-4 fill-current" />
                                                        <span className="font-medium">{app.rating || 0}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                                                        <Download className="h-4 w-4" />
                                                        <span>{app.downloads || '0'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Smartphone className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Tidak ada aplikasi ditemukan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Coba ubah kata kunci pencarian atau filter
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedType('all');
                                        setShowTesterOnly(false);
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
        </div>
    );
}
