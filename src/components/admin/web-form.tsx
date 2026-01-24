'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Web } from '@/lib/supabase';
import { createWeb, updateWeb } from '@/app/actions/webs';
import { Save, Plus, Trash2, Image as ImageIcon, Globe, CreditCard, X } from 'lucide-react';

interface WebFormProps {
 initialData?: Web;
}

export function WebForm({ initialData }: WebFormProps) {
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState<Partial<Web>>(
 initialData || {
 title: '',
 slug: '',
 short_description: '',
 description: '',
 thumbnail_url: '',
 screenshots: [],
 demo_url: '',
 price_source_code: 'Rp 500.000',
 price_subscription: 'Rp 50.000/bulan',
 tech_stack: [],
 features: [],
 is_featured: false,
 is_active: true,
 }
 );

 const [newTech, setNewTech] = useState('');
 const [newFeature, setNewFeature] = useState('');
 const [newScreenshot, setNewScreenshot] = useState({ url: '', caption: '' });

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 try {
 if (initialData?.id) {
 await updateWeb(initialData.id, formData);
 } else {
 await createWeb(formData);
 }
 router.push('/admin/webs');
 router.refresh();
 } catch (error) {
 console.error('Error saving web service:', error);
 alert('Error saving web service');
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
 if (newFeature && !formData.features?.includes(newFeature)) {
 setFormData({
 ...formData,
 features: [...(formData.features || []), newFeature],
 });
 setNewFeature('');
 }
 };

 const removeFeature = (feature: string) => {
 setFormData({
 ...formData,
 features: formData.features?.filter((f) => f !== feature),
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
 <form onSubmit={handleSubmit} className="space-y-8 pb-12">
 <div className="grid grid-cols-1 lg gap-8">
 {/* Left: General Info */}
 <div className="space-y-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
 <Globe className="h-5 w-5" /> Web Service Info
 </h3>
 <div className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="col-span-2">
 <label className="block text-sm font-medium mb-1">Title</label>
 <input
 type="text"
 required
 value={formData.title}
 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
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
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Demo URL</label>
 <input
 type="text"
 value={formData.demo_url || ''}
 onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 />
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
 <CreditCard className="h-5 w-5" /> Pricing
 </h3>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium mb-1">Source Code Price</label>
 <input
 type="text"
 required
 value={formData.price_source_code}
 onChange={(e) => setFormData({ ...formData, price_source_code: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="e.g. Rp 500.000"
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Subscription Price</label>
 <input
 type="text"
 required
 value={formData.price_subscription}
 onChange={(e) => setFormData({ ...formData, price_subscription: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="e.g. Rp 50.000/bln"
 />
 </div>
 </div>
 </div>

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
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Full Description</label>
 <textarea
 value={formData.description || ''}
 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent h-40"
 />
 </div>
 </div>
 </div>
 </div>

 {/* Right: Media and Extras */}
 <div className="space-y-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
 <ImageIcon className="h-5 w-5" /> Media (URLs Only)
 </h3>
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1 text-green-600">Thumbnail URL</label>
 <input
 type="text"
 required
 value={formData.thumbnail_url || ''}
 onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent text-sm"
 placeholder="https://i.ibb.co/..."
 />
 {formData.thumbnail_url && (
 <img src={formData.thumbnail_url} className="mt-2 h-24 w-full object-cover rounded-xl" />
 )}
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Screenshots</label>
 <div className="grid grid-cols-2 gap-2 mb-2">
 {formData.screenshots?.map((ss, idx) => (
 <div key={idx} className="relative group">
 <img src={ss.url} className="h-20 w-full object-cover rounded-lg border border-gray-100" />
 <button
 type="button"
 onClick={() => removeScreenshot(idx)}
 className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover transition-opacity"
 >
 <Trash2 className="h-3 w-3" />
 </button>
 </div>
 ))}
 </div>
 <input
 type="text"
 value={newScreenshot.url}
 onChange={(e) => setNewScreenshot({ ...newScreenshot, url: e.target.value })}
 className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent mb-2"
 placeholder="New Screenshot URL"
 />
 <button
 type="button"
 onClick={addScreenshot}
 className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold"
 >
 + Add Screenshot String
 </button>
 </div>
 </div>
 </div>

 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">Tech & Features</h3>
 <div className="space-y-6">
 <div>
 <label className="block text-sm font-medium mb-2">Tech Stack</label>
 <div className="flex gap-2 mb-2">
 <input
 type="text"
 value={newTech}
 onChange={(e) => setNewTech(e.target.value)}
 className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent"
 />
 <button type="button" onClick={addTech} className="p-2 bg-gray-100 rounded-xl">
 <Plus className="h-5 w-5" />
 </button>
 </div>
 <div className="flex flex-wrap gap-2">
 {formData.tech_stack?.map(t => (
 <span key={t} className="px-3 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-2">
 {t} <X className="h-3 w-3 cursor-pointer" onClick={() => removeTech(t)} />
 </span>
 ))}
 </div>
 </div>

 <div>
 <label className="block text-sm font-medium mb-2">Features</label>
 <div className="flex gap-2 mb-2">
 <input
 type="text"
 value={newFeature}
 onChange={(e) => setNewFeature(e.target.value)}
 className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-200 bg-transparent"
 />
 <button type="button" onClick={addFeature} className="p-2 bg-gray-100 rounded-xl">
 <Plus className="h-5 w-5" />
 </button>
 </div>
 <div className="flex flex-wrap gap-2">
 {formData.features?.map(f => (
 <span key={f} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs flex items-center gap-2">
 {f} <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(f)} />
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>

 <div className="flex items-center gap-6 p-4">
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
 </div>

 <div className="flex justify-end gap-4">
 <button
 type="button"
 onClick={() => router.back()}
 className="px-8 py-3 rounded-xl border border-gray-200 font-bold"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={loading}
 className="px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2"
 >
 <Save className="h-5 w-5" />
 {initialData ? 'Update Web Service' : 'Create Web Service'}
 </button>
 </div>
 </form>
 );
}
