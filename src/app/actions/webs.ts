'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createWeb(formData: any) {
    const { error } = await supabase
        .from('webs')
        .insert([formData]);

    if (error) {
        console.error('Error creating web service:', error);
        throw error;
    }
    revalidatePath('/webs');
    revalidatePath('/admin/webs');
    revalidatePath('/');
}

export async function updateWeb(id: string, formData: any) {
    const { error } = await supabase
        .from('webs')
        .update(formData)
        .eq('id', id);

    if (error) {
        console.error('Error updating web service:', error);
        throw error;
    }
    revalidatePath(`/webs/${formData.slug}`);
    revalidatePath('/admin/webs');
    revalidatePath('/');
}

export async function deleteWeb(id: string) {
    const { error } = await supabase
        .from('webs')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting web service:', error);
        throw error;
    }
    revalidatePath('/webs');
    revalidatePath('/admin/webs');
    revalidatePath('/');
}
