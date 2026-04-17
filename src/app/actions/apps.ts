'use server';

import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function createApp(formData: any) {
    const { error } = await supabase
        .from('apps')
        .insert([formData]);

    if (error) {
        console.error('Error creating app:', error);
        throw error;
    }
    revalidatePath('/apps');
    revalidatePath('/admin/apps');
    revalidatePath('/');
}

export async function updateApp(id: string, formData: any) {
    const { error } = await supabase
        .from('apps')
        .update(formData)
        .eq('id', id);

    if (error) {
        console.error('Error updating app:', error);
        throw error;
    }
    revalidatePath(`/apps/${formData.slug}`);
    revalidatePath('/admin/apps');
    revalidatePath('/');
}

export async function deleteApp(id: string) {
    const { error } = await supabase
        .from('apps')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting app:', error);
        throw error;
    }
    revalidatePath('/apps');
    revalidatePath('/admin/apps');
    revalidatePath('/');
}
