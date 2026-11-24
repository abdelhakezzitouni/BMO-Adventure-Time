// Shared audio context.
let ctx;
let master;
let muted = false;

export function getAudio() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 1;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return { ctx, master };
}

export function setMuted(value) {
  muted = value;
  if (master) master.gain.value = value ? 0 : 1;
}
