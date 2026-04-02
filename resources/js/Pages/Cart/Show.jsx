import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, items }) {
    // Calculate Total Price
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const updateQty = (id, action) => {
        router.post(route('cart.update', { id, action }));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-serif text-2xl italic text-gray-800">Your Shopping Bag</h2>}
        >
            <Head title="Cart" />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 font-serif italic text-xl mb-6">Your bag is currently empty.</p>
                        <Link href="/" className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
                            Explore Perfumes
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Items List */}
                        <div className="lg:col-span-8">
                            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                                <table className="min-w-full text-left divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Qty</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-4 flex items-center gap-3">
                                                    <img src={`/storage/${item.imageUrl}`} className="w-12 h-12 object-cover rounded-lg" alt={item.name} />
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                                        <p className="text-xs text-gray-500">{item.description ?? ''}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-700">${Number(item.price).toFixed(2)}</td>
                                                <td className="px-4 py-4">
                                                    <div className="inline-flex items-center border border-gray-200 rounded-full px-2 py-1">
                                                        <button onClick={() => updateQty(item.id, 'decrease')} className="px-2 text-gray-500 hover:text-black">-</button>
                                                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                                        <button onClick={() => updateQty(item.id, 'increase')} className="px-2 text-gray-500 hover:text-black">+</button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                                                <td className="px-4 py-4 text-sm">
                                                    <button onClick={() => updateQty(item.id, 'remove')} className="text-red-500 hover:underline">Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="bg-[#F5F1EB] p-8 rounded-xl border border-[#E8E1D6] sticky top-6">
                                <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-gray-600">Order Summary</h3>
                                <div className="space-y-4 border-b border-[#E8E1D6] pb-6 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-xs italic">Calculated at checkout</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xl font-serif text-gray-900 mb-8">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                               <button 
    onClick={() => router.post(route('cart.checkout'), {}, {
        onSuccess: () => alert('Purchase successful!')
    })}
    className="w-full bg-[#1a1a1a] text-white py-4 rounded-full font-medium hover:bg-gray-800 transition shadow-lg"
>
    Confirm Purchase
</button>
                                <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-tighter">
                                    Secure checkout powered by Scentora
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}