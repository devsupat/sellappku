import { supabase } from '@/lib/supabase';
import { Package, Smartphone, Globe, Megaphone } from 'lucide-react';
import Link from 'next/link';

async function getDashboardStats() {
 const [products, apps, webs, announcements] = await Promise.all([
 supabase.from('products').select('id', { count: 'exact', head: true }),
 supabase.from('apps').select('id', { count: 'exact', head: true }),
 supabase.from('webs').select('id', { count: 'exact', head: true }),
 supabase.from('announcements').select('id', { count: 'exact', head: true }),
 ]);

 return {
 products: products.count || 0,
 apps: apps.count || 0,
 webs: webs.count || 0,
 announcements: announcements.count || 0,
 };
}

export default async function AdminDashboard() {
 const stats = await getDashboardStats();

 const cards = [
 {
 title: 'Products',
 count: stats.products,
 icon: Package,
 href: '/admin/products',
 color: 'bg-violet-100 text-violet-600 ',
 },
 {
 title: 'Apps',
 count: stats.apps,
 icon: Smartphone,
 href: '/admin/apps',
 color: 'bg-indigo-100 text-indigo-600 ',
 },
 {
 title: 'Web Services',
 count: stats.webs,
 icon: Globe,
 href: '/admin/webs',
 color: 'bg-cyan-100 text-cyan-600 ',
 },
 {
 title: 'Announcements',
 count: stats.announcements,
 icon: Megaphone,
 href: '/admin/announcements',
 color: 'bg-amber-100 text-amber-600 ',
 },
 ];

 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Dashboard
 </h1>
 <p className="text-gray-600 ">
 Welcome to Sellappku Admin Panel
 </p>
 </div>

 <div className="grid grid-cols-1 md lg gap-6">
 {cards.map((card) => (
 <Link
 key={card.href}
 href={card.href}
 className="bg-white rounded-2xl p-6 border border-gray-200 hover transition-shadow"
 >
 <div className="flex items-center justify-between mb-4">
 <div className={`p-3 rounded-xl ${card.color}`}>
 <card.icon className="h-6 w-6" />
 </div>
 </div>
 <h3 className="text-gray-600 text-sm font-medium mb-1">
 {card.title}
 </h3>
 <p className="text-3xl font-bold text-gray-900 ">
 {card.count}
 </p>
 </Link>
 ))}
 </div>

 <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200 ">
 <h2 className="text-xl font-bold text-gray-900 mb-4">
 Quick Actions
 </h2>
 <div className="grid grid-cols-1 md lg gap-4">
 <Link
 href="/admin/products"
 className="px-4 py-3 bg-violet-100 text-violet-700 rounded-xl font-medium hover transition-colors text-center"
 >
 + New Product
 </Link>
 <Link
 href="/admin/apps"
 className="px-4 py-3 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover transition-colors text-center"
 >
 + New App
 </Link>
 <Link
 href="/admin/webs"
 className="px-4 py-3 bg-cyan-100 text-cyan-700 rounded-xl font-medium hover transition-colors text-center"
 >
 + New Web Service
 </Link>
 <Link
 href="/admin/announcements"
 className="px-4 py-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover transition-colors text-center"
 >
 + New Announcement
 </Link>
 </div>
 </div>
 </div>
 );
}
