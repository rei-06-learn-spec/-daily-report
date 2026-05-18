import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const value = localStorage.getItem(key);
    if (!value) {
      return initialValue;
    } else {
      return JSON.parse(value);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
