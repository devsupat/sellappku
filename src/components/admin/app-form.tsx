'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { App } from '@/lib/supabase';
import { createApp, updateApp } from '@/app/actions/apps';
import { Save, Plus, Trash2, Image as ImageIcon, Star, Download } from 'lucide-react';

interface AppFormProps {
 initialData?: App;
}

export function AppForm({ initialData }: AppFormProps) {
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState<Partial<App>>(
 initialData || {
 title: '',
 slug: '',
 short_description: '',
 description: '',
 thumbnail_url: '',
 screenshots: [],
 download_type: 'playstore',
 download_url: '',
 has_tester: false,
 tester_group_url: '',
 tester_invite_url: '',
 rating: 4.5,
 downloads: '1k+',
 features: [],
 version: '1.0.0',
 size: '',
 is_featured: false,
 is_active: true,
 }
 );

 const [newFeature, setNewFeature] = useState('');
 const [newScreenshot, setNewScreenshot] = useState({ url: '', caption: '' });

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 try {
 if (initialData?.id) {
 await updateApp(initialData.id, formData);
 } else {
 await createApp(formData);
 }
 router.push('/admin/apps');
 router.refresh();
 } catch (error) {
 console.error('Error saving app:', error);
 alert('Error saving app');
 } finally {
 setLoading(false);
 }
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
 {/* Left Column: Basic Info */}
 <div className="lg space-y-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4">App Information</h3>
 <div className="grid grid-cols-1 md gap-4">
 <div className="md">
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
 <label className="block text-sm font-medium mb-1">Version</label>
 <input
 type="text"
 value={formData.version || ''}
 onChange={(e) => setFormData({ ...formData, version: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Rating</label>
 <input
 type="number"
 step="0.1"
 min="0"
 max="5"
 value={formData.rating || ''}
 onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Downloads</label>
 <input
 type="text"
 value={formData.downloads || ''}
 onChange={(e) => setFormData({ ...formData, downloads: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 placeholder="e.g. 1k+"
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
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent h-48"
 />
 </div>
 </div>
 </div>
 </div>

 {/* Right Column: Media and Links */}
 <div className="space-y-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
 <ImageIcon className="h-5 w-5" /> Media (URLs)
 </h3>
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
 <input
 type="text"
 required
 value={formData.thumbnail_url || ''}
 onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent text-sm"
 />
 {formData.thumbnail_url && (
 <img src={formData.thumbnail_url} alt="Preview" className="mt-2 h-20 w-auto rounded-xl mx-auto" />
 )}
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Screenshots</label>
 <div className="grid grid-cols-3 gap-2 mb-2">
 {formData.screenshots?.map((ss, idx) => (
 <div key={idx} className="relative group">
 <img src={ss.url} className="h-16 w-full object-cover rounded-lg border border-gray-100" />
 <button
 type="button"
 onClick={() => removeScreenshot(idx)}
 className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover transition-opacity"
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
 className="w-full py-2 bg-gray-100 rounded-xl text-xs font-bold"
 >
 + Add Screenshot URL
 </button>
 </div>
 </div>
 </div>

 <div className="bg-white p-6 rounded-2xl border border-gray-200 ">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
 <Download className="h-5 w-5" /> Distribution
 </h3>
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">Download Type</label>
 <select
 value={formData.download_type}
 onChange={(e) => setFormData({ ...formData, download_type: e.target.value as any })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 >
 <option value="playstore">Play Store</option>
 <option value="drive">Google Drive</option>
 <option value="mediafire">Mediafire</option>
 <option value="other">Other</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Download URL</label>
 <input
 type="text"
 required
 value={formData.download_url}
 onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
 />
 </div>

 <div className="pt-4 border-t border-gray-100 ">
 <label className="flex items-center gap-2 cursor-pointer mb-4">
 <input
 type="checkbox"
 checked={formData.has_tester}
 onChange={(e) => setFormData({ ...formData, has_tester: e.target.checked })}
 className="w-4 h-4 rounded text-indigo-600"
 />
 <span className="text-sm font-medium">Available for Tester</span>
 </label>

 {formData.has_tester && (
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">Tester Group URL</label>
 <input
 type="text"
 value={formData.tester_group_url || ''}
 onChange={(e) => setFormData({ ...formData, tester_group_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent text-sm"
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Tester Invite URL</label>
 <input
 type="text"
 value={formData.tester_invite_url || ''}
 onChange={(e) => setFormData({ ...formData, tester_invite_url: e.target.value })}
 className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-transparent text-sm"
 />
 </div>
 </div>
 )}
 </div>
 </div>
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
 {initialData ? 'Update App' : 'Create App'}
 </button>
 </div>
 </form>
 );
}
