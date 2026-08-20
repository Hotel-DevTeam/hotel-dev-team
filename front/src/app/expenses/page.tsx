"use client"
import ExpensesForm from '@/components/Expenses/ExpensesForm';
import ProtectedRouteStaff from '@/components/ProtectedRouteStaff';
import React from 'react';

export default function Page() {

  return (
    <ProtectedRouteStaff>
      <ExpensesForm  />
    </ProtectedRouteStaff>
  );
}
