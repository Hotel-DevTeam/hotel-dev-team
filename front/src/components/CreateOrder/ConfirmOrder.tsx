import React, { useState } from "react";
import { fetchFindBoxById, fetchUpdateCaja } from "../Fetchs/CajaFetch/CajaFetch";
import { ISalesOrders } from "@/Interfaces/IOrders";

interface HandleCajaProps {
    onClose: () => void;
    onConfirm: () => void;
    orderData: ISalesOrders;
    totalAmount: number; 
}

const HandleCajaComponent: React.FC<HandleCajaProps> = ({
    onClose,
    onConfirm,
    orderData,
    totalAmount,  // Usa el total recibido como prop
}) => {
    const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "tarjeta">("efectivo");
    const [notification, setNotification] = useState<string>("");

    const handleUpdateCaja = async () => {
        try {
            // Validar que se haya seleccionado al menos un método de pago
            if (!paymentMethod) {
                setNotification("Debe seleccionar un método de pago.");
                return;
            }

            const cajaId = localStorage.getItem("cajaId");
            if (!cajaId) {
                setNotification("No se encontró el ID de la caja.");
                return;
            }

            const caja = await fetchFindBoxById(cajaId);
            if (!caja) {
                setNotification("No se encontró la caja.");
                return;
            }

            const selectedAmount = totalAmount;  // Usa el totalAmount que ya viene como prop

            // Actualizar los valores de la caja
            const cajaActualizada = {
                ...caja,
                saldoFinal: (caja.saldoFinal ?? 0) + selectedAmount,
                ingresoEfectivo: paymentMethod === "efectivo" ? (caja.ingresoEfectivo ?? 0) + selectedAmount : caja.ingresoEfectivo,
                ingresoTarjeta: paymentMethod === "tarjeta" ? (caja.ingresoTarjeta ?? 0) + selectedAmount : caja.ingresoTarjeta,
            };

            const response = await fetchUpdateCaja(cajaId, cajaActualizada);
            if (response) {
                setNotification("Caja actualizada exitosamente.");
                onConfirm(); 
            } else {
                setNotification("Error al actualizar la caja.");
            }
        } catch (error) {
            console.error("Error al actualizar la caja:", error);
            setNotification("Ocurrió un error al actualizar la caja.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Método de pago</h2>

                <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">
                        
                    </label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as "efectivo" | "tarjeta")}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                    </select>
                </div>

                <div className="mb-4">
                    <p className="text-sm font-medium">
                        Total: {totalAmount.toFixed(2)} {/* Muestra el total calculado */}
                    </p>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleUpdateCaja}
                        className="bg-[#FF5100] text-white hover:bg-[#e66f38] py-2 px-4 rounded"
                    >
                        Actualizar Caja
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>

                {notification && <p className="mt-4 text-center text-sm text-green-600">{notification}</p>}
            </div>
        </div>
    );
};

export default HandleCajaComponent;
