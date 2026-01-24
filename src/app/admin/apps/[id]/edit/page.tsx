import { AppForm } from '@/components/admin/app-form';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

async function getApp(id: string) {
 const { data, error } = await supabase
 .from('apps')
 .select('*')
 .eq('id', id)
 .single();

 if (error || !data) return null;
 return data;
}

export default async function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
 const app = await getApp(id);

 if (!app) {
 notFound();
 }

 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Edit App
 </h1>
 <p className="text-gray-600 ">
 Modify app details for {app.title}
 </p>
 </div>

 <AppForm initialData={app} />
 </div>
 );
}
