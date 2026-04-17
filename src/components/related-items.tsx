import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code2, Smartphone, Globe, Gamepad2 } from 'lucide-react';
import { Product, App, Web, Game } from '@/lib/supabase';

interface RelatedItemsProps {
    title: string;
    items: (Product | App | Web | Game)[];
    type: 'products' | 'apps' | 'webs' | 'games';
}

export function RelatedItems({ title, items, type }: RelatedItemsProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-12 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h2>
                <Link
                    href={`/${type}`}
                    className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline flex items-center gap-1"
                >
                    Lihat Semua <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${type}/${item.slug}`}
                        className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                    >
                        <div className="relative aspect-video bg-gradient-to-br from-indigo-50 to-violet-50 overflow-hidden">
                            {item.thumbnail_url ? (
                                <Image
                                    src={item.thumbnail_url}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {type === 'products' ? (
                                        <Code2 className="h-12 w-12 text-indigo-200" />
                                    ) : type === 'apps' ? (
                                        <Smartphone className="h-12 w-12 text-indigo-200" />
                                    ) : type === 'games' ? (
                                        <Gamepad2 className="h-12 w-12 text-indigo-200" />
                                    ) : (
                                        <Globe className="h-12 w-12 text-indigo-200" />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                                {item.short_description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                    {'price' in item ? item.price :
                                        'price_subscription' in item ? item.price_subscription :
                                            'Free Download'}
                                </span>
                                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
