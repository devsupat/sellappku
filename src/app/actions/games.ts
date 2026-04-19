'use server';

import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export interface ActionResult {
    success: boolean;
    error?: string;
}

export async function createGame(formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('games').insert([formData]);
        if (error) {
            console.error('[Action Error] createGame:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath('/games');
        revalidatePath('/admin/games');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] createGame:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function updateGame(id: string, formData: any): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('games').update(formData).eq('id', id);
        if (error) {
            console.error('[Action Error] updateGame:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath(`/games/${formData.slug}`);
        revalidatePath('/admin/games');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] updateGame:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}

export async function deleteGame(id: string): Promise<ActionResult> {
    try {
        const { error } = await supabase.from('games').delete().eq('id', id);
        if (error) {
            console.error('[Action Error] deleteGame:', { message: error.message, code: error.code });
            return { success: false, error: error.message };
        }
        revalidatePath('/games');
        revalidatePath('/admin/games');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('[Critical Error] deleteGame:', e?.message);
        return { success: false, error: 'Unexpected server error. Please try again.' };
    }
}
