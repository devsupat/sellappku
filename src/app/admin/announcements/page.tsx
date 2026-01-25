import { supabase } from '@/lib/supabase';
import { AnnouncementsClient } from './announcements-client';

export const revalidate = 0;

export default async function AnnouncementsPage() {
    const { data: announcements } = await supabase
        .from('announcements')
        .select('*')
        .order('display_order', { ascending: true });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Kelola pesan promo yang muncul di homepage.</p>
                </div>
            </div>

            <AnnouncementsClient initialData={announcements || []} />
        </div>
    );
}
