import { WebForm } from '@/components/admin/web-form';

export default function NewWebPage() {
 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Add New Web Service
 </h1>
 <p className="text-gray-600 ">
 Create a new web service
 </p>
 </div>

 <WebForm />
 </div>
 );
}
