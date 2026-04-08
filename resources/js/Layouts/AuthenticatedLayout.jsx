import { Link, usePage, router } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { cartCount } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b bg-[#F5F1EB] shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-16 items-center justify-between">
                        
                       
                        <div className="flex items-center space-x-8">

                            <a href="/">
                                <h1 className="text-2xl font-bold tracking-widest text-gray-800">
                                    SCENTORA
                                </h1>
                            </a>

                            {user.role === "admin" && (
                                <a
                                    href={route('dashboard')}
                                    className="text-sm font-medium text-gray-600 hover:text-black transition"
                                >
                                    Dashboard
                                </a>
                            )}

                            <a
                                href={route('cart.show')}
                                className="text-sm font-medium text-gray-600 hover:text-black transition"
                            >
                                Cart ({cartCount}) items
                            </a>

                            <a
                                href={route('orders.index')}
                                className="text-sm font-medium text-gray-600 hover:text-black transition"
                            >
                                My Orders
                            </a>

                        </div>

                       
                        <div>
                            <button
                                onClick={() => router.post(route('logout'))}
                                className="text-sm font-medium text-gray-600 hover:text-black transition"
                            >
                                Log Out
                            </button>
                        </div>

                    </div>

                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}