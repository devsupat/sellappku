import Link from 'next/link';
import { Plus, Edit2, Gamepad2, ExternalLink, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deleteGame } from '@/app/actions/games';
import { DeleteButton } from '@/components/admin/delete-button';

export const revalidate = 0;

function getGenreBadge(genre: string) {
    const map: Record<string, string> = {
        simulation: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        strategy: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
        action: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        puzzle: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        rpg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
        casual: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
        educational: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    };
    return map[genre] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
}

export default async function AdminGamesPage() {
    const { data: games } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Games</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola koleksi game yang dipublikasikan.</p>
                </div>
                <Link
                    href="/admin/games/new"
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg dark:shadow-emerald-900/20"
                >
                    <Plus className="h-5 w-5" /> New Game
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Game</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Genre</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating/DL</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {games?.map((game) => (
                                <tr key={game.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                                                {game.thumbnail_url ? (
                                                    <img src={game.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
                                                ) : (
                                                    <Gamepad2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900 dark:text-white truncate">{game.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{game.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${getGenreBadge(game.genre)}`}>
                                            {game.genre}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            <span className="font-semibold text-gray-900 dark:text-white">{game.rating}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{game.downloads} DL</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {game.is_active ? (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 w-fit">Active</span>
                                            ) : (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-fit">Inactive</span>
                                            )}
                                            {game.is_featured && (
                                                <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 w-fit">Featured</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/games/${game.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                                                <ExternalLink className="h-5 w-5" />
                                            </Link>
                                            <Link href={`/admin/games/${game.id}/edit`} className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                                                <Edit2 className="h-5 w-5" />
                                            </Link>
                                            <DeleteButton id={game.id} onDelete={deleteGame} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!games || games.length === 0) && (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        Belum ada game. Klik &quot;New Game&quot; untuk menambah.
                    </div>
                )}
            </div>
        </div>
    );
}
