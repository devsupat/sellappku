import { AppForm } from '@/components/admin/app-form';
import { createApp } from '@/app/actions/apps';

export default function NewAppPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New App</h1>
                <p className="text-gray-500 mt-2">Buat entri aplikasi mobile baru.</p>
            </div>
            <AppForm onSubmit={createApp} />
        </div>
    );
}
