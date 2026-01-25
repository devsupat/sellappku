import { Sidebar } from '@/components/admin/sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto pt-[100px] lg:pt-8 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
