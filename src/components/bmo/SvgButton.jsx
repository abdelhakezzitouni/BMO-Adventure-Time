import { useState } from 'react';

// SVG button input.
export default function SvgButton({ id, label, onPress, children }) {
  const [pressed, setPressed] = useState(false);

  const press = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 120);
    onPress(id);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      press();
    }
  };

  return (
    <g
      className={pressed ? 'btn pressed' : 'btn'}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={press}
      onKeyDown={onKeyDown}
    >
      {children}
    </g>
  );
}
