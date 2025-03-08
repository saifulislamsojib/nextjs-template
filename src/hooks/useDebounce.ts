import { useEffect, useState } from 'react';

/**
 * Hook that debounces a value by a certain amount of time.
 *
 * @param value - The value to debounce
 * @param delay - The amount of time in milliseconds to debounce in milliseconds (default: 500)
 * @returns The debounced value
 */
const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
