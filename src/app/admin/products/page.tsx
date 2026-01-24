import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Package, Edit2 } from 'lucide-react';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteProduct } from '@/app/actions/products';

async function getProducts() {
 const { data, error } = await supabase
 .from('products')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) {
 console.error('Error fetching products:', error);
 return [];
 }
 return data || [];
}

export default async function AdminProductsPage() {
 const products = await getProducts();

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Products
 </h1>
 <p className="text-gray-600 ">
 Manage source code products
 </p>
 </div>
 <Link
 href="/admin/products/new"
 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover text-white font-medium rounded-lg transition-colors"
 >
 <Plus className="h-5 w-5" />
 Add Product
 </Link>
 </div>

 <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-gray-50 border-b border-gray-200 ">
 <tr>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Product
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Category
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Price
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Status
 </th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Actions
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 ">
 {products.length === 0 ? (
 <tr>
 <td colSpan={5} className="px-6 py-12 text-center">
 <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
 <p className="text-gray-500 ">No products yet</p>
 </td>
 </tr>
 ) : (
 products.map((product) => (
 <tr key={product.id} className="hover">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 {product.thumbnail_url && (
 <img
 src={product.thumbnail_url}
 alt={product.title}
 className="h-10 w-10 rounded-lg object-cover"
 />
 )}
 <div>
 <div className="font-medium text-gray-900 ">
 {product.title}
 </div>
 <div className="text-sm text-gray-500 ">
 {product.slug}
 </div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4 text-sm text-gray-900 ">
 {product.category}
 </td>
 <td className="px-6 py-4 text-sm text-gray-900 ">
 {product.price}
 </td>
 <td className="px-6 py-4">
 <span
 className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${product.is_active
 ? 'bg-green-100 text-green-800 '
 : 'bg-gray-100 text-gray-800 '
 }`}
 >
 {product.is_active ? 'Active' : 'Inactive'}
 </span>
 </td>
 <td className="px-6 py-4 text-sm">
 <div className="flex items-center gap-2">
 <Link
 href={`/admin/products/${product.id}/edit`}
 className="p-1.5 text-indigo-600 hover rounded-lg transition-colors"
 title="Edit"
 >
 <Edit2 className="h-4 w-4" />
 </Link>
 <DeleteButton
 id={product.id}
 itemName={product.title}
 onDelete={deleteProduct}
 />
 </div>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
