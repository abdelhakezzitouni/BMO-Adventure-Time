import { getAudio } from './audio.js';

// Plays a short tone.
function tone(frequency, { delay = 0, duration = 0.09, type = 'square', volume = 0.05 } = {}) {
  try {
    const { ctx, master } = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + delay;
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  } catch {
    /* Ignore blocked audio. */
  }
}

// Button sounds.
export const beep = (frequency = 520) => tone(frequency);

// Game sounds.
export const sfx = {
  eat: () => {
    tone(660);
    tone(990, { delay: 0.07 });
  },
  lock: () => tone(180, { duration: 0.08, type: 'triangle', volume: 0.08 }),
  clear: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, { delay: i * 0.07 })),
  over: () => {
    tone(300, { duration: 0.15, type: 'sawtooth' });
    tone(220, { delay: 0.15, duration: 0.15, type: 'sawtooth' });
    tone(150, { delay: 0.3, duration: 0.3, type: 'sawtooth' });
  },
};
