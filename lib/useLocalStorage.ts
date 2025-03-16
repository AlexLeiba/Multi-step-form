'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage<T>({ key }: { key: string }): {
  storedValue: T | null;
  onChangeValue: (value: any) => void;
} {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let storedValue: T | null = null;
  if (mounted) {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
      storedValue = JSON.parse(localStorage.getItem(key) || '');
    }

    if (!storedValue) {
      localStorage.setItem(key, '{}');
    }
  }
  function onChangeValue(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { storedValue, onChangeValue };
}
