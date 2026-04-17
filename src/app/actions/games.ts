'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createGame(formData: any) {
    const { error } = await supabase
        .from('games')
        .insert([formData]);

    if (error) {
        console.error('Error creating game:', error);
        throw error;
    }
    revalidatePath('/games');
    revalidatePath('/admin/games');
    revalidatePath('/');
}

export async function updateGame(id: string, formData: any) {
    const { error } = await supabase
        .from('games')
        .update(formData)
        .eq('id', id);

    if (error) {
        console.error('Error updating game:', error);
        throw error;
    }
    revalidatePath(`/games/${formData.slug}`);
    revalidatePath('/admin/games');
    revalidatePath('/');
}

export async function deleteGame(id: string) {
    const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting game:', error);
        throw error;
    }
    revalidatePath('/games');
    revalidatePath('/admin/games');
    revalidatePath('/');
}
