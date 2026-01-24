'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
 const [mounted, setMounted] = useState(false);
 const { theme, setTheme } = useTheme();

 useEffect(() => {
 setMounted(true);
 }, []);

 if (!mounted) {
 return (
 <button className="p-2.5 rounded-xl bg-gray-100 hover transition-colors">
 <Sun className="h-5 w-5 text-gray-400" />
 </button>
 );
 }

 const isDark = theme === 'dark';

 return (
 <button
 onClick={() => setTheme(isDark ? 'light' : 'dark')}
 className="p-2.5 rounded-xl bg-gray-100 hover transition-colors"
 aria-label="Toggle theme"
 >
 {isDark ? (
 <Sun className="h-5 w-5 text-amber-500" />
 ) : (
 <Moon className="h-5 w-5 text-gray-600" />
 )}
 </button>
 );
}
