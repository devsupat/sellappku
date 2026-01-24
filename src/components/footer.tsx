import Link from 'next/link';
import { Code2, Mail, MessageCircle, Github, Instagram } from 'lucide-react';

const footerLinks = {
 produk: [
 { label: 'Source Code', href: '/products' },
 { label: 'Mobile Apps', href: '/apps' },
 { label: 'Web Services', href: '/webs' },
 ],
 support: [
 { label: 'About Developer', href: '/about' },
 { label: 'Konsultasi', href: 'https://wa.me/6285189536359' },
 ],
};

export function Footer() {
 return (
 <footer className="bg-gray-900 text-white">
 <div className="max-w-7xl mx-auto px-4 sm lg py-12">
 <div className="grid grid-cols-1 md gap-8">
 {/* Brand */}
 <div className="md">
 <Link href="/" className="flex items-center space-x-2 mb-4">
 <div className="p-2 bg-indigo-600 rounded-lg">
 <Code2 className="h-5 w-5 text-white" />
 </div>
 <span className="text-xl font-bold">Sellappku</span>
 </Link>
 <p className="text-gray-400 text-sm mb-4 max-w-sm">
 Source code dan aplikasi siap pakai dengan lisensi lifetime.
 Langsung dari developer, tanpa perantara.
 </p>
 <div className="flex space-x-3">
 <a
 href="https://wa.me/6285189536359"
 target="_blank"
 rel="noopener noreferrer"
 className="p-2 rounded-lg bg-gray-800 hover transition-colors"
 >
 <MessageCircle className="h-4 w-4" />
 </a>
 <a
 href="mailto"
 className="p-2 rounded-lg bg-gray-800 hover transition-colors"
 >
 <Mail className="h-4 w-4" />
 </a>
 <a
 href="#"
 className="p-2 rounded-lg bg-gray-800 hover transition-colors"
 >
 <Github className="h-4 w-4" />
 </a>
 <a
 href="#"
 className="p-2 rounded-lg bg-gray-800 hover transition-colors"
 >
 <Instagram className="h-4 w-4" />
 </a>
 </div>
 </div>

 {/* Produk */}
 <div>
 <h3 className="font-semibold mb-4">Produk</h3>
 <ul className="space-y-2">
 {footerLinks.produk.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="text-sm text-gray-400 hover transition-colors"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* Support */}
 <div>
 <h3 className="font-semibold mb-4">Dukungan</h3>
 <ul className="space-y-2">
 {footerLinks.support.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="text-sm text-gray-400 hover transition-colors"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>

 {/* Bottom Bar */}
 <div className="border-t border-gray-800">
 <div className="max-w-7xl mx-auto px-4 sm lg py-4">
 <div className="flex flex-col md justify-between items-center space-y-2 md">
 <p className="text-gray-500 text-xs">
 © 2026 Sellappku. All rights reserved.
 </p>
 <div className="flex space-x-4 text-xs text-gray-500">
 <Link href="#" className="hover transition-colors">
 Privacy Policy
 </Link>
 <Link href="#" className="hover transition-colors">
 Terms of Service
 </Link>
 </div>
 </div>
 </div>
 </div>
 </footer>
 );
}
