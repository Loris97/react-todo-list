// src/hooks/useLocalStorage.ts
// Custom hook professionale - Riutilizzabile in qualsiasi progetto
// Questo è il tipo di codice che piace ai recruiter!

import { useState, useEffect } from 'react';

/**
 * Custom hook per gestire localStorage in modo type-safe
 * @param key - La chiave del localStorage
 * @param initialValue - Valore iniziale se localStorage è vuoto
 * @returns [valore, funzione per settare il valore]
 *
 * Vantaggi:
 * - Logica centralizzata (DRY)
 * - Type-safe con TypeScript
 * - Sincronizzazione automatica tra tab
 * - Error handling built-in
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Stato che riflette il localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Errore lettura localStorage [${key}]:`, error);
      return initialValue;
    }
  });

  // Funzione per aggiornare il valore e il localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Supporta sia valore diretto che function updater (come setState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      // Sincronizza tra tab (storage event)
      window.dispatchEvent(
        new CustomEvent('local-storage', {
          detail: { key, newValue: valueToStore },
        })
      );
    } catch (error) {
      console.error(`Errore scrittura localStorage [${key}]:`, error);
    }
  };

  // Sincronizza quando storage cambia in un altro tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}