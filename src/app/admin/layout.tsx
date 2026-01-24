import { AdminSidebar } from '@/components/admin/sidebar';
import { ThemeProvider } from '@/components/theme-provider';

export default function AdminLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <ThemeProvider
 attribute="class"
 defaultTheme="light"
 enableSystem={false}
 storageKey="sellappku-admin-theme"
 disableTransitionOnChange
 >
 <div className="flex min-h-screen bg-gray-50 ">
 <AdminSidebar />
 <main className="flex-1 ml-64 p-8">
 {children}
 </main>
 </div>
 </ThemeProvider>
 );
}
