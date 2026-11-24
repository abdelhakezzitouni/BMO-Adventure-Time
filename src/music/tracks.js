// Simple music tracks.
const seq = (s) => s.trim().split(/\s+/);

export const TRACKS = [
  {
    id: 'treehouse', bpm: 120,
    melody: seq('E5 . G5 . C6 . G5 .  A5 . F5 . A5 . C6 .  G5 . E5 . G5 . E5 .  D5 . E5 . D5 . C5 .'),
    bass: seq('C3 . C3 . C3 . C3 .  F2 . F2 . F2 . F2 .  C3 . C3 . G2 . G2 .  G2 . G2 . G2 . C3 .'),
  },
  {
    id: 'candy', bpm: 96,
    melody: seq('A4 . C5 . E5 . C5 .  F5 . E5 . D5 . C5 .  B4 . D5 . G5 . D5 .  E5 . D5 . C5 . A4 .'),
    bass: seq('A2 . A2 . E3 . E3 .  D3 . D3 . A2 . A2 .  G2 . G2 . D3 . D3 .  E3 . E3 . A2 . A2 .'),
  },
  {
    id: 'dungeon', bpm: 150,
    melody: seq('D5 . F5 . A5 . F5 .  D5 F5 A5 D6 A5 F5 D5 .  Bb4 . D5 . F5 . D5 .  C5 E5 G5 C6 G5 E5 C5 .'),
    bass: seq('D3 . D3 . D3 . D3 .  D3 . D3 . D3 . D3 .  Bb2 . Bb2 . Bb2 . Bb2 .  C3 . C3 . C3 . C3 .'),
  },
  {
    id: 'cloud', bpm: 72,
    melody: seq('F5 . . . A5 . . .  C6 . . . A5 . G5 .  F5 . . . G5 . . .  A5 . G5 . F5 . . .'),
    bass: seq('F2 . . . . . C3 .  F2 . . . . . C3 .  Bb2 . . . . . F2 .  C3 . . . . . F2 .'),
  },
];

const SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export function noteToFreq(token) {
  const m = /^([A-G])([b#]?)(\d)$/.exec(token);
  if (!m) return null;
  let midi = 12 * (Number(m[3]) + 1) + SEMITONES[m[1]];
  if (m[2] === '#') midi += 1;
  if (m[2] === 'b') midi -= 1;
  return 440 * Math.pow(2, (midi - 69) / 12);
}
