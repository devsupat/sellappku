'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
 LayoutDashboard,
 Package,
 Smartphone,
 Globe,
 Megaphone,
 LogOut,
 Code2
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
 { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
 { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
 { href: '/admin/products', label: 'Products', icon: Package },
 { href: '/admin/apps', label: 'Apps', icon: Smartphone },
 { href: '/admin/webs', label: 'Web Services', icon: Globe },
];

export function AdminSidebar() {
 const pathname = usePathname();
 const router = useRouter();
 const [loggingOut, setLoggingOut] = useState(false);

 const handleLogout = async () => {
 setLoggingOut(true);
 try {
 await fetch('/api/admin/logout', { method: 'POST' });
 router.push('/admin/login');
 router.refresh();
 } catch (error) {
 console.error('Logout failed:', error);
 setLoggingOut(false);
 }
 };

 return (
 <div className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
 {/* Logo */}
 <div className="p-6 border-b border-gray-800">
 <Link href="/admin" className="flex items-center gap-3">
 <div className="p-2 bg-indigo-600 rounded-lg">
 <Code2 className="h-6 w-6" />
 </div>
 <div>
 <h1 className="font-bold text-lg">Sellappku</h1>
 <p className="text-xs text-gray-400">Admin Panel</p>
 </div>
 </Link>
 </div>

 {/* Navigation */}
 <nav className="flex-1 p-4 space-y-1">
 {navItems.map((item) => {
 const isActive = pathname === item.href;
 return (
 <Link
 key={item.href}
 href={item.href}
 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
 ? 'bg-indigo-600 text-white'
 : 'text-gray-300 hover hover
 }`}
 >
 <item.icon className="h-5 w-5" />
 <span className="font-medium">{item.label}</span>
 </Link>
 );
 })}
 </nav>

 {/* Logout */}
 <div className="p-4 border-t border-gray-800">
 <button
 onClick={handleLogout}
 disabled={loggingOut}
 className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover hover transition-colors disabled"
 >
 <LogOut className="h-5 w-5" />
 <span className="font-medium">{loggingOut ? 'Logging out...' : 'Logout'}</span>
 </button>
 </div>
 </div>
 );
}
