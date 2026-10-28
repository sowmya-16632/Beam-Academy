import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved || saved === "undefined" || saved === "null") return initialValue;
      return JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    try {
      setValue((current) => {
        const valueToStore = newValue instanceof Function ? newValue(current) : newValue;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (e) {
      console.warn(`Error storing key "${key}" in localStorage`, e);
    }
  };

  return [value, setStoredValue] as const;
}