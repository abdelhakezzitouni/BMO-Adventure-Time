// Routes control actions.
import { useEffect, useRef } from 'react';

const listeners = new Set();

export const controls = {
  emit(action) {
    listeners.forEach((fn) => fn(action));
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function useControls(handler) {
  const latest = useRef(handler);
  latest.current = handler;
  useEffect(() => controls.subscribe((action) => latest.current(action)), []);
}
