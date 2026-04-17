'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Gamepad2,
    Star,
    Download,
    Filter,
    X,
    Grid3X3,
    Loader2,
    ArrowRight,
    Swords,
    Brain,
    Puzzle,
    Wand2,
    Sparkles,
    GraduationCap,
    MoreHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import { Game } from '@/lib/supabase';
import { getGames } from '@/lib/data';

const genres = [
    { slug: 'all', name: 'Semua', icon: Grid3X3 },
    { slug: 'simulation', name: 'Simulation', icon: Gamepad2 },
    { slug: 'strategy', name: 'Strategy', icon: Brain },
    { slug: 'action', name: 'Action', icon: Swords },
    { slug: 'puzzle', name: 'Puzzle', icon: Puzzle },
    { slug: 'rpg', name: 'RPG', icon: Wand2 },
    { slug: 'casual', name: 'Casual', icon: Sparkles },
    { slug: 'educational', name: 'Educational', icon: GraduationCap },
    { slug: 'other', name: 'Other', icon: MoreHorizontal },
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

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    useEffect(() => {
        async function fetchGames() {
            try {
                const data = await getGames();
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, []);

    const filteredGames = useMemo(() => {
        return games.filter((game) => {
            const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.short_description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
            return matchesSearch && matchesGenre;
        });
    }, [games, searchQuery, selectedGenre]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4">
                        🎮 Game Collection
                    </h1>
                    <p className="text-lg text-emerald-100 text-center max-w-2xl mx-auto mb-8">
                        Koleksi game buatan developer Indonesia — download langsung dan mainkan!
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari game..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar — Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Genre
                            </h3>
                            <ul className="space-y-2">
                                {genres.map((genre) => (
                                    <li key={genre.slug}>
                                        <button
                                            onClick={() => setSelectedGenre(genre.slug)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedGenre === genre.slug
                                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 '
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 '
                                                }`}
                                        >
                                            <genre.icon className="h-5 w-5" />
                                            <span className="font-medium">{genre.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <div className="lg:hidden flex items-center justify-between mb-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            {loading ? 'Memuat...' : `${filteredGames.length} game ditemukan`}
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
                            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Genre</h3>
                                    <button onClick={() => setShowMobileFilter(false)}>
                                        <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>
                                <ul className="space-y-2">
                                    {genres.map((genre) => (
                                        <li key={genre.slug}>
                                            <button
                                                onClick={() => {
                                                    setSelectedGenre(genre.slug);
                                                    setShowMobileFilter(false);
                                                }}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedGenre === genre.slug
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 '
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 '
                                                    }`}
                                            >
                                                <genre.icon className="h-5 w-5" />
                                                <span className="font-medium">{genre.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Games Grid */}
                    <div className="flex-1">
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <p className="text-gray-600 dark:text-gray-400">
                                {loading ? 'Memuat game...' : `${filteredGames.length} game ditemukan`}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
                                <span className="ml-3 text-gray-600 dark:text-gray-400">Memuat game...</span>
                            </div>
                        ) : filteredGames.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredGames.map((game) => {
                                    const badge = getDownloadBadge(game.download_type);
                                    return (
                                        <Link
                                            key={game.id}
                                            href={`/games/${game.slug}`}
                                            className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent dark:border-gray-800 card-hover"
                                        >
                                            <div className="relative aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 overflow-hidden">
                                                {game.thumbnail_url ? (
                                                    <Image
                                                        src={game.thumbnail_url}
                                                        alt={game.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Gamepad2 className="h-16 w-16 text-emerald-300 dark:text-emerald-700" />
                                                    </div>
                                                )}
                                                {game.is_featured && (
                                                    <div className="absolute top-4 right-4 z-10">
                                                        <span className="badge badge-amber">Featured</span>
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4 z-10">
                                                    <span className={`badge ${badge.color}`}>{badge.label}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md capitalize">
                                                        {game.genre}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-amber-500">
                                                        <Star className="h-3.5 w-3.5 fill-current" />
                                                        <span className="text-xs font-bold">{game.rating}</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {game.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                    {game.short_description}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                        <Download className="h-4 w-4" />
                                                        <span className="text-sm">{game.downloads}</span>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Gamepad2 className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Tidak ada game ditemukan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Coba ubah kata kunci pencarian atau filter genre
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedGenre('all');
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
