import { ProductForm } from '@/components/admin/product-form';

export default function NewProductPage() {
 return (
 <div>
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-gray-900 mb-2">
 Add New Product
 </h1>
 <p className="text-gray-600 ">
 Create a new source code product
 </p>
 </div>

 <ProductForm />
 </div>
 );
}
