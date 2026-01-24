'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2, Smartphone, Globe, Info } from 'lucide-react';

const navLinks = [
 { href: '/products', label: 'Source Code', icon: Code2 },
 { href: '/apps', label: 'Apps', icon: Smartphone },
 { href: '/webs', label: 'Web Services', icon: Globe },
 { href: '/about', label: 'About', icon: Info },
];

export function Navigation() {
 const [isOpen, setIsOpen] = useState(false);
 const pathname = usePathname();

 return (
 <nav className="fixed top-9 left-0 right-0 z-40 bg-white border-b border-gray-100">
 <div className="max-w-7xl mx-auto px-4 sm lg">
 <div className="flex items-center justify-between h-16">
 {/* Logo */}
 <Link href="/" className="flex items-center space-x-2">
 <div className="p-2 bg-indigo-600 rounded-lg">
 <Code2 className="h-5 w-5 text-white" />
 </div>
 <span className="text-xl font-bold text-gray-900">
 Sellappku
 </span>
 </Link>

 {/* Desktop Navigation */}
 <div className="hidden md items-center space-x-8">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 href={link.href}
 className={`text-sm font-medium transition-colors hover ${pathname === link.href
 ? 'text-indigo-600'
 : 'text-gray-600'
 }`}
 >
 {link.label}
 </Link>
 ))}
 </div>

 <div className="flex items-center gap-4">
 <Link
 href="/admin"
 className="hidden sm items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover transition-all shadow-lg shadow-indigo-200"
 >
 Admin Panel
 </Link>

 {/* Mobile menu button */}
 <div className="md flex items-center">
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover hover transition-all"
 >
 {isOpen ? (
 <X className="block h-6 w-6" aria-hidden="true" />
 ) : (
 <Menu className="block h-6 w-6" aria-hidden="true" />
 )}
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Mobile Navigation */}
 {isOpen && (
 <div className="md absolute top-full left-0 w-full bg-white border-b border-gray-100 animate-in slide-in-from-top-2">
 <div className="px-4 pt-2 pb-6 space-y-2 shadom-xl">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 href={link.href}
 onClick={() => setIsOpen(false)}
 className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover transition-colors"
 >
 <link.icon className="h-5 w-5" />
 <span className="font-medium text-gray-900">{link.label}</span>
 </Link>
 ))}
 </div>
 </div>
 )}
 </nav>
 );
}
