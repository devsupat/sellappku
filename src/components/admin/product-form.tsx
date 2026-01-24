'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/supabase';
import { createProduct, updateProduct } from '@/app/actions/products';
import { Save, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface ProductFormProps {
 initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState<Partial<Product>>(
 initialData || {
 title: '',
 slug: '',
 short_description: '',
 description: '',
 price: '',
 category: 'Web Apps',
 tech_stack: [],
 features: [],
 thumbnail_url: '',
 screenshots: [],
 demo_url: '',
 is_featured: false,
 is_active: true,
 }
 );

 const [newTech, setNewTech] = useState('');
 const [newFeature, setNewFeature] = useState({ title: '', description: '' });
 const [newScreenshot, setNewScreenshot] = useState({ url: '', caption: '' });

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 try {
 if (initialData?.id) {
 await updateProduct(initialData.id, formData);
 } else {
 await createProduct(formData);
 }
 router.push('/admin/products');
 router.refresh();
 } catch (error) {
 console.error('Error saving product:', error);
 alert('Error saving product');
 } finally {
 setLoading(false);
 }
 };

 const addTech = () => {
 if (newTech && !formData.tech_stack?.includes(newTech)) {
 setFormData({
 ...formData,
 tech_stack: [...(formData.tech_stack || []), newTech],
 });
 setNewTech('');
 }
 };

 const removeTech = (tech: string) => {
 setFormData({
 ...formData,
 tech_stack: formData.tech_stack?.filter((t) => t !== tech),
 });
 };

 const addFeature = () => {
 if (newFeature.title && newFeature.description) {
 setFormData({
 ...formData,
 features: [...(formData.features || []), newFeature],
 });
 setNewFeature({ title: '', description: '' });
 }
 };

 const removeFeature = (index: number) => {
 setFormData({
 ...formData,
 features: formData.features?.filter((_, i) => i !== index),
 });
 };

 const addScreenshot = () => {
 if (newScreenshot.url) {
 setFormData({
 ...formData,
 screenshots: [...(formData.screenshots || []), newScreenshot],
 });
 setNewScreenshot({ url: '', caption: '' });
 }
 };

 const removeScreenshot = (index: number) => {
 setFormData({
 ...formData,
 screenshots: formData.screenshots?.filter((_, i) => i !== index),
 });
 };

 return (
 <form onSubmit={handleSubmit} className="space-y-8">
 <div className="grid grid-cols-1 md gap-8">
 {/* Basic Info */}
 <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">Basic Information</h3>

 <div>
 <label className="block text-sm font-medium mb-1">Title</label>
 <input
 type="text"
 required
 value={formData.title}
 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="E.g. POS System"
 />
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Slug</label>
 <input
 type="text"
 required
 value={formData.slug}
 onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="e.g. pos-system"
 />
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Price</label>
 <input
 type="text"
 required
 value={formData.price}
 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="e.g. Rp 250.000"
 />
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Category</label>
 <select
 value={formData.category}
 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 >
 <option value="Web Apps">Web Apps</option>
 <option value="Mobile Apps">Mobile Apps</option>
 <option value="Admin Dashboard">Admin Dashboard</option>
 <option value="E-commerce">E-commerce</option>
 </select>
 </div>

 <div className="flex items-center gap-4">
 <label className="flex items-center gap-2 cursor-pointer">
 <input
 type="checkbox"
 checked={formData.is_featured}
 onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
 className="w-4 h-4 rounded text-indigo-600"
 />
 <span className="text-sm font-medium">Featured</span>
 </label>
 <label className="flex items-center gap-2 cursor-pointer">
 <input
 type="checkbox"
 checked={formData.is_active}
 onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
 className="w-4 h-4 rounded text-indigo-600"
 />
 <span className="text-sm font-medium">Active</span>
 </label>
 </div>
 </div>

 {/* Media */}
 <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">Media (URLs)</h3>

 <div>
 <label className="block text-sm font-medium mb-1 text-amber-600 flex items-center gap-2">
 <ImageIcon className="h-4 w-4" /> Thumbnail URL
 </label>
 <input
 type="text"
 required
 value={formData.thumbnail_url}
 onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="https://example.com/image.jpg"
 />
 {formData.thumbnail_url && (
 <img src={formData.thumbnail_url} alt="Preview" className="mt-2 h-20 w-auto rounded-lg" />
 )}
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Demo URL</label>
 <input
 type="text"
 value={formData.demo_url || ''}
 onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="https://demo.example.com"
 />
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Screenshots</label>
 <div className="space-y-2 mb-4">
 {formData.screenshots?.map((ss, idx) => (
 <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
 <img src={ss.url} alt="" className="h-8 w-8 object-cover rounded" />
 <span className="text-xs truncate flex-1">{ss.url}</span>
 <button type="button" onClick={() => removeScreenshot(idx)} className="text-red-500 p-1">
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 ))}
 </div>
 <div className="flex flex-col gap-2">
 <input
 type="text"
 value={newScreenshot.url}
 onChange={(e) => setNewScreenshot({ ...newScreenshot, url: e.target.value })}
 className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent"
 placeholder="Screenshot URL"
 />
 <input
 type="text"
 value={newScreenshot.caption}
 onChange={(e) => setNewScreenshot({ ...newScreenshot, caption: e.target.value })}
 className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent"
 placeholder="Caption (Optional)"
 />
 <button
 type="button"
 onClick={addScreenshot}
 className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
 >
 <Plus className="h-4 w-4" /> Add Screenshot
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Descriptions */}
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">Descriptions</h3>
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">Short Description</label>
 <input
 type="text"
 required
 value={formData.short_description}
 onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="Brief summary..."
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Full Description (Optional)</label>
 <textarea
 value={formData.description || ''}
 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent h-32"
 placeholder="Detailed description..."
 />
 </div>
 </div>
 </div>

 {/* Dynamic Arrays */}
 <div className="grid grid-cols-1 md gap-8">
 {/* Tech Stack */}
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
 <div className="flex gap-2 mb-4">
 <input
 type="text"
 value={newTech}
 onChange={(e) => setNewTech(e.target.value)}
 className="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="e.g. Next.js"
 />
 <button
 type="button"
 onClick={addTech}
 className="bg-gray-100 p-2 rounded-xl hover"
 >
 <Plus className="h-6 w-6" />
 </button>
 </div>
 <div className="flex flex-wrap gap-2">
 {formData.tech_stack?.map((tech) => (
 <span
 key={tech}
 className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
 >
 {tech}
 <button type="button" onClick={() => removeTech(tech)}>
 <X className="h-3 w-3" />
 </button>
 </span>
 ))}
 </div>
 </div>

 {/* Features */}
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">Features</h3>
 <div className="space-y-4 mb-4">
 {formData.features?.map((f, idx) => (
 <div key={idx} className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-xl">
 <div>
 <div className="font-bold text-sm">{f.title}</div>
 <div className="text-xs text-gray-500">{f.description}</div>
 </div>
 <button type="button" onClick={() => removeFeature(idx)} className="text-red-500">
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 ))}
 </div>
 <div className="space-y-2">
 <input
 type="text"
 value={newFeature.title}
 onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
 className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent"
 placeholder="Feature Title"
 />
 <input
 type="text"
 value={newFeature.description}
 onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
 className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent"
 placeholder="Feature Description"
 />
 <button
 type="button"
 onClick={addFeature}
 className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
 >
 <Plus className="h-4 w-4" /> Add Feature
 </button>
 </div>
 </div>
 </div>

 <div className="flex justify-end gap-4 pb-12">
 <button
 type="button"
 onClick={() => router.back()}
 className="px-8 py-3 rounded-xl border border-gray-200 font-bold hover"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={loading}
 className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold hover shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
 >
 {loading ? (
 <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 <Save className="h-5 w-5" />
 )}
 {initialData ? 'Update Product' : 'Create Product'}
 </button>
 </div>
 </form>
 );
}
