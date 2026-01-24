import { AppForm } from '@/components/admin/app-form';

export default function NewAppPage() {
 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Add New App
 </h1>
 <p className="text-gray-600 ">
 Create a new mobile application
 </p>
 </div>

 <AppForm />
 </div>
 );
}
