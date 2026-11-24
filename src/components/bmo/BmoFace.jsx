// BMO face.

const GREEN = '#2f4a2f';
const MOUTH_PATH = 'M2 2H103C103 45 82 76 52 76C24 76 2 45 2 2Z';

function Mouth({ type }) {
  switch (type) {
    case 'smile':
      return <path d="M6 14C16 56 90 56 100 14Z" fill={GREEN} stroke="#111" strokeWidth="5" strokeLinejoin="round" />;
    case 'wow':
      return <ellipse cx="52" cy="40" rx="20" ry="28" fill={GREEN} stroke="#111" strokeWidth="5" />;
    case 'sad':
      return <path d="M12 62Q52 14 92 62" fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round" />;
    default: // Happy face.
      return (
        <>
          <clipPath id="mouth-clip"><path d={MOUTH_PATH} /></clipPath>
          <path d={MOUTH_PATH} fill={GREEN} />
          <g clipPath="url(#mouth-clip)">
            <rect width="105" height="17" fill="#fff" />
            <ellipse cx="52" cy="80" rx="34" ry="20" fill="#a8a68c" />
          </g>
          <path d={MOUTH_PATH} fill="none" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
        </>
      );
  }
}

export default function BmoFace({ mouth, look, blinking, winking }) {
  const eye = (closed) => ({
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: closed ? 'scaleY(0.1)' : 'none',
    transition: 'transform 0.08s',
  });

  return (
    <g>
      <g transform={`translate(${look.x} ${look.y})`}>
        <circle cx="140" cy="167" r="10" fill="#111" style={eye(blinking || winking)} />
        <circle cx="356" cy="167" r="10" fill="#111" style={eye(blinking)} />
      </g>
      <g transform="translate(197 200)">
        <Mouth type={mouth} />
      </g>
    </g>
  );
}
