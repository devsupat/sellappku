import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Globe, Edit2 } from 'lucide-react';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteWeb } from '@/app/actions/webs';

async function getWebs() {
 const { data, error } = await supabase
 .from('webs')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) {
 console.error('Error fetching webs:', error);
 return [];
 }
 return data || [];
}

export default async function AdminWebsPage() {
 const webs = await getWebs();

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Web Services
 </h1>
 <p className="text-gray-600 ">
 Manage web services and subscriptions
 </p>
 </div>
 <Link
 href="/admin/webs/new"
 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover text-white font-medium rounded-lg transition-colors"
 >
 <Plus className="h-5 w-5" />
 Add Web Service
 </Link>
 </div>

 <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-gray-50 border-b border-gray-200 ">
 <tr>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Service
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Source Code
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Subscription
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
 {webs.length === 0 ? (
 <tr>
 <td colSpan={5} className="px-6 py-12 text-center">
 <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
 <p className="text-gray-500 ">No web services yet</p>
 </td>
 </tr>
 ) : (
 webs.map((web) => (
 <tr key={web.id} className="hover">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 {web.thumbnail_url && (
 <img
 src={web.thumbnail_url}
 alt={web.title}
 className="h-10 w-10 rounded-lg object-cover"
 />
 )}
 <div>
 <div className="font-medium text-gray-900 ">
 {web.title}
 </div>
 <div className="text-sm text-gray-500 ">
 {web.slug}
 </div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4 text-sm text-gray-900 ">
 {web.price_source_code}
 </td>
 <td className="px-6 py-4 text-sm text-gray-900 ">
 {web.price_subscription}
 </td>
 <td className="px-6 py-4">
 <span
 className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${web.is_active
 ? 'bg-green-100 text-green-800 '
 : 'bg-gray-100 text-gray-800 '
 }`}
 >
 {web.is_active ? 'Active' : 'Inactive'}
 </span>
 </td>
 <td className="px-6 py-4 text-sm">
 <div className="flex items-center gap-2">
 <Link
 href={`/admin/webs/${web.id}/edit`}
 className="p-1.5 text-indigo-600 hover rounded-lg transition-colors"
 title="Edit"
 >
 <Edit2 className="h-4 w-4" />
 </Link>
 <DeleteButton
 id={web.id}
 itemName={web.title}
 onDelete={deleteWeb}
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
