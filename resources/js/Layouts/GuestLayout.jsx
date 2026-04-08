import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex  flex-col bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <nav className="flex items-center justify-between px-6 py-4 bg-[#F5F1EB] shadow-sm">
    <a href="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold tracking-widest text-gray-800">
            SCENTORA
        </h1>
    </a>

    <div className="flex items-center space-x-4">
        <a 
            href="/login" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
            Log in
        </a>
         <a 
            href="/register" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
            Sign Up
        </a>
    </div>
</nav>

            <main>
                {children}
            </main>
        </div>
    );
}
