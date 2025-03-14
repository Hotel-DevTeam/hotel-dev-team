"use client";
import React, { useState } from 'react';
import { INotificationProps } from '../../Interfaces/IUser';

export const NotificationsForms: React.FC<INotificationProps> = ({ message }) => {
 
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (

    isVisible && (
      <div 
        role="alert" 
        className="fixed top-6 right-4 rounded-xl border border-indigo-600 bg-indigo-600 text-white p-4 shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="mt-1 text-sm text-white">{message}</p>
          </div>

          <button 
            onClick={handleClose} 
            className="text-white transition hover:text-gray-600"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};
