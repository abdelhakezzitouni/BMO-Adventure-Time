// Maps keys to button actions.
import { useEffect, useRef } from 'react';

const KEY_TO_ACTION = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'ok',
  ' ': 'ok',
  Escape: 'back',
};

export function useKeyboard(onPress) {
  const latest = useRef(onPress);
  latest.current = onPress;

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target !== document.body) return; // Skip focused controls.
      const action = KEY_TO_ACTION[e.key];
      if (!action) return;
      e.preventDefault();
      latest.current(action);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
