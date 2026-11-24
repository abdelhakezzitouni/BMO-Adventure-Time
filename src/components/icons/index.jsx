const INK = '#111';

// Snake icon.
export function SnakeIcon() {
  const body = 'M12 50C12 36 30 44 34 32C38 20 24 18 30 10';
  return (
    <svg viewBox="0 0 64 64" className="icon" aria-hidden="true">
      <path d={body} fill="none" stroke={INK} strokeWidth="17" strokeLinecap="round" />
      <path d={body} fill="none" stroke="#68b857" strokeWidth="10" strokeLinecap="round" />
      <path d="M30 14L30 5M30 5L26 1M30 5L35 1" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M30 5L26 1M30 5L35 1" fill="none" stroke="#ef3e4a" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="26.5" cy="12" r="2.2" fill={INK} />
      <circle cx="33.5" cy="12" r="2.2" fill={INK} />
      <circle cx="52" cy="46" r="7" fill="#ef3e4a" stroke={INK} strokeWidth="3.5" />
      <path d="M52 39C52 35 56 34 57 35" fill="none" stroke="#68b857" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Blocks icon.
export function BlocksIcon() {
  const cell = (x, y, fill) => (
    <rect x={x} y={y} width="17" height="17" rx="4" fill={fill} stroke={INK} strokeWidth="3.5" />
  );
  return (
    <svg viewBox="0 0 64 64" className="icon" aria-hidden="true">
      {cell(6, 8, '#ef3e4a')}
      {cell(23, 8, '#ef3e4a')}
      {cell(40, 8, '#ef3e4a')}
      {cell(23, 25, '#ef3e4a')}
      {cell(6, 42, '#46b8e0')}
      {cell(23, 42, '#ffd34d')}
      {cell(40, 42, '#68b857')}
      {cell(40, 25, '#ffd34d')}
    </svg>
  );
}

// Gallery icon.
export function GalleryIcon() {
  return (
    <svg viewBox="0 0 64 64" className="icon" aria-hidden="true">
      <rect x="5" y="9" width="54" height="46" rx="9" fill="#46b8e0" stroke={INK} strokeWidth="4" />
      <circle cx="44" cy="23" r="7" fill="#ffd34d" stroke={INK} strokeWidth="3.5" />
      <path d="M5 50C14 32 26 32 36 46C42 40 50 40 59 48V46A9 9 0 0 1 50 55H14A9 9 0 0 1 5 46Z" fill="#68b857" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 55C32 46 42 44 59 50V46A9 9 0 0 1 50 55Z" fill="#f29ac2" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

// Music icon.
export function MusicIcon() {
  const stems = 'M22 46V14L52 8V44';
  return (
    <svg viewBox="0 0 64 64" className="icon" aria-hidden="true">
      <path d={stems} fill="none" stroke={INK} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <path d={stems} fill="none" stroke="#ffd34d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="14" cy="48" rx="10" ry="8" fill="#f29ac2" stroke={INK} strokeWidth="3.5" />
      <ellipse cx="44" cy="46" rx="10" ry="8" fill="#f29ac2" stroke={INK} strokeWidth="3.5" />
    </svg>
  );
}

// Speaker icon.
export function SpeakerIcon({ muted = false }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor" />
      {muted ? (
        <path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <path d="M16 8c2 2 2 6 0 8M19 5c4 4 4 10 0 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      )}
    </svg>
  );
}
