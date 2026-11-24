// Handles face moods.
import { useCallback, useRef, useState } from 'react';
import { useInterval } from './useInterval.js';

const LAUGH_FRAMES = ['happy', 'smile'];

export function useFace() {
  const [mood, setMood] = useState('happy');
  const [laughing, setLaughing] = useState(false);
  const [frame, setFrame] = useState(0);
  const timer = useRef(null);

  useInterval(() => setFrame((f) => f + 1), laughing ? 140 : null);

  const laugh = useCallback((ms) => {
    setLaughing(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLaughing(false), ms);
  }, []);

  const mouth = laughing ? LAUGH_FRAMES[frame % LAUGH_FRAMES.length] : mood;
  return { mouth, setMood, laugh };
}
