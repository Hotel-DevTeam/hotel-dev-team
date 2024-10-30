"use client"
import { fetchLoginUser } from '@/components/Fetchs/UserFetchs/UserFetchs';
import { NotificationsForms } from '@/components/Notifications/NotificationsForms';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginForm() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

  

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        const credentials = {
            email: userData.email,
            password: userData.password
        };

        try {
            const success = await fetchLoginUser(credentials);
            if (success) {
                setNotificationMessage("Has ingresado correctamente");
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
                router.push("/ubicaciones");
            } else {
                setNotificationMessage("Usuario Inválido");
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            }
        } catch (error) {
            setNotificationMessage("Ocurrió un error, intenta de nuevo");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">¡Bienvenido de nuevo!</h1>
                    <p className="mt-2 text-gray-500">Ingresa a tu cuenta para realizar reservas</p>
                </div>

                <form onSubmit={onSubmit} className="mt-8 py-20 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl">
                    <div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className={`w-full rounded-lg border border-gray-300 py-5 px-4 pr-12 text-sm shadow-sm focus:outline-none transition duration-300 ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Email"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </span>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                className={`w-full rounded-lg border border-gray-300 py-5 px-4 pr-12 text-sm shadow-sm focus:outline-none transition duration-300 ${errors.password ? 'border-red-500' : ''}`}
                                placeholder="Contraseña"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                            Ingresar
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <Link href="register" className="text-center text-sm text-gray-500 hover:cursor-pointer hover:font-bold">
                            ¿No posees cuenta? Haz clic para registrarte
                        </Link>
                    </div>
                    {showNotification && (
                        <div className="absolute top-12 left-0 right-0 mx-auto w-max">
                            <NotificationsForms message={notificationMessage} />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
