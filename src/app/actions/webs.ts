'use server';

import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export interface ActionResult {
    success: boolean;
    error?: string;
}

export async function createWeb(formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('webs').insert([formData]);
        if (error) {
            console.error('[Action Error] createWeb:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath('/webs');
        revalidatePath('/admin/webs');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] createWeb:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function updateWeb(id: string, formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('webs').update(formData).eq('id', id);
        if (error) {
            console.error('[Action Error] updateWeb:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath(`/webs/${formData.slug}`);
        revalidatePath('/admin/webs');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] updateWeb:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function deleteWeb(id: string): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('webs').delete().eq('id', id);
        if (error) {
            console.error('[Action Error] deleteWeb:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath('/webs');
        revalidatePath('/admin/webs');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] deleteWeb:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}
