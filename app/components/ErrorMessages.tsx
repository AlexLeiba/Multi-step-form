import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
// import { ArrayPath, FieldValues, Path } from 'react-hook-form';

export function ErrorMessages({ name }: { name: string }) {
  return (
    <>
      <ErrorMessage name={name} />
      <ErrorMessage name={`${name}.root`} />
    </>
  );
}
