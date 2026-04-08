import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ perfumes = [], orders = [] }) {
    const { delete: destroy } = useForm();
    const auth = usePage().props.auth;
    const user = auth?.user; 

       const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this perfume?')) {
            destroy(route('perfumes.destroy', id));
        }
    };

    useEffect(() => {
       
        if (user && user.role !== 'admin') {
            router.visit('/');
        }
    }, [user]);


    if (!user || user.role !== 'admin') {
        return (
            <div className="h-screen flex items-center justify-center bg-[#F5F1EB]">
                <p className="font-serif italic text-gray-500">Verifying credentials...</p>
            </div>
        );
    }
    
   

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Inventory Management</h2>}
        >
            <Head title="Dashboard" />
<div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
    
    <div className="flex justify-between items-center mb-8">
        <Link
            href={route('perfumes.create')}
            className="bg-[#1a1a1a] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
            + New Product
        </Link>
    </div>

    
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
        <table className="w-full">
            <thead>
                <tr className="bg-[#F5F1EB] border-b border-gray-100">
                    <th className="px-8 py-4 text-left text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase w-1/3">Product</th>
                    <th className="px-8 py-4 text-center text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase w-1/6">Category</th>
                    <th className="px-8 py-4 text-center text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase w-1/6">Price</th>
                    <th className="px-8 py-4 text-center text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase w-1/6">Stock</th>
                    <th className="px-8 py-4 text-right text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase w-1/6">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {perfumes.map((perfume) => (
                    <tr key={perfume.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                            <div className="flex items-center space-x-6">
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
                        </td>
                        <td className="px-8 py-6 text-center">
                            <span className="px-4 py-1 bg-[#F5F1EB] text-[#8B7E66] text-xs font-medium rounded-full border border-[#E8E1D6]">
                                {perfume.category}
                            </span>
                        </td>
                        <td className="px-8 py-6 text-center font-serif text-gray-800">
                            Ksh. {Number(perfume.price).toFixed(2)}
                        </td>
                        <td className="px-8 py-6 text-center font-serif text-gray-800">
                            {Number(perfume.stock)} units remaining
                        </td>
                        <td className="px-8 py-6 text-right">
                            <div className="flex justify-end space-x-4">
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
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
     <div className="mt-12 bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
        <div className="bg-[#F5F1EB] px-8 py-4 text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase">
            Recent Orders
        </div>
        <table className="w-full">
            <thead className="sr-only">
                <tr>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                    <>
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                            <td className="px-8 py-6 w-1/3">
                                <p className="text-sm font-medium text-gray-900">
                                    {order.user?.first_name} {order.user?.last_name}
                                </p>
                                <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                            </td>
                            <td className="px-8 py-6 w-1/3 text-center">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] rounded-full uppercase font-bold">
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 w-1/3 text-center font-serif text-gray-900">
                                Ksh. {Number(order.total_amount).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="px-12 py-6 bg-gray-50 border-t border-gray-100">
                                <h5 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Items in this order:</h5>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <img src={`/storage/${item.perfume.imageUrl}`} className="w-10 h-10 object-cover rounded shadow-sm" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{item.perfume.name}</p>
                                                    <p className="text-xs text-gray-400">Unit Price: Ksh. {item.price}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                <p className="text-sm font-bold text-gray-900">Ksh. {(item.quantity * item.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    </div>
</div>
          
            
        </AuthenticatedLayout>
    );
}