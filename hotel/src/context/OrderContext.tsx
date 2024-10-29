"use client";

import React, { createContext, useContext, useState } from "react";
import { Order, Product } from "../Interfaces/interfaces";

interface OrderContextType {
  orders: Order[];
  addOrder: (
    product: Product,
    quantity: number,
    user: string,
    roomNumber: string
  ) => void; // Actualiza la firma
  removeOrder: (id: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

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
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const removeOrder = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.product.id !== id)
    );
  };

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
