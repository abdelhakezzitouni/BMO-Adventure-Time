import { useEffect, useState } from 'react';

// Tracks pointer movement.
export function useEyeTracking(ref) {
  const [look, setLook] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const clamp = (v) => Math.max(-1, Math.min(1, v * 3));
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = clamp((e.clientX - (r.left + r.width / 2)) / r.width);
      const dy = clamp((e.clientY - (r.top + r.height / 3)) / r.height);
      setLook({ x: dx * 18, y: dy * 12 });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [ref]);

  return look;
}
