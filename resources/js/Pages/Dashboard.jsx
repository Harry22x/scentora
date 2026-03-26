import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ perfumes }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this perfume?')) {
            destroy(route('perfumes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Inventory Management</h2>}
        >
            <Head title="Dashboard" />
<div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-8">
        <Link
            href={route('perfumes.create')}
            className="bg-[#1a1a1a] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
            + New Product
        </Link>
    </div>

    {/* Table Container */}
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
        {/* Fake Table Header */}
        <div className="grid grid-cols-12 bg-[#F5F1EB] px-8 py-4 text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Category</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Product List */}
        <div className="divide-y divide-gray-100">
            {perfumes.map((perfume) => (
                <div key={perfume.id} className="grid grid-cols-12 items-center px-8 py-6 hover:bg-gray-50 transition-colors">
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center space-x-6">
                        <img 
                            src={`/storage/${perfume.imageUrl}`} 
                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                            alt={perfume.name} 
                        />
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">{perfume.name}</h4>
                            <p className="text-sm text-gray-400 line-clamp-1 max-w-xs">{perfume.description}</p>
                        </div>
                    </div>

                    {/* Category Pill */}
                    <div className="col-span-2 flex justify-center">
                        <span className="px-4 py-1 bg-[#F5F1EB] text-[#8B7E66] text-xs font-medium rounded-full border border-[#E8E1D6]">
                            {perfume.category}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center font-serif text-gray-800">
                        ${Number(perfume.price).toFixed(2)}
                    </div>

                    {/* Action Icons */}
                    <div className="col-span-2 flex justify-end space-x-4">
                        <Link href={route('perfumes.edit', perfume.id)} className="p-2 text-gray-400 hover:text-indigo-600 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </Link>
                        <button onClick={() => handleDelete(perfume.id)} className="p-2 text-gray-400 hover:text-red-600 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
          
            
        </AuthenticatedLayout>
    );
}