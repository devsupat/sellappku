import { WebForm } from '@/components/admin/web-form';
import { updateWeb } from '@/app/actions/webs';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function EditWebPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: web } = await supabase
        .from('webs')
        .select('*')
        .eq('id', id)
        .single();

    if (!web) notFound();

    const updateAction = async (data: any) => {
        'use server';
        await updateWeb(id, data);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Web Service</h1>
                <p className="text-gray-500 mt-2">Ubah detail layanan web "{web.title}".</p>
            </div>
            <WebForm initialData={web} onSubmit={updateAction} />
        </div>
    );
}
