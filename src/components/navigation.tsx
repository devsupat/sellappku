'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Code2, Smartphone, Globe, User, Gamepad2 } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
    { href: '/products', label: 'Source Code', icon: Code2 },
    { href: '/apps', label: 'Apps', icon: Smartphone },
    { href: '/games', label: 'Games', icon: Gamepad2 },
    { href: '/webs', label: 'Web Services', icon: Globe },
    { href: '/about', label: 'About', icon: User },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-9 left-0 right-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Code2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Sellappku
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {isOpen ? (
                                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
