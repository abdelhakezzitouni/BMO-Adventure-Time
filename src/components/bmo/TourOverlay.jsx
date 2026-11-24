// Highlights the current tour control.
export default function TourOverlay({ step }) {
  const { spot, tip, angle } = step;
  const rect = { x: spot.x, y: spot.y, width: spot.w, height: spot.h, rx: spot.rx };

  return (
    <g className="tour-layer" pointerEvents="none">
      <defs>
        <mask id="tour-mask">
          <rect width="500" height="750" fill="#fff" />
          <rect {...rect} fill="#000" />
        </mask>
      </defs>
      <rect x="3" y="3" width="494" height="744" rx="36" fill="#051412" fillOpacity="0.55" mask="url(#tour-mask)" />
      <rect {...rect} className="tour-ring" fill="none" stroke="#ffd34d" strokeWidth="6" />

      {/* Arrow points right, then rotates. */}
      <g transform={`translate(${tip[0]} ${tip[1]}) rotate(${angle})`}>
        <g className="tour-arrow">
          <path d="M0 0L-24 -15V-7H-56V7H-24V15Z" fill="#ffd34d" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
        </g>
      </g>
    </g>
  );
}
