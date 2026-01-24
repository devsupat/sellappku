'use server';

import { supabase, Web } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getWebs(): Promise<Web[]> {
    const { data, error } = await supabase
        .from('webs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function createWeb(formData: Partial<Web>) {
    const { error } = await supabase
        .from('webs')
        .insert([formData]);

    if (error) throw error;
    revalidatePath('/admin/webs');
    revalidatePath('/webs');
    revalidatePath('/');
}

export async function updateWeb(id: string, formData: Partial<Web>) {
    const { error } = await supabase
        .from('webs')
        .update(formData)
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/webs');
    revalidatePath(`/webs/${formData.slug}`);
    revalidatePath('/webs');
    revalidatePath('/');
}

export async function deleteWeb(id: string) {
    const { error } = await supabase
        .from('webs')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/webs');
    revalidatePath('/webs');
    revalidatePath('/');
}
