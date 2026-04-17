'use server';

import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function createGame(formData: any) {
    try {
        console.log('Inserting game data:', formData);
        const { data, error } = await supabase
            .from('games')
            .insert([formData])
            .select();

        if (error) {
            console.error('Supabase Error creating game:', error);
            return { success: false, error: error.message };
        }
        
        revalidatePath('/games');
        revalidatePath('/admin/games');
        revalidatePath('/');
        return { success: true, data };
    } catch (err: any) {
        console.error('Generic Error creating game:', err);
        return { success: false, error: err.message || 'Internal Server Error' };
    }
}

export async function updateGame(id: string, formData: any) {
    try {
        const { data, error } = await supabase
            .from('games')
            .update(formData)
            .eq('id', id)
            .select();

        if (error) {
            console.error('Supabase Error updating game:', error);
            return { success: false, error: error.message };
        }
        
        revalidatePath(`/games/${formData.slug}`);
        revalidatePath('/admin/games');
        revalidatePath('/');
        return { success: true, data };
    } catch (err: any) {
        console.error('Generic Error updating game:', err);
        return { success: false, error: err.message || 'Internal Server Error' };
    }
}

export async function deleteGame(id: string) {
    try {
        const { error } = await supabase
            .from('games')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase Error deleting game:', error);
            return { success: false, error: error.message };
        }
        
        revalidatePath('/games');
        revalidatePath('/admin/games');
        revalidatePath('/');
        return { success: true };
    } catch (err: any) {
        console.error('Generic Error deleting game:', err);
        return { success: false, error: err.message || 'Internal Server Error' };
    }
}
