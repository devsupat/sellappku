'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Globe, Plus } from 'lucide-react';
import { StringListManager } from './string-list-manager';

interface WebFormData {
    title: string;
    slug: string;
    short_description: string;
    description: string;
    thumbnail_url: string;
    demo_url: string;
    price_source_code: string;
    price_subscription: string;
    tech_stack: string[];
    features: string[];
    is_featured: boolean;
    is_active: boolean;
}

interface WebFormProps {
    initialData?: Partial<WebFormData>;
    onSubmit: (data: WebFormData) => Promise<void>;
}

export function WebForm({ initialData, onSubmit }: WebFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        short_description: initialData?.short_description || '',
        description: initialData?.description || '',
        thumbnail_url: initialData?.thumbnail_url || '',
        demo_url: initialData?.demo_url || '',
        price_source_code: initialData?.price_source_code || '',
        price_subscription: initialData?.price_subscription || '',
        tech_stack: initialData?.tech_stack || [],
        features: initialData?.features || [],
        is_featured: initialData?.is_featured || false,
        is_active: initialData?.is_active ?? true,
    });

    const [newTech, setNewTech] = useState('');

    // Auto-sanitize slug: lowercase, spaces to hyphens, remove special chars
    const sanitizeSlug = (value: string) =>
        value
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

    // Auto-generate slug from title if creating new
    const handleTitleChange = (value: string) => {
        const updated: Partial<WebFormData> = { title: value };
        if (!initialData?.slug) {
            updated.slug = sanitizeSlug(value);
        }
        setFormData((prev) => ({ ...prev, ...updated }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            router.push('/admin/webs');
            router.refresh();
        } catch {
            alert('Terjadi kesalahan saat menyimpan data');
        } finally {
            setLoading(false);
        }
    };

    const addTech = () => {
        if (newTech && !formData.tech_stack.includes(newTech)) {
            setFormData({ ...formData, tech_stack: [...formData.tech_stack, newTech] });
            setNewTech('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Slug <span className="text-xs font-normal text-gray-400">(huruf kecil, strip, tanpa spasi)</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: sanitizeSlug(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price Source Code</label>
                    <input
                        type="text"
                        required
                        value={formData.price_source_code}
                        onChange={(e) => setFormData({ ...formData, price_source_code: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="e.g. Rp 750.000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price Lifetime License</label>
                    <input
                        type="text"
                        required
                        value={formData.price_subscription}
                        onChange={(e) => setFormData({ ...formData, price_subscription: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="e.g. Rp 149.000"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                <textarea
                    required
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-20"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description / Detailed Copy (Markdown supported)</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[200px]"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thumbnail URL</label>
                <input
                    type="url"
                    required
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo URL</label>
                <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tech Stack</label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <button type="button" onClick={addTech} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg font-bold">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.tech_stack.map((t: string) => (
                        <span key={t} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                <StringListManager 
                    label="Fitur Utama"
                    placeholder="Contoh: Admin Panel"
                    items={formData.features} 
                    onChange={(features) => setFormData({ ...formData, features })} 
                />
            </div>

            <div className="flex gap-6 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Globe className="h-5 w-5" />}
                {initialData ? 'Update Web Service' : 'Create Web Service'}
            </button>
        </form>
    );
}
