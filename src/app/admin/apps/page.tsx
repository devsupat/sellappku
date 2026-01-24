import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Smartphone, Edit2 } from 'lucide-react';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteApp } from '@/app/actions/apps';

async function getApps() {
 const { data, error } = await supabase
 .from('apps')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) {
 console.error('Error fetching apps:', error);
 return [];
 }
 return data || [];
}

export default async function AdminAppsPage() {
 const apps = await getApps();

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Apps
 </h1>
 <p className="text-gray-600 ">
 Manage mobile applications
 </p>
 </div>
 <Link
 href="/admin/apps/new"
 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover text-white font-medium rounded-lg transition-colors"
 >
 <Plus className="h-5 w-5" />
 Add App
 </Link>
 </div>

 <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-gray-50 border-b border-gray-200 ">
 <tr>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 App
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Downloads
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Rating
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Status
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Actions
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 ">
 {apps.length === 0 ? (
 <tr>
 <td colSpan={5} className="px-6 py-12 text-center">
 <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
 <p className="text-gray-500 ">No apps yet</p>
 </td>
 </tr>
 ) : (
 apps.map((app) => (
 <tr key={app.id} className="hover">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 {app.thumbnail_url && (
 <img
 src={app.thumbnail_url}
 alt={app.title}
 className="h-10 w-10 rounded-lg object-cover"
 />
 )}
 <div>
 <div className="font-medium text-gray-900 ">
 {app.title}
 </div>
 <div className="text-sm text-gray-500 ">
 {app.slug}
 </div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4 text-sm text-gray-900 ">
 {app.downloads}
 </td>
 <td className="px-6 py-4 text-sm text-gray-900 ">
 ⭐ {app.rating}
 </td>
 <td className="px-6 py-4">
 <span
 className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${app.is_active
 ? 'bg-green-100 text-green-800 '
 : 'bg-gray-100 text-gray-800 '
 }`}
 >
 {app.is_active ? 'Active' : 'Inactive'}
 </span>
 </td>
 <td className="px-6 py-4 text-sm">
 <div className="flex items-center gap-2">
 <Link
 href={`/admin/apps/${app.id}/edit`}
 className="p-1.5 text-indigo-600 hover rounded-lg transition-colors"
 title="Edit"
 >
 <Edit2 className="h-4 w-4" />
 </Link>
 <DeleteButton
 id={app.id}
 itemName={app.title}
 onDelete={deleteApp}
 />
 </div>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
