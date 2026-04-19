'use server';

import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export interface ActionResult {
    success: boolean;
    error?: string;
}

export async function createApp(formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('apps').insert([formData]);
        if (error) {
            console.error('[Action Error] createApp:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath('/apps');
        revalidatePath('/admin/apps');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] createApp:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function updateApp(id: string, formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('apps').update(formData).eq('id', id);
        if (error) {
            console.error('[Action Error] updateApp:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath(`/apps/${formData.slug}`);
        revalidatePath('/admin/apps');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] updateApp:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function deleteApp(id: string): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('apps').delete().eq('id', id);
        if (error) {
            console.error('[Action Error] deleteApp:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath('/apps');
        revalidatePath('/admin/apps');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] deleteApp:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}
