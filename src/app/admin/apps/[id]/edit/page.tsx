import { AppForm } from '@/components/admin/app-form';
import { updateApp } from '@/app/actions/apps';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: app } = await supabase
        .from('apps')
        .select('*')
        .eq('id', id)
        .single();

    if (!app) notFound();

    const updateAction = async (data: unknown) => {
        'use server';
        return await updateApp(id, data);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit App</h1>
                <p className="text-gray-500 mt-2">Ubah detail aplikasi &quot;{app.title}&quot;.</p>
            </div>
            <AppForm initialData={app} onSubmit={updateAction} />
        </div>
    );
}
