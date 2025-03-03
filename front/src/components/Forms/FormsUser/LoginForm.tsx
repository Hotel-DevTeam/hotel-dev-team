"use client";
import { NotificationsForms } from "@/components/Notifications/NotificationsForms";
import { UserContext } from "@/context/UserContext";
import { ILoginClientProps } from "@/Interfaces/IUser";
import { validationLogin } from "@/utils/validationFormLogin";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function LoginForm({ setToken }: ILoginClientProps) {
  const { signIn } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errors, setErrors] = useState({} as { [key: string]: string });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    const { errors } = validationLogin({ ...userData, [name]: value });
    setErrors(errors);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formIsValid, errors } = validationLogin(userData);

    if (formIsValid) {
      const credentials = {
        email: userData.email,
        password: userData.password,
      };

      try {
        const success = await signIn(credentials);
        if (success) {
          const token =
            typeof window !== "undefined"
              ? localStorage.getItem("token")
              : null;
          if (token) {
            setToken(token);
            setNotificationMessage("Has ingresado correctamente");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
            router.push("/OptionRes");
          } else {
            setNotificationMessage("Usuario Inválido");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }
        }
      } catch {
        setNotificationMessage("Ocurrió un error, intenta de nuevo");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#CD9C8A] sm:text-4xl">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="mt-2 text-gray-500">
            Ingresa a tu cuenta para realizar reservas
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 py-20 space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-xl"
        >
          <div>
            <label htmlFor="email" className="sr-only"></label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border text-gray-500 border-[#CD9C8A] py-5 px-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300`}
                placeholder="Email"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only"></label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className={`w-full rounded-lg border border-[#CD9C8A] py-5 px-4 pr-12 text-gray-500 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5100] transition duration-300`}
                placeholder="Contraseña"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              disabled={Object.keys(errors).length > 0}
              type="submit"
              className="inline-block rounded bg-[#FF5100] border border-[#FF5100] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#FF5100] focus:outline-none focus:ring active:text-[#FF5100] transition-all duration-300"
            >
              Ingresar
            </button>
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
