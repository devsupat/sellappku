import Link from 'next/link';
import { Plus, Edit2, Code2, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { deleteProduct } from '@/app/actions/products';
import { DeleteButton } from '@/components/admin/delete-button';

export const revalidate = 0;

export default async function AdminProductsPage() {
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola source code dan script yang Anda jual.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    <Plus className="h-5 w-5" /> New Product
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {products?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center shrink-0">
                                            {product.thumbnail_url ? (
                                                <img src={product.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">{product.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 truncate">{product.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{product.price}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {product.is_active ? (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 w-fit">Active</span>
                                        ) : (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-fit">Inactive</span>
                                        )}
                                        {product.is_featured && (
                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 w-fit">Featured</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <ExternalLink className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </Link>
                                        <DeleteButton id={product.id} onDelete={deleteProduct} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {(!products || products.length === 0) && (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        Belum ada produk. Klik "New Product" untuk menambah.
                    </div>
                )}
            </div>
        </div>
    );
}
