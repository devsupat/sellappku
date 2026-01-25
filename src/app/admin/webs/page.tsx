import Link from 'next/link';
import { Plus, Edit2, Globe, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deleteWeb } from '@/app/actions/webs';
import { DeleteButton } from '@/components/admin/delete-button';

export const revalidate = 0;

export default async function AdminWebsPage() {
    const { data: webs } = await supabase
        .from('webs')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Web Services</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola layanan web dan aplikasi berbasis browser.</p>
                </div>
                <Link
                    href="/admin/webs/new"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg dark:shadow-indigo-900/20"
                >
                    <Plus className="h-5 w-5" /> New Web Service
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">License Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {webs?.map((web) => (
                            <tr key={web.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                                            {web.thumbnail_url ? (
                                                <img src={web.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">{web.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{web.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{web.price_source_code}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{web.price_subscription}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {web.is_active ? (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 w-fit">Active</span>
                                        ) : (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-fit">Inactive</span>
                                        )}
                                        {web.is_featured && (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 w-fit">Featured</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/webs/${web.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-indigo-600">
                                            <ExternalLink className="h-5 w-5" />
                                        </Link>
                                        <Link href={`/admin/webs/${web.id}/edit`} className="p-2 text-gray-400 hover:text-indigo-600">
                                            <Edit2 className="h-5 w-5" />
                                        </Link>
                                        <DeleteButton id={web.id} onDelete={deleteWeb} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
