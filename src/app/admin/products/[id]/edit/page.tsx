import { ProductForm } from '@/components/admin/product-form';
import { updateProduct } from '@/app/actions/products';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (!product) notFound();

    const updateAction = async (data: unknown) => {
        'use server';
        return await updateProduct(id, data);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-gray-500 mt-2">Ubah detail produk &quot;{product.title}&quot;.</p>
            </div>
            <ProductForm initialData={product} onSubmit={updateAction} />
        </div>
    );
}
