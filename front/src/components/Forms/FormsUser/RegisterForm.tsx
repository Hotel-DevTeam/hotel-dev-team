"use client";
import { ILocation, IUserRegister,Role } from '@/Interfaces/IUser';
import { NotificationsForms } from '@/components/Notifications/NotificationsForms';
import { validationRegister } from '@/utils/validationFormRegister';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { fetchLocations } from '@/components/Fetchs/UserFetchs/UserFetchs';


export default function RegisterForm() {
    const {signUp} = useContext(UserContext);
    const router = useRouter();
    const [userRegister, setUserRegister] = useState<IUserRegister>({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: Role.Recep,
        locations : []
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ubicaciones, setUbicaciones] = useState<ILocation[]>([]);

    useEffect(() => {
        const getLocations = async () => {
          try {
            const data = await fetchLocations();
            setUbicaciones(data);            
          } catch (error) {
            console.error("Error al obtener ubicaciones:", error);
          }
        };    
        getLocations();
      }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updatedUser = { ...userRegister, [name]: value };
        setUserRegister(updatedUser);
        setErrors(validationRegister(updatedUser));
        
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);        
        setUserRegister({ ...userRegister, locations: selectedOptions });
      };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: IUserRegister = { ...userRegister };
        console.log(userRegister);
        

        try {
            const isRegistered = await signUp(user);
            if (isRegistered) {
                setNotificationMessage("Registro exitoso");
                setShowNotification(true);
                setTimeout(async () => {
                    router.push("/adminDashboard");
                }, 2000);
            } else {
                setErrors({ ...errors, general: "Registro inválido. Por favor, revisa los datos ingresados." });
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
            setShowErrorNotification(true);
            setTimeout(() => setShowErrorNotification(false), 3000);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg p-4">
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        ¡Bienvenido a HotelDev!
                    </h1>
                    <p className="mt-2 text-gray-500">
                         Crea tu cuenta para realizar reservas
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="space-y-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg"
                >
                    <div>
                        <label htmlFor="email" className="sr-only"></label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={userRegister.email}
                                onChange={handleChange}
                                className={`w-full rounded-lg border py-4 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300`}
                                placeholder="Email"
                            />
                            <span className="absolute inset-y-0 right-4 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="name" className="sr-only"></label>
                        <input
                            type="text"
                            name="name"
                            value={userRegister.name}
                            onChange={handleChange}
                            className={`w-full rounded-lg border py-4 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300`}
                            placeholder="Nombre"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700"></label>
                        <select name="role" value={userRegister.role} onChange={handleChange} className="w-full rounded-lg border py-4 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
                        >
                         <option value={Role.Admin}>Admin</option>
                         <option value={Role.Recep}>Recepcionista</option>
                         <option value={Role.Emplo}>Empleado</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only"></label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={userRegister.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 py-5 px-4 pr-12 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
                                placeholder="Contraseña"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="sr-only"></label>
                        <div className="relative text-gray-500">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={userRegister.confirmPassword}
                                onChange={handleChange}
                                className={`w-full rounded-lg border border-gray-300 py-5 px-4 pr-12 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300`}
                                placeholder="Confirmar Contraseña"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <label htmlFor="locations" className="block mb-2 text-sm font-medium text-gray-700">
                            Ubicaciones permitidas
                        </label>
                        <select
                            multiple
                            name="locations"
                            value={userRegister.locations}
                            onChange={handleLocationChange}
                            className="w-full h-40 rounded-lg border py-2 px-4 text-gray-500 text-sm shadow-sm focus:outline-none transition duration-300"
                        >
                            {ubicaciones.map((ubicacion) => (
                            <option key={ubicacion.id} value={ubicacion.id}>
                                {ubicacion.name}
                            </option>
                            ))}
                        </select>
                        {errors.allowedLocations && (
                            <p className="text-red-500 text-sm mt-1">{errors.allowedLocations}</p>
                        )}
                    </div>


                    <div className="flex justify-center">
                        <button
                         disabled={Object.keys(errors).length > 0}
                            type="submit"
                            className="inline-block rounded bg-[#FF5100] border border-[#FF5100] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#FF5100] focus:outline-none focus:ring active:text-[#FF5100] transition-all duration-300"
                        >
                            Registrar
                        </button>
                    </div>

                  

                    {showNotification && (
                        <div className="absolute top-12 left-0 right-0 mx-auto w-max">
                            <NotificationsForms message={notificationMessage} />
                        </div>
                    )}
                    {showErrorNotification && (
                        <div className="absolute top-20 left-0 right-0 mx-auto w-max bg-red-500 text-white py-2 px-4 rounded">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
