import React from 'react';
import { StepFormNavigation } from '../components/StepFormNavigation';

export default async function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='max-w-screen-2xl m-6 px-6 py-6  bg-gray-800 rounded-md h-[calc(100vh-120px)] relative'>
      <StepFormNavigation />
      {children}
    </div>
  );
}
