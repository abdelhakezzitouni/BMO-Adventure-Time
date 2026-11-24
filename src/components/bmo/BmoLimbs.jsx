// BMO arms and legs.

// Limb outlines and fills.
function Tube({ d }) {
  return (
    <>
      <path d={d} className="limb-outline" />
      <path d={d} className="limb-fill" />
    </>
  );
}

export default function BmoLimbs() {
  return (
    <svg className="limbs" viewBox="0 0 500 750" aria-hidden="true">
      <ellipse cx="250" cy="888" rx="175" ry="10" fill="#000" fillOpacity="0.15" />
      {['left', 'right'].map((side) => {
        // Draw left side and mirror it.
        const x = (v) => (side === 'left' ? v : 500 - v);
        const arm = `M${x(3)} 525C${x(-35)} 528 ${x(-62)} 555 ${x(-66)} 605S${x(-72)} 640 ${x(-73)} 655`;
        const leg = `M${x(140)} 747V872`;

        return (
          <g key={side}>
            <Tube d={leg} />
            <ellipse className="limb-end" cx={x(128)} cy="877" rx="22" ry="9" />
            <g className={`arm ${side}`} style={{ transformOrigin: `${x(3)}px 525px` }}>
              <Tube d={arm} />
              <ellipse className="limb-end" cx={x(-73)} cy="669" rx="11" ry="14" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
