import { ProductForm } from '@/components/admin/product-form';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
 const { data, error } = await supabase
 .from('products')
 .select('*')
 .eq('id', id)
 .single();

 if (error || !data) return null;
 return data;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
 const product = await getProduct(id);

 if (!product) {
 notFound();
 }

 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Edit Product
 </h1>
 <p className="text-gray-600 ">
 Modify product details for {product.title}
 </p>
 </div>

 <ProductForm initialData={product} />
 </div>
 );
}
