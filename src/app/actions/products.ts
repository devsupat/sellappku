'use server';

import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export interface ActionResult {
    success: boolean;
    error?: string;
}

export async function createProduct(formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('products').insert([formData]);

        if (error) {
            console.error('[Action Error] createProduct:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            });
            return { success: false, error: error.message };
        }

        revalidatePath('/products');
        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] createProduct:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function updateProduct(id: string, formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase
            .from('products')
            .update(formData)
            .eq('id', id);

        if (error) {
            console.error('[Action Error] updateProduct:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            });
            return { success: false, error: error.message };
        }

        revalidatePath('/products');
        revalidatePath(`/products/${formData.slug}`);
        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] updateProduct:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('products').delete().eq('id', id);

        if (error) {
            console.error('[Action Error] deleteProduct:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            });
            return { success: false, error: error.message };
        }

        revalidatePath('/products');
        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] deleteProduct:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}
