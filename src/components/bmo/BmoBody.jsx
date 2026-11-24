// BMO body and controls.
import SvgButton from './SvgButton.jsx';
import TourOverlay from './TourOverlay.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';

const STROKE = { stroke: '#111', strokeWidth: 6 };

export default function BmoBody({ screenColor, onPress, tourStep, children }) {
  const { t } = useI18n();
  const name = (id) => t.tour.steps[id].title; // Accessible button name.
  const btn = { onPress };

  return (
    <svg className="bmo-svg" viewBox="0 0 500 750" role="img" aria-label="BMO">
      <rect x="3" y="3" width="494" height="744" rx="36" fill="#2aa99b" {...STROKE} />
      <rect x="43" y="63" width="412" height="272" rx="46" fill={screenColor} {...STROKE} />

      {children /* Face. */}

      {/* Menu and power buttons. */}
      <SvgButton id="menu" label={name('menu')} {...btn}>
        <rect x="80" y="376" width="240" height="26" rx="13" fill="#1b5e45" {...STROKE} />
      </SvgButton>
      <SvgButton id="power" label={name('power')} {...btn}>
        <circle cx="383" cy="388" r="19" fill="#0e4c85" {...STROKE} />
      </SvgButton>

      {/* Direction controls. */}
      <path
        d="M128 470H162V506H196V540H162V572H128V540H94V506H128Z"
        fill="#ffd34d" {...STROKE} strokeLinejoin="round" pointerEvents="none"
      />
      <SvgButton id="up" label={name('up')} {...btn}><rect x="116" y="458" width="62" height="50" fill="transparent" /></SvgButton>
      <SvgButton id="left" label={name('left')} {...btn}><rect x="80" y="500" width="52" height="46" fill="transparent" /></SvgButton>
      <SvgButton id="right" label={name('right')} {...btn}><rect x="158" y="500" width="52" height="46" fill="transparent" /></SvgButton>
      <SvgButton id="down" label={name('down')} {...btn}><rect x="116" y="538" width="62" height="46" fill="transparent" /></SvgButton>

      <SvgButton id="dance" label={name('dance')} {...btn}>
        <path d="M341 489L376 558H306Z" fill="#46b8e0" {...STROKE} strokeLinejoin="round" />
      </SvgButton>
      <SvgButton id="color" label={name('color')} {...btn}>
        <circle cx="451" cy="575" r="20" fill="#68b857" {...STROKE} />
      </SvgButton>
      <SvgButton id="ok" label={name('ok')} {...btn}>
        <circle cx="383" cy="658" r="47" fill="#ef3e4a" {...STROKE} />
      </SvgButton>
      <SvgButton id="wink" label={name('wink')} {...btn}>
        <rect x="70" y="646" width="78" height="24" rx="12" fill="#0e4c85" {...STROKE} />
      </SvgButton>
      <SvgButton id="laugh" label={name('laugh')} {...btn}>
        <rect x="161" y="646" width="78" height="24" rx="12" fill="#0e4c85" {...STROKE} />
      </SvgButton>

      {tourStep && tourStep.kind === 'bmo' && <TourOverlay key={tourStep.id} step={tourStep} />}
    </svg>
  );
}
