"use client";
import Location from '@/components/Locations/Location';
import { NotificationsForms } from '@/components/Notifications/NotificationsForms';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function Page() {


  return (
    <div className="bg-background text-foreground">
      <Location />
        </div>
  );
}
