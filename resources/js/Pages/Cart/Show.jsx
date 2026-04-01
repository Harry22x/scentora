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
                        <div className="lg:col-span-8 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-6">
                                    <img src={`/storage/${item.imageUrl}`} className="w-10 h-10 object-cover rounded-lg" alt={item.name} />
                                    
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-gray-500 font-serif">${Number(item.price).toFixed(2)}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-gray-200 rounded-full px-3 py-1">
                                        <button onClick={() => updateQty(item.id, 'decrease')} className="px-2 text-gray-500 hover:text-black">-</button>
                                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQty(item.id, 'increase')} className="px-2 text-gray-500 hover:text-black">+</button>
                                    </div>

                                    <div className="text-right min-w-[80px]">
                                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button onClick={() => updateQty(item.id, 'remove')} className="text-xs text-red-500 mt-1 hover:underline">Remove</button>
                                    </div>
                                </div>
                            ))}
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
                                <button className="w-full bg-[#1a1a1a] text-white py-4 rounded-full font-medium hover:bg-gray-800 transition shadow-lg">
                                    Proceed to Checkout
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