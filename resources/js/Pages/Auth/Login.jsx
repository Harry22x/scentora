import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mx-auto w-full max-w-xl space-y-6 p-6">
                <div>
                    <p id="email_label" className="text-sm font-medium text-gray-700">Email</p>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        aria-labelledby="email_label"
                        value={data.email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div className="mt-4">
                    <p id="password_label" className="text-sm font-medium text-gray-700">Password</p>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        aria-labelledby="password_label"
                        value={data.password}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <button
                        type="submit"
                        className="ms-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={processing}
                    >
                        Log in
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
