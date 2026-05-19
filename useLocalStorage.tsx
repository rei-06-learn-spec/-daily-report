import { useEffect, useState } from "react";
import type z from "zod";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema: z.ZodType<T>
) {
  const [value, setValue] = useState<T>(() => {
    const value = localStorage.getItem(key);
    if (!value) {
      return initialValue;
    } else {
      const parseValue = JSON.parse(value);

      const result = schema.safeParse(parseValue);

      if (!result.success) {
        return initialValue;
      } else {
        return result.data;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
