import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Source Code Premium - Catalog Produk',
    description: 'Jelajahi berbagai source code aplikasi, script website, dan template premium siap pakai dengan lisensi lifetime.',
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
