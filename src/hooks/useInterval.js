import { useEffect, useRef } from 'react';

// React-safe interval hook.
export function useInterval(callback, delay) {
  const latest = useRef(callback);
  latest.current = callback;

  useEffect(() => {
    if (delay == null) return undefined;
    const id = setInterval(() => latest.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
