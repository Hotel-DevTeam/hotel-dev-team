"use client";
import LoginForm from "@/components/Forms/FormsUser/LoginForm";
import { NotificationsForms } from "@/components/Notifications/NotificationsForms";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function LoginUser() {
  const { isLogged, setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      setNotificationMessage("Has iniciado sesión");
      setShowNotification(true);
      setLoading(false);

      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
        router.push("/OptionRes");
      }, 3000);

      return () => clearTimeout(notificationTimeout);
    } else {
      setLoading(false);
    }
  }, [isLogged, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      {!isLogged && <LoginForm setToken={setToken} />}
      {showNotification && <NotificationsForms message={notificationMessage} />}
    </div>
  );
}
