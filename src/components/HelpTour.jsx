// Tour card and navigation.
import { TOUR_STEPS } from '../data/tourSteps.js';

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HelpTour({ t, index, onGo, onClose }) {
  const step = TOUR_STEPS[index];
  const info = t.tour.steps[step.id];
  const last = index === TOUR_STEPS.length - 1;

  return (
    <section className="tour-card" aria-live="polite">
      <div className="tour-head">
        <span className="num">{index + 1}</span>
        <h2>{info.title}</h2>
        <span className="tour-count">{t.tour.step} {index + 1}/{TOUR_STEPS.length}</span>
      </div>

      <p className="tour-text">
        {step.kind === 'top' && (
          <svg className="tour-up" viewBox="-60 -20 64 40" width="34" height="22" aria-hidden="true">
            <path d="M0 0L-24 -15V-7H-56V7H-24V15Z" fill="#ffd34d" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        )}
        {info.text}
      </p>

      <div className="tour-dots">
        {TOUR_STEPS.map((s, i) => (
          <button key={s.id} className={i === index ? 'dot on' : 'dot'} aria-label={`${t.tour.step} ${i + 1}`} onClick={() => onGo(i)} />
        ))}
      </div>

      <div className="tour-actions">
        <button className="tour-btn back" disabled={index === 0} onClick={() => onGo(index - 1)}>
          <Chevron />{t.tour.back}
        </button>
        <button className="tour-btn next" onClick={() => (last ? onClose() : onGo(index + 1))}>
          {last ? t.tour.done : t.tour.next}{!last && <Chevron />}
        </button>
      </div>
    </section>
  );
}
