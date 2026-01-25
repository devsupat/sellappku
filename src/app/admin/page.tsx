import {
    Package,
    Smartphone,
    Globe,
    Megaphone,
    Plus,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

async function getStats() {
    const [products, apps, webs, announcements] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('apps').select('*', { count: 'exact', head: true }),
        supabase.from('webs').select('*', { count: 'exact', head: true }),
        supabase.from('announcements').select('*', { count: 'exact', head: true }),
    ]);

    return [
        {
            label: 'Products',
            count: products.count || 0,
            icon: Package,
            href: '/admin/products',
            color: 'bg-violet-100 text-violet-600',
        },
        {
            label: 'Apps',
            count: apps.count || 0,
            icon: Smartphone,
            href: '/admin/apps',
            color: 'bg-indigo-100 text-indigo-600',
        },
        {
            label: 'Web Services',
            count: webs.count || 0,
            icon: Globe,
            href: '/admin/webs',
            color: 'bg-cyan-100 text-cyan-600',
        },
        {
            label: 'Announcements',
            count: announcements.count || 0,
            icon: Megaphone,
            href: '/admin/announcements',
            color: 'bg-amber-100 text-amber-600',
        },
    ];
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Selamat datang di pusat kendali Sellappku.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Link
                        key={i}
                        href={stat.href}
                        className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-indigo-900/10 transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-xl ${stat.color} dark:bg-gray-800 dark:text-indigo-400`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <div className="flex items-center gap-1 mt-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                Manage <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/products/new"
                        className="flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg dark:shadow-indigo-900/20"
                    >
                        <Plus className="h-5 w-5" /> New Product
                    </Link>
                    <Link
                        href="/admin/apps/new"
                        className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                    >
                        <Plus className="h-5 w-5" /> New App
                    </Link>
                    <Link
                        href="/admin/webs/new"
                        className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                    >
                        <Plus className="h-5 w-5" /> New Web
                    </Link>
                    <Link
                        href="/admin/announcements"
                        className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                    >
                        <Plus className="h-5 w-5" /> New Message
                    </Link>
                </div>
            </div>
        </div>
    );
}
