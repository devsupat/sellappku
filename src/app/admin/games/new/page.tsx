import { GameForm } from '@/components/admin/game-form';
import { createGame } from '@/app/actions/games';

export default function NewGamePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Game</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Buat entri game baru.</p>
            </div>
            <GameForm onSubmit={createGame} />
        </div>
    );
}
