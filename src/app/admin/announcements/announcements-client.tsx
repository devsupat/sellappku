'use client';

import { useState } from 'react';
import {
    Plus,
    Trash2,
    Eye,
    EyeOff,
    ArrowUp,
    ArrowDown,
    Save,
    X,
    Edit2,
    Loader2
} from 'lucide-react';
import {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    reorderAnnouncements
} from '@/app/actions/announcements';

export function AnnouncementsClient({ initialData }: { initialData: any[] }) {
    const [announcements, setAnnouncements] = useState(initialData);
    const [newMsg, setNewMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editMsg, setEditMsg] = useState('');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMsg.trim()) return;
        setLoading(true);
        try {
            await createAnnouncement(newMsg);
            setNewMsg('');
            window.location.reload();
        } catch (err) {
            alert('Gagal menambah pesan');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id: string, active: boolean) => {
        try {
            await updateAnnouncement(id, { is_active: !active });
            window.location.reload();
        } catch (err) {
            alert('Gagal mengupdate status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus pesan ini?')) return;
        try {
            await deleteAnnouncement(id);
            window.location.reload();
        } catch (err) {
            alert('Gagal menghapus');
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const otherIndex = direction === 'up' ? index - 1 : index + 1;
        if (otherIndex < 0 || otherIndex >= announcements.length) return;

        const item1 = announcements[index];
        const item2 = announcements[otherIndex];

        try {
            await reorderAnnouncements(item1.id, item1.display_order, item2.id, item2.display_order);
            window.location.reload();
        } catch (err) {
            alert('Gagal mengatur urutan');
        }
    };

    const handleSaveEdit = async (id: string) => {
        try {
            await updateAnnouncement(id, { message: editMsg });
            setEditingId(null);
            window.location.reload();
        } catch (err) {
            alert('Gagal menyimpan');
        }
    };

    return (
        <div className="space-y-6">
            {/* Add Form */}
            <form onSubmit={handleAdd} className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex gap-4">
                <input
                    type="text"
                    required
                    placeholder="Tulis pesan pengumuman baru..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
                <button
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400 transition-all flex items-center gap-2 shrink-0"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                    Add Announcement
                </button>
            </form>

            {/* List */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {announcements.map((item, index) => (
                        <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleMove(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-gray-400 hover:text-indigo-600 disabled:opacity-0"
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleMove(index, 'down')}
                                    disabled={index === announcements.length - 1}
                                    className="p-1 text-gray-400 hover:text-indigo-600 disabled:opacity-0"
                                >
                                    <ArrowDown className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex-1">
                                {editingId === item.id ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={editMsg}
                                            onChange={(e) => setEditMsg(e.target.value)}
                                            className="flex-1 px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                            autoFocus
                                        />
                                        <button onClick={() => handleSaveEdit(item.id)} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg">
                                            <Save className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <p className={`text-gray-900 dark:text-white font-medium ${!item.is_active && 'text-gray-400 dark:text-gray-500 line-through'}`}>
                                        {item.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setEditingId(item.id);
                                        setEditMsg(item.message);
                                    }}
                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                >
                                    <Edit2 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleToggle(item.id, item.is_active)}
                                    className={`p-2 rounded-lg transition-colors ${item.is_active
                                        ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {item.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {announcements.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        Belum ada pengumuman. Tambahkan di atas!
                    </div>
                )}
            </div>
        </div>
    );
}
