"use client"
import React from 'react';
import CreateProduct from '@/components/Products/CreateProduct';
import ProtectedRoute from '@/components/ProtectedRoute';



    export default function UploadProducts() {
      return (
        <ProtectedRoute>
      <CreateProduct />
               </ProtectedRoute>
      );
    }