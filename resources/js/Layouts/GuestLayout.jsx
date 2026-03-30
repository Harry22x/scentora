import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex  flex-col bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <nav className="flex items-center justify-between px-6 py-4 bg-[#F5F1EB] shadow-sm">
    <Link href="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold tracking-widest text-gray-800">
            SCENTORA
        </h1>
    </Link>

    <div className="flex items-center space-x-4">
        <Link 
            href="/login" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
            Log in
        </Link>
         <Link 
            href="/register" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
            Sign Up
        </Link>
    </div>
</nav>

            <main>
                {children}
            </main>
        </div>
    );
}
