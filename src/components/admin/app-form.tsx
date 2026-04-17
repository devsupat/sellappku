'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Smartphone, Plus } from 'lucide-react';

interface AppFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
}

export function AppForm({ initialData, onSubmit }: AppFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        short_description: initialData?.short_description || '',
        description: initialData?.description || '',
        thumbnail_url: initialData?.thumbnail_url || '',
        download_type: initialData?.download_type || 'playstore',
        download_url: initialData?.download_url || '',
        has_tester: initialData?.has_tester || false,
        tester_group_url: initialData?.tester_group_url || '',
        tester_invite_url: initialData?.tester_invite_url || '',
        rating: initialData?.rating || 4.8,
        downloads: initialData?.downloads || '100+',
        version: initialData?.version || '1.0.0',
        size: initialData?.size || '24 MB',
        is_featured: initialData?.is_featured || false,
        is_active: initialData?.is_active ?? true,
        features: initialData?.features || [],
    });

    const [newFeature, setNewFeature] = useState('');

    // Auto-sanitize slug: lowercase, spaces to hyphens, remove special chars
    const sanitizeSlug = (value: string) =>
        value
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

    // Auto-generate slug from title if slug is empty
    const handleTitleChange = (value: string) => {
        const updated: any = { title: value };
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
            router.push('/admin/apps');
            router.refresh();
        } catch (error) {
            alert('Terjadi kesalahan saat menyimpan data');
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        if (newFeature && !formData.features.includes(newFeature)) {
            setFormData({ ...formData, features: [...formData.features, newFeature] });
            setNewFeature('');
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
                        placeholder="contoh: si-ujian-app"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono text-sm"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Download Type</label>
                    <select
                        value={formData.download_type}
                        onChange={(e) => setFormData({ ...formData, download_type: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="playstore">Play Store</option>
                        <option value="drive">Google Drive</option>
                        <option value="mediafire">Mediafire</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Download URL</label>
                    <input
                        type="url"
                        required
                        value={formData.download_url}
                        onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.has_tester}
                        onChange={(e) => setFormData({ ...formData, has_tester: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Need Tasters</span>
                </label>
            </div>

            {formData.has_tester && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30">
                    <div>
                        <label className="block text-sm font-semibold text-amber-900 dark:text-amber-400 mb-2">Tester Group URL</label>
                        <input
                            type="url"
                            value={formData.tester_group_url}
                            onChange={(e) => setFormData({ ...formData, tester_group_url: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-amber-900 dark:text-amber-400 mb-2">Tester Invite URL</label>
                        <input
                            type="url"
                            value={formData.tester_invite_url}
                            onChange={(e) => setFormData({ ...formData, tester_invite_url: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Smartphone className="h-5 w-5" />}
                {initialData ? 'Update App' : 'Create App'}
            </button>
        </form>
    );
}
