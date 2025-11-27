import { useEffect, useState } from "react";

export function useDebounceFetch<T>(
  value: T,
  delay: number = 500,
  callback?: (val: T) => void
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback && callback(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ================== useCase ======================== example ==================== //
// const [search, setSearch] = useState("");

// useDebounceFetch(search, 600, (text) => {
//   fetchProducts(text); // API call
// });
