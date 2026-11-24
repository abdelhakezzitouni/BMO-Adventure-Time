// Schedules Web Audio notes.
import { getAudio } from '../lib/audio.js';
import { TRACKS, noteToFreq } from './tracks.js';

function playNote(ctx, destination, freq, time, duration, type, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(gain);
  gain.connect(destination);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

export function createPlayer(onStep) {
  let track = TRACKS[0];
  let timer = null;
  let step = 0;
  let nextTime = 0;

  const schedule = () => {
    const { ctx, master } = getAudio();
    const stepDuration = 60 / track.bpm / 2;

    while (nextTime < ctx.currentTime + 0.2) {
      const melody = noteToFreq(track.melody[step % track.melody.length]);
      const bass = noteToFreq(track.bass[step % track.bass.length]);
      if (melody) playNote(ctx, master, melody, nextTime, stepDuration * 0.9, 'square', 0.07);
      if (bass) playNote(ctx, master, bass, nextTime, stepDuration * 1.8, 'triangle', 0.12);

      const current = step;
      setTimeout(() => onStep && onStep(current), Math.max(0, (nextTime - ctx.currentTime) * 1000));
      nextTime += stepDuration;
      step += 1;
    }
  };

  return {
    setTrack(index) {
      track = TRACKS[index];
      step = 0;
    },
    play() {
      const { ctx } = getAudio();
      nextTime = ctx.currentTime + 0.05;
      clearInterval(timer);
      timer = setInterval(schedule, 50);
    },
    pause() {
      clearInterval(timer);
      timer = null;
    },
  };
}
