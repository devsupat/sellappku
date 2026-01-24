import { WebForm } from '@/components/admin/web-form';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

async function getWeb(id: string) {
 const { data, error } = await supabase
 .from('webs')
 .select('*')
 .eq('id', id)
 .single();

 if (error || !data) return null;
 return data;
}

export default async function EditWebPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
 const web = await getWeb(id);

 if (!web) {
 notFound();
 }

 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Edit Web Service
 </h1>
 <p className="text-gray-600 ">
 Modify web service details for {web.title}
 </p>
 </div>

 <WebForm initialData={web} />
 </div>
 );
}
