import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role:'customer',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="mx-auto w-full max-w-xl space-y-6 p-6">
                <div className="grid gap-4">
                    <div>
                        <p id="first_name_label" className="text-sm font-medium text-gray-700">First Name</p>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            aria-labelledby="first_name_label"
                            value={data.first_name}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p id="last_name_label" className="text-sm font-medium text-gray-700">Last Name</p>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            aria-labelledby="last_name_label"
                            value={data.last_name}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
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
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                <div className="mt-4">
                    <p id="password_confirmation_label" className="text-sm font-medium text-gray-700">Confirm Password</p>

                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        aria-labelledby="password_confirmation_label"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    {errors.password_confirmation && (
                        <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <button
                        type="submit"
                        className="ms-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={processing}
                    >
                        Register
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
