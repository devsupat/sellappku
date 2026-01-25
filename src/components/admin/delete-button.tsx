'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteButtonProps {
    id: string;
    onDelete: (id: string) => Promise<void>;
    label?: string;
}

export function DeleteButton({ id, onDelete, label }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

        setLoading(true);
        try {
            await onDelete(id);
        } catch (error) {
            alert('Gagal menghapus data');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
            {label}
        </button>
    );
}
