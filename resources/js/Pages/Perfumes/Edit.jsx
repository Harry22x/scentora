import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ perfume }) {
    const { data, setData, post, processing, errors } = useForm({
        name: perfume.name,
        category: perfume.category,
        description: perfume.description,
        price: perfume.price,
        stock: perfume.stock,
        imageUrl: null, 
        _method: 'put', // CRITICAL: Tells Laravel this is an UPDATE even though we use 'post'
    });

    const submit = (e) => {
        e.preventDefault();
        // We use .post even for updates when dealing with files in Laravel/Inertia
        post(route('perfumes.update', perfume.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Edit {perfume.name}</h2>}>
            <Head title="Edit Perfume" />
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit} className="bg-white p-6 shadow rounded-lg space-y-4">
                    
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border-gray-300 rounded-md" />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} className="w-full border-gray-300 rounded-md" />
                    </div>

                    {/* Current Image Preview */}
                    <div>
                        <label className="block text-sm font-medium">Current Image</label>
                        <img src={`/storage/${perfume.imageUrl}`} className="w-32 h-32 object-cover rounded mb-2" alt="Current" />
                        <input type="file" onChange={e => setData('imageUrl', e.target.files[0])} className="w-full" />
                        <p className="text-gray-500 text-xs mt-1">Leave blank to keep the current image.</p>
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} placeholder="Price" className="border-gray-300 rounded-md" />
                        <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} placeholder="Stock" className="border-gray-300 rounded-md" />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Link href={route('dashboard')} className="px-4 py-2 border rounded-md">Cancel</Link>
                        <button type="submit" disabled={processing} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                            Update Perfume
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}