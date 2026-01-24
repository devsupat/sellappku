'use server';

import { supabase, App } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getApps(): Promise<App[]> {
    const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function createApp(formData: Partial<App>) {
    const { error } = await supabase
        .from('apps')
        .insert([formData]);

    if (error) throw error;
    revalidatePath('/admin/apps');
    revalidatePath('/apps');
    revalidatePath('/');
}

export async function updateApp(id: string, formData: Partial<App>) {
    const { error } = await supabase
        .from('apps')
        .update(formData)
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/apps');
    revalidatePath(`/apps/${formData.slug}`);
    revalidatePath('/apps');
    revalidatePath('/');
}

export async function deleteApp(id: string) {
    const { error } = await supabase
        .from('apps')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/apps');
    revalidatePath('/apps');
    revalidatePath('/');
}
