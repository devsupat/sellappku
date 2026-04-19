'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Gamepad2 } from 'lucide-react';
import { StringListManager } from './string-list-manager';
import { ScreenshotManager, Screenshot } from './screenshot-manager';

function normalizeScreenshots(raw: (Screenshot | string)[] | null | undefined): Screenshot[] {
    if (!raw) return [];
    return raw.map((s) => (typeof s === 'string' ? { url: s, caption: '' } : s));
}

const GENRE_OPTIONS = [
    { value: 'simulation', label: 'Simulation' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'action', label: 'Action' },
    { value: 'puzzle', label: 'Puzzle' },
    { value: 'rpg', label: 'RPG' },
    { value: 'casual', label: 'Casual' },
    { value: 'educational', label: 'Educational' },
    { value: 'other', label: 'Other' },
];

const PLATFORM_OPTIONS = [
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'iOS' },
    { value: 'web', label: 'Web / HTML5' },
    { value: 'pc', label: 'PC' },
    { value: 'cross-platform', label: 'Cross-Platform' },
];

const DOWNLOAD_TYPE_OPTIONS = [
    { value: 'playstore', label: 'Play Store' },
    { value: 'drive', label: 'Google Drive' },
    { value: 'mediafire', label: 'Mediafire' },
    { value: 'other', label: 'Other' },
];

interface GameFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
}

export function GameForm({ initialData, onSubmit }: GameFormProps) {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        short_description: initialData?.short_description || '',
        description: initialData?.description || '',
        genre: initialData?.genre || 'other',
        platform: initialData?.platform || 'android',
        thumbnail_url: initialData?.thumbnail_url || '',
        download_url: initialData?.download_url || '',
        download_type: initialData?.download_type || 'playstore',
        rating: initialData?.rating || 4.5,
        downloads: initialData?.downloads || '100+',
        version: initialData?.version || '1.0.0',
        size: initialData?.size || '50 MB',
        is_featured: initialData?.is_featured || false,
        is_active: initialData?.is_active ?? true,
        features: initialData?.features || [],
        screenshots: normalizeScreenshots(initialData?.screenshots),
    });

    const sanitizeSlug = (value: string) =>
        value
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

    const handleTitleChange = (value: string) => {
        const updated: any = { title: value };
        if (!initialData?.slug) {
            updated.slug = sanitizeSlug(value);
        }
        setFormData({ ...formData, ...updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setServerError(null);
        try {
            const result = await onSubmit(formData);
            if (!result.success) {
                setServerError(result.error || 'Terjadi kesalahan saat menyimpan data.');
                return;
            }
            router.push('/admin/games');
        } catch (e) {
            setServerError('Terjadi kesalahan yang tidak terduga. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            {serverError && (
                <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium">
                    {serverError}
                </div>
            )}
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="Kebun Sawit Simulator"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
                    <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: sanitizeSlug(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="kebun-sawit-simulator"
                    />
                </div>
            </div>

            {/* Short Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Description *</label>
                <textarea
                    required
                    rows={2}
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                    placeholder="Deskripsi singkat game..."
                />
            </div>

            {/* Full Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Description</label>
                <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                    placeholder="Deskripsi lengkap game. Gunakan ## untuk heading dan - untuk bullet points."
                />
            </div>

            {/* Genre, Platform, Download Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Genre *</label>
                    <select
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                        {GENRE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Platform *</label>
                    <select
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                        {PLATFORM_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Download Type *</label>
                    <select
                        value={formData.download_type}
                        onChange={(e) => setFormData({ ...formData, download_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    >
                        {DOWNLOAD_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Thumbnail & Download URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thumbnail URL</label>
                    <input
                        type="url"
                        value={formData.thumbnail_url}
                        onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="https://i.imgur.com/..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Download URL</label>
                    <input
                        type="url"
                        value={formData.download_url}
                        onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="https://play.google.com/store/apps/..."
                    />
                </div>
            </div>

            {/* Metadata: Rating, Downloads, Version, Size */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Downloads</label>
                    <input
                        type="text"
                        value={formData.downloads}
                        onChange={(e) => setFormData({ ...formData, downloads: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="100K+"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Version</label>
                    <input
                        type="text"
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="1.0.0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Size</label>
                    <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="50 MB"
                    />
                </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                <StringListManager
                    label="Fitur Utama"
                    placeholder="Contoh: Multiplayer Online"
                    items={formData.features}
                    onChange={(features) => setFormData({ ...formData, features })}
                />
            </div>

            {/* Screenshots */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                <ScreenshotManager
                    screenshots={formData.screenshots}
                    onChange={(screenshots) => setFormData({ ...formData, screenshots })}
                />
            </div>

            {/* Flags */}
            <div className="flex gap-6 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Gamepad2 className="h-5 w-5" />}
                {initialData ? 'Update Game' : 'Create Game'}
            </button>
        </form>
    );
}
