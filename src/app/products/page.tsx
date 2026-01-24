'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
 Search,
 Filter,
 Code2,
 Grid3X3,
 ArrowRight,
 MessageCircle,
 X,
 Loader2
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { Product } from '@/lib/supabase';
import { getProducts } from '@/lib/data';

// Categories
const categories = [
 { slug: 'all', name: 'Semua', icon: Grid3X3 },
 { slug: 'web-apps', name: 'Web Apps', icon: Code2 },
 { slug: 'mobile-apps', name: 'Mobile Apps', icon: Code2 },
 { slug: 'admin-dashboards', name: 'Admin Dashboard', icon: Code2 },
 { slug: 'e-commerce', name: 'E-commerce', icon: Code2 },
 { slug: 'educational-tools', name: 'Educational Tools', icon: Code2 },
 { slug: 'games', name: 'Games', icon: Code2 },
];

export default function ProductsPage() {
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [showMobileFilter, setShowMobileFilter] = useState(false);

 // Fetch products from Supabase
 useEffect(() => {
 async function fetchProducts() {
 try {
 const data = await getProducts();
 setProducts(data);
 } catch (error) {
 console.error('Error fetching products:', error);
 } finally {
 setLoading(false);
 }
 }
 fetchProducts();
 }, []);

 const filteredProducts = useMemo(() => {
 return products.filter((product) => {
 const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
 product.short_description.toLowerCase().includes(searchQuery.toLowerCase());
 const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
 return matchesSearch && matchesCategory;
 });
 }, [products, searchQuery, selectedCategory]);

 return (
 <div className="min-h-screen bg-gray-50 ">
 {/* Header */}
 <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700">
 <div className="max-w-7xl mx-auto px-4 sm lg py-16 lg">
 <h1 className="text-3xl lg font-bold text-white text-center mb-4">
 Source Code Premium
 </h1>
 <p className="text-lg text-violet-100 text-center max-w-2xl mx-auto mb-8">
 Semua source code siap pakai dengan dokumentasi lengkap dan lisensi lifetime
 </p>

 {/* Search Bar */}
 <div className="max-w-2xl mx-auto">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
 <input
 type="text"
 placeholder="Cari source code..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus focus focus shadow-xl"
 />
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 sm lg py-12">
 <div className="flex flex-col lg gap-8">
 {/* Sidebar - Desktop */}
 <aside className="hidden lg w-64 flex-shrink-0">
 <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">
 Kategori
 </h3>
 <ul className="space-y-2">
 {categories.map((category) => (
 <li key={category.slug}>
 <button
 onClick={() => setSelectedCategory(category.slug)}
 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === category.slug
 ? 'bg-violet-100 text-violet-700 '
 : 'text-gray-600 hover
 }`}
 >
 <category.icon className="h-5 w-5" />
 <span className="font-medium">{category.name}</span>
 </button>
 </li>
 ))}
 </ul>
 </div>
 </aside>

 {/* Mobile Filter Button */}
 <div className="lg flex items-center justify-between mb-4">
 <p className="text-gray-600 ">
 {loading ? 'Memuat...' : `${filteredProducts.length} produk ditemukan`}
 </p>
 <button
 onClick={() => setShowMobileFilter(true)}
 className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm"
 >
 <Filter className="h-5 w-5" />
 <span>Filter</span>
 </button>
 </div>

 {/* Mobile Filter Drawer */}
 {showMobileFilter && (
 <div className="fixed inset-0 z-50 lg">
 <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)}></div>
 <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-lg font-semibold text-gray-900 ">
 Kategori
 </h3>
 <button onClick={() => setShowMobileFilter(false)}>
 <X className="h-6 w-6 text-gray-500" />
 </button>
 </div>
 <ul className="space-y-2">
 {categories.map((category) => (
 <li key={category.slug}>
 <button
 onClick={() => {
 setSelectedCategory(category.slug);
 setShowMobileFilter(false);
 }}
 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === category.slug
 ? 'bg-violet-100 text-violet-700 '
 : 'text-gray-600 hover
 }`}
 >
 <category.icon className="h-5 w-5" />
 <span className="font-medium">{category.name}</span>
 </button>
 </li>
 ))}
 </ul>
 </div>
 </div>
 )}

 {/* Products Grid */}
 <div className="flex-1">
 <div className="hidden lg items-center justify-between mb-6">
 <p className="text-gray-600 ">
 {loading ? 'Memuat produk...' : `${filteredProducts.length} produk ditemukan`}
 </p>
 </div>

 {loading ? (
 <div className="flex items-center justify-center py-16">
 <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
 <span className="ml-3 text-gray-600 ">Memuat produk...</span>
 </div>
 ) : filteredProducts.length > 0 ? (
 <div className="grid md xl gap-6">
 {filteredProducts.map((product) => (
 <Link
 key={product.id}
 href={`/products/${product.slug}`}
 className="group bg-white rounded-3xl overflow-hidden shadow-sm hover transition-all duration-300 card-hover"
 >
 {/* Thumbnail */}
 <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-indigo-100 ">
 <div className="absolute inset-0 flex items-center justify-center">
 <Code2 className="h-16 w-16 text-violet-300" />
 </div>
 {product.is_featured && (
 <div className="absolute top-4 right-4">
 <span className="badge badge-amber">Featured</span>
 </div>
 )}
 </div>

 {/* Content */}
 <div className="p-6">
 <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover transition-colors">
 {product.title}
 </h3>
 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
 {product.short_description}
 </p>

 {/* Tech Stack */}
 <div className="flex flex-wrap gap-2 mb-4">
 {product.tech_stack?.slice(0, 3).map((tech, i) => (
 <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded-lg text-gray-600 ">
 {tech}
 </span>
 ))}
 {product.tech_stack && product.tech_stack.length > 3 && (
 <span className="px-2 py-1 text-xs bg-gray-100 rounded-lg text-gray-600 ">
 +{product.tech_stack.length - 3}
 </span>
 )}
 </div>

 {/* Price */}
 <div className="flex items-center justify-between">
 <span className="text-xl font-bold text-violet-600 ">
 {product.price}
 </span>
 <ArrowRight className="h-5 w-5 text-gray-400 group-hover transition-colors" />
 </div>
 </div>
 </Link>
 ))}
 </div>
 ) : (
 <div className="text-center py-16">
 <Code2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
 <h3 className="text-xl font-semibold text-gray-900 mb-2">
 Tidak ada produk ditemukan
 </h3>
 <p className="text-gray-600 mb-6">
 Coba ubah kata kunci pencarian atau filter kategori
 </p>
 <button
 onClick={() => {
 setSearchQuery('');
 setSelectedCategory('all');
 }}
 className="btn btn-secondary"
 >
 Reset Filter
 </button>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* CTA Section */}
 <div className="bg-white py-16">
 <div className="max-w-4xl mx-auto px-4 sm lg text-center">
 <h2 className="text-2xl font-bold text-gray-900 mb-4">
 Tidak menemukan yang Anda cari?
 </h2>
 <p className="text-gray-600 mb-6">
 Hubungi saya untuk custom project atau request fitur khusus
 </p>
 <a
 href={generateWhatsAppLink('Custom Project')}
 target="_blank"
 rel="noopener noreferrer"
 className="btn btn-primary"
 >
 <MessageCircle className="mr-2 h-5 w-5" />
 Konsultasi Gratis
 </a>
 </div>
 </div>
 </div>
 );
}
