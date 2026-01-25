'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createAnnouncement(message: string) {
    const { error } = await supabase
        .from('announcements')
        .insert([{ message, is_active: true, display_order: 0 }]);

    if (error) {
        console.error('Error creating announcement:', error);
        throw error;
    }
    revalidatePath('/');
    revalidatePath('/admin/announcements');
}

export async function updateAnnouncement(id: string, updates: any) {
    const { error } = await supabase
        .from('announcements')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('Error updating announcement:', error);
        throw error;
    }
    revalidatePath('/');
    revalidatePath('/admin/announcements');
}

export async function deleteAnnouncement(id: string) {
    const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting announcement:', error);
        throw error;
    }
    revalidatePath('/');
    revalidatePath('/admin/announcements');
}

export async function reorderAnnouncements(id1: string, order1: number, id2: string, order2: number) {
    const { error: error1 } = await supabase
        .from('announcements')
        .update({ display_order: order2 })
        .eq('id', id1);

    const { error: error2 } = await supabase
        .from('announcements')
        .update({ display_order: order1 })
        .eq('id', id2);

    if (error1 || error2) throw error1 || error2;
    revalidatePath('/');
    revalidatePath('/admin/announcements');
}
