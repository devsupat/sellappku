'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: any) {
    const { error } = await supabase
        .from('products')
        .insert([formData]);

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
}

export async function updateProduct(id: string, formData: any) {
    const { error } = await supabase
        .from('products')
        .update(formData)
        .eq('id', id);

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }
    revalidatePath('/products');
    revalidatePath(`/products/${formData.slug}`);
    revalidatePath('/admin/products');
    revalidatePath('/');
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
}
