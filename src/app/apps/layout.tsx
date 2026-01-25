import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Aplikasi & Game Mobile',
    description: 'Download aplikasi mobile premium dan game terbaru. Dapatkan akses ke beta tester dan rilisan eksklusif.',
};

export default function AppsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
