'use server';

import { supabase, Product } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function createProduct(formData: Partial<Product>) {
    const { error } = await supabase
        .from('products')
        .insert([formData]);

    if (error) throw error;
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
}

export async function updateProduct(id: string, formData: Partial<Product>) {
    const { error } = await supabase
        .from('products')
        .update(formData)
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/products');
    revalidatePath(`/products/${formData.slug}`);
    revalidatePath('/products');
    revalidatePath('/');
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
}
