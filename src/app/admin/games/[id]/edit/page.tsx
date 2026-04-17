import { GameForm } from '@/components/admin/game-form';
import { updateGame } from '@/app/actions/games';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: game } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

    if (!game) notFound();

    const updateAction = async (data: any) => {
        'use server';
        return await updateGame(id, data);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Game</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Ubah detail game &quot;{game.title}&quot;.</p>
            </div>
            <GameForm initialData={game} onSubmit={updateAction} />
        </div>
    );
}
