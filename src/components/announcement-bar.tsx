'use client';

import { useState } from 'react';
import { X, Megaphone } from 'lucide-react';

interface AnnouncementBarProps {
    messages: string[];
    bgColor?: string;
    textColor?: string;
    showCloseButton?: boolean;
}

export function AnnouncementBar({
    messages,
    bgColor = 'bg-amber-400',
    textColor = 'text-gray-900',
    showCloseButton = true,
}: AnnouncementBarProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || messages.length === 0) return null;

    // Duplicate messages for seamless loop
    const marqueeText = messages.join('  •  ');

    return (
        <div className={`${bgColor} ${textColor} fixed top-0 left-0 right-0 z-50 overflow-hidden`}>
            <div className="flex items-center h-9">
                {/* Icon */}
                <div className="flex-shrink-0 px-3 flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                </div>

                {/* Marquee Container */}
                <div className="flex-1 overflow-hidden">
                    <div className="marquee-container">
                        <div className="marquee-content">
                            <span className="text-sm font-medium whitespace-nowrap">
                                {marqueeText}
                            </span>
                            <span className="text-sm font-medium whitespace-nowrap ml-16">
                                {marqueeText}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                {showCloseButton && (
                    <button
                        onClick={() => setIsVisible(false)}
                        className="flex-shrink-0 px-3 hover:opacity-70 transition-opacity"
                        aria-label="Close announcement"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
