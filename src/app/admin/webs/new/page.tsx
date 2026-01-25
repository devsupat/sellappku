import { WebForm } from '@/components/admin/web-form';
import { createWeb } from '@/app/actions/webs';

export default function NewWebPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Web Service</h1>
                <p className="text-gray-500 mt-2">Buat entri layanan web baru.</p>
            </div>
            <WebForm onSubmit={createWeb} />
        </div>
    );
}
