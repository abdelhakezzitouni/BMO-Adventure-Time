import { useEffect, useState } from 'react';

// Blinks at random intervals.
export function useBlink(enabled) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    let timer;
    const schedule = () => {
      timer = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 140);
        schedule();
      }, 2200 + Math.random() * 2800);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [enabled]);

  return blinking;
}
