'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export interface Feature {
    title: string;
    description: string;
}

interface FeatureManagerProps {
    features: Feature[];
    onChange: (features: Feature[]) => void;
}

export function FeatureManager({ features, onChange }: FeatureManagerProps) {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const addFeature = () => {
        if (!newTitle.trim() || !newDesc.trim()) return;
        onChange([...features, { title: newTitle.trim(), description: newDesc.trim() }]);
        setNewTitle('');
        setNewDesc('');
    };

    const removeFeature = (index: number) => {
        const updated = [...features];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Features</label>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-3">
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Feature Title (e.g. Real-time Dashboard)"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            // If they press enter on title, they probably want to move to desc or submit
                            if (newTitle && newDesc) addFeature();
                        }
                    }}
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Feature Description..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addFeature();
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 disabled:opacity-50 flex items-center justify-center"
                        disabled={!newTitle.trim() || !newDesc.trim()}
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {features.length > 0 && (
                <div className="space-y-2 mt-4">
                    {features.map((feature, i) => (
                        <div key={i} className="flex items-start justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">{feature.description}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFeature(i)}
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
