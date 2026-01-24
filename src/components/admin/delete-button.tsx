'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
 id: string;
 onDelete: (id: string) => Promise<void>;
 itemName: string;
}

export function DeleteButton({ id, onDelete, itemName }: DeleteButtonProps) {
 const [loading, setLoading] = useState(false);

 const handleDelete = async () => {
 if (!confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
 return;
 }

 setLoading(true);
 try {
 await onDelete(id);
 } catch (error) {
 console.error('Failed to delete:', error);
 alert('Failed to delete item. Please try again.');
 } finally {
 setLoading(false);
 }
 };

 return (
 <button
 onClick={handleDelete}
 disabled={loading}
 className={`p-1.5 rounded-lg transition-colors ${loading
 ? 'bg-gray-100 cursor-not-allowed text-gray-400'
 : 'text-red-500 hover
 }`}
 title="Delete"
 >
 <Trash2 className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
 </button>
 );
}
