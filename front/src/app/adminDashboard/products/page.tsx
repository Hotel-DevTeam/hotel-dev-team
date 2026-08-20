"use client";
import React from "react";
import AllProducts from "@/components/Products/AllProducts";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Productspage() {


  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground">
        <AllProducts />
      </div>
    </ProtectedRoute>
  );
}
