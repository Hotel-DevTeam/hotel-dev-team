"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Order, Product } from "../Interfaces/interfaces";

interface OrderContextType {
  orders: Order[];
  addOrder: (
    product: Product,
    quantity: number,
    user: string,
    roomNumber: string
  ) => void;
  removeOrder: (id: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Cargar las órdenes desde localStorage al iniciar
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  const addOrder = (
    product: Product,
    quantity: number,
    user: string,
    roomNumber: string
  ) => {
    const newOrder: Order = {
      product,
      quantity,
      user,
      roomNumber,
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    // Guardar las órdenes actualizadas en localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const removeOrder = (id: number) => {
    const updatedOrders = orders.filter((order) => order.product.id !== id);
    setOrders(updatedOrders);
    // Guardar las órdenes actualizadas en localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  useEffect(() => {
    // Guardar las órdenes en localStorage cada vez que cambien
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
