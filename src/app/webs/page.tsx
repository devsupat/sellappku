'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Globe,
    Code2,
    CreditCard,
    Filter,
    X,
    Loader2,
    ArrowRight
} from 'lucide-react';
import { Web } from '@/lib/supabase';
import { getWebs } from '@/lib/data';

export default function WebsPage() {
    const [webs, setWebs] = useState<Web[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch webs from Supabase
    useEffect(() => {
        async function fetchWebs() {
            try {
                const data = await getWebs();
                setWebs(data);
            } catch (error) {
                console.error('Error fetching webs:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchWebs();
    }, []);

    const filteredWebs = useMemo(() => {
        return webs.filter((web) => {
            const matchesSearch = web.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                web.short_description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [webs, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4">
                        Web Services
                    </h1>
                    <p className="text-lg text-emerald-100 text-center max-w-2xl mx-auto mb-8">
                        Layanan web siap pakai dengan lisensi lifetime. Pilih beli source code atau langsung pakai!
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari layanan web..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Info Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 py-6 border-b border-emerald-200 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <Code2 className="h-5 w-5 text-violet-600 " />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-500 ">Beli Source Code</p>
                                <p className="font-semibold text-gray-900 ">Full akses, modif sesuka hati</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-2xl text-gray-300">atau</div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <CreditCard className="h-5 w-5 text-emerald-600 " />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-500 ">Pakai Langsung</p>
                                <p className="font-semibold text-gray-900 ">1 lisensi = 1 device, lifetime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600 ">
                        {loading ? 'Memuat layanan...' : `${filteredWebs.length} layanan ditemukan`}
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                        <span className="ml-3 text-gray-600 ">Memuat layanan...</span>
                    </div>
                ) : filteredWebs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWebs.map((web) => (
                            <Link
                                key={web.id}
                                href={`/webs/${web.slug}`}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover"
                            >
                                <div className="relative aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
                                    {web.thumbnail_url ? (
                                        <img
                                            src={web.thumbnail_url}
                                            alt={web.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Globe className="h-16 w-16 text-emerald-300" />
                                        </div>
                                    )}
                                    {web.is_featured && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className="badge badge-amber">Featured</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                        {web.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {web.short_description}
                                    </p>

                                    {/* Dual Pricing */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 flex items-center gap-1">
                                                <Code2 className="h-4 w-4" /> Source Code
                                            </span>
                                            <span className="font-bold text-violet-600 ">
                                                {web.price_source_code}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 flex items-center gap-1">
                                                <CreditCard className="h-4 w-4" /> Pakai/License
                                            </span>
                                            <span className="font-bold text-emerald-600 ">
                                                {web.price_subscription}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {web.tech_stack?.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded-lg text-gray-600 ">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Tidak ada layanan ditemukan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Coba ubah kata kunci pencarian
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="btn btn-secondary"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
