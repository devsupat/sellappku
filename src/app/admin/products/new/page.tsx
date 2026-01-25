import { ProductForm } from '@/components/admin/product-form';
import { createProduct } from '@/app/actions/products';

export default function NewProductPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-500 mt-2">Buat entri produk source code baru.</p>
            </div>
            <ProductForm onSubmit={createProduct} />
        </div>
    );
}
