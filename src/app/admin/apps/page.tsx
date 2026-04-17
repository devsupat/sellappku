import Link from 'next/link';
import { Plus, Edit2, Smartphone, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deleteApp } from '@/app/actions/apps';
import { DeleteButton } from '@/components/admin/delete-button';

export const revalidate = 0;

export default async function AdminAppsPage() {
    const { data: apps } = await supabase
        .from('apps')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mobile Apps</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola aplikasi mobile dan program tester.</p>
                </div>
                <Link
                    href="/admin/apps/new"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg dark:shadow-indigo-900/20"
                >
                    <Plus className="h-5 w-5" /> New App
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">App</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating/DL</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {apps?.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                            {app.thumbnail_url ? (
                                                <img src={app.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <Smartphone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">{app.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{app.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 uppercase">
                                        {app.download_type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900 dark:text-white">⭐ {app.rating}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{app.downloads} DL</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {app.is_active ? (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 w-fit">Active</span>
                                        ) : (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-fit">Inactive</span>
                                        )}
                                        {app.has_tester && (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 w-fit">Need Testers</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/apps/${app.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-indigo-600">
                                            <ExternalLink className="h-5 w-5" />
                                        </Link>
                                        <Link href={`/admin/apps/${app.id}/edit`} className="p-2 text-gray-400 hover:text-indigo-600">
                                            <Edit2 className="h-5 w-5" />
                                        </Link>
                                        <DeleteButton id={app.id} onDelete={deleteApp} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
