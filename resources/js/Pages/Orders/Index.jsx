import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, orders = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-serif text-2xl italic text-gray-800">My Order History</h2>}
        >
            <Head title="My Orders" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500 font-serif italic text-lg">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-[#F5F1EB] px-8 py-4 flex justify-between items-center border-b border-[#E8E1D6]">
                                    <div>
                                        <span className="text-[10px] tracking-widest uppercase font-bold text-gray-500">Order #00{order.id}</span>
                                        <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="px-3 py-1 bg-white text-[#8B7E66] text-[10px] font-bold rounded-full uppercase border border-[#E8E1D6]">
                                            {order.status}
                                        </span>
                                        <p className="font-serif text-gray-900 mt-1">Ksh. {Number(order.total_amount).toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-8 divide-y divide-gray-50">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-6 py-4 first:pt-0 last:pb-0">
                                            <img 
                                                src={`/storage/${item.perfume.imageUrl}`} 
                                                className="w-16 h-16 object-cover rounded-lg shadow-sm" 
                                                alt={item.perfume.name} 
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{item.perfume.name}</h4>
                                                <p className="text-xs text-gray-400 italic">{item.perfume.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                <p className="text-sm font-serif text-gray-900">Ksh. {Number(item.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}