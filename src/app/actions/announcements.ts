'use server';

import { supabase, Announcement } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getAnnouncements(): Promise<Announcement[]> {
    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
}

export async function createAnnouncement(message: string) {
    // Get max display_order
    const { data: maxData } = await supabase
        .from('announcements')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

    const nextOrder = (maxData?.display_order || 0) + 1;

    const { error } = await supabase
        .from('announcements')
        .insert({ message, display_order: nextOrder });

    if (error) throw error;
    revalidatePath('/admin/announcements');
    revalidatePath('/');
}

export async function updateAnnouncement(id: string, message: string) {
    const { error } = await supabase
        .from('announcements')
        .update({ message })
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/announcements');
    revalidatePath('/');
}

export async function deleteAnnouncement(id: string) {
    const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/announcements');
    revalidatePath('/');
}

export async function toggleAnnouncementActive(id: string, isActive: boolean) {
    const { error } = await supabase
        .from('announcements')
        .update({ is_active: !isActive })
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/announcements');
    revalidatePath('/');
}

export async function reorderAnnouncements(items: { id: string; display_order: number }[]) {
    // Update all in parallel
    const updates = items.map(item =>
        supabase
            .from('announcements')
            .update({ display_order: item.display_order })
            .eq('id', item.id)
    );

    await Promise.all(updates);
    revalidatePath('/admin/announcements');
    revalidatePath('/');
}
