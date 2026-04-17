'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface StringListManagerProps {
    items: string[];
    onChange: (items: string[]) => void;
    label?: string;
    placeholder?: string;
}

export function StringListManager({ items, onChange, label = 'Items', placeholder = 'Add an item...' }: StringListManagerProps) {
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (!newItem.trim()) return;
        onChange([...(items || []), newItem.trim()]);
        setNewItem('');
    };

    const removeItem = (index: number) => {
        const updated = [...items];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
            
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addItem();
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={addItem}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 disabled:opacity-50 flex items-center justify-center"
                    disabled={!newItem.trim()}
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>

            {items && items.length > 0 && (
                <div className="space-y-2 mt-4">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <span className="text-gray-900 dark:text-white text-sm">{item}</span>
                            <button
                                type="button"
                                onClick={() => removeItem(i)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
