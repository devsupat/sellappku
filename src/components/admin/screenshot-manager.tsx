'use client';

import { useState } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

interface ScreenshotManagerProps {
    screenshots: string[];
    onChange: (screenshots: string[]) => void;
}

export function ScreenshotManager({ screenshots, onChange }: ScreenshotManagerProps) {
    const [newUrl, setNewUrl] = useState('');

    const addScreenshot = () => {
        if (!newUrl.trim()) return;
        onChange([...screenshots, newUrl.trim()]);
        setNewUrl('');
    };

    const removeScreenshot = (index: number) => {
        const updated = [...screenshots];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Screenshots (URLs)</label>
            
            <div className="flex gap-2">
                <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/screenshot.png"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addScreenshot();
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={addScreenshot}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 disabled:opacity-50 flex items-center justify-center"
                    disabled={!newUrl.trim()}
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>

            {screenshots.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {screenshots.map((url, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 aspect-video">
                            <img src={url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button
                                    type="button"
                                    onClick={() => removeScreenshot(i)}
                                    className="p-2 bg-white/10 hover:bg-red-500/80 text-white rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
