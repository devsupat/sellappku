'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Code2 } from 'lucide-react';
import { FeatureManager, Feature } from './feature-manager';
import { ScreenshotManager } from './screenshot-manager';

interface ProductFormData {
    title: string;
    slug: string;
    short_description: string;
    description: string;
    price: string;
    category: string;
    thumbnail_url: string;
    demo_url: string;
    video_url: string;
    is_featured: boolean;
    is_active: boolean;
    tech_stack: string[];
    features: Feature[];
    screenshots: string[];
}

interface ProductFormProps {
    initialData?: Partial<ProductFormData>;
    onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        short_description: initialData?.short_description || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        category: initialData?.category || 'SaaS',
        thumbnail_url: initialData?.thumbnail_url || '',
        demo_url: initialData?.demo_url || '',
        video_url: initialData?.video_url || '',
        is_featured: initialData?.is_featured || false,
        is_active: initialData?.is_active ?? true,
        tech_stack: initialData?.tech_stack || [],
        features: initialData?.features || [],
        screenshots: initialData?.screenshots || [],
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
        const updated: Partial<ProductFormData> = { title: value };
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
            router.push('/admin/products');
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

    const removeTech = (tech: string) => {
        setFormData({ ...formData, tech_stack: formData.tech_stack.filter((t: string) => t !== tech) });
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
                        placeholder="e.g. Sistem Absensi QR"
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
                        placeholder="e.g. sistem-absensi-qr"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price Label</label>
                    <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="e.g. Rp 499.000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="SaaS">SaaS</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Portfolio">Portfolio</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                <textarea
                    required
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-20"
                    placeholder="Short summary for card view..."
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description / Detailed Marketing Copy (Markdown supported)</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[200px]"
                    placeholder="Full product descriptions, features, requirements..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thumbnail URL</label>
                    <input
                        type="url"
                        required
                        value={formData.thumbnail_url}
                        onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo URL</label>
                    <input
                        type="url"
                        value={formData.demo_url}
                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="https://example.com/demo"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Video URL</label>
                <input
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="https://youtube.com/..."
                />
            </div>

                <FeatureManager 
                    features={formData.features} 
                    onChange={(features) => setFormData({ ...formData, features })} 
                />

                <ScreenshotManager 
                    screenshots={formData.screenshots} 
                    onChange={(screenshots) => setFormData({ ...formData, screenshots })} 
                />

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tech Stack</label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Add tech (e.g. Next.js)..."
                    />
                    <button
                        type="button"
                        onClick={addTech}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.tech_stack.map((tech: string) => (
                        <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                            {tech}
                            <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-500"><Plus className="h-3 w-3 rotate-45" /></button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Product</span>
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
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Code2 className="h-5 w-5" />}
                {initialData ? 'Update Product' : 'Create Product'}
            </button>
        </form>
    );
}
