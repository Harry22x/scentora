import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
  
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '',
        price: '',
        stock: 0,
        description: '',
        imageUrl:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('perfumes.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Add New Perfume</h2>}>
            <Head title="Add Perfume" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border">
                        <form onSubmit={submit} className="space-y-4">
                           
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Perfume Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                              <div>
                                <label className="block font-medium text-sm text-gray-700">Description</label>
                                <input
                                    type="text"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                            </div>


                           
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <label className="block font-medium text-sm text-gray-700">category</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.category && <div className="text-red-600 text-sm mt-1">{errors.category}</div>}
        </div>
                             <div>
                                    <label className="block font-medium text-sm text-gray-700">Image </label>
                                    <input
                                        type="file"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        
                                    onChange={e => setData('imageUrl', e.target.files[0])} 
        
    />
    {errors.imageUrl && <div className="text-red-600 text-sm mt-1">{errors.imageUrl}</div>}
                                </div>

                            </div>
                            
        

                            <div className="grid grid-cols-2 gap-4">
                              
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Price (Ksh. )</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                               
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Stock Units</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('dashboard')} className="text-sm text-gray-600 underline mr-4">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Save Perfume
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}