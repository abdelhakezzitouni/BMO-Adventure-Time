// Combines BMO parts and screen.
import { useRef } from 'react';
import BmoBody from './BmoBody.jsx';
import BmoFace from './BmoFace.jsx';
import BmoLimbs from './BmoLimbs.jsx';
import { useBlink } from '../../hooks/useBlink.js';
import { useEyeTracking } from '../../hooks/useEyeTracking.js';

export default function Bmo({ dancing, winking, tourStep, screenColor, showFace, mouth, onPress, children }) {
  const wrapRef = useRef(null);
  const look = useEyeTracking(wrapRef);
  const blinking = useBlink(showFace);

  return (
    <div ref={wrapRef} className={dancing ? 'bmo-wrap dance' : 'bmo-wrap'}>
      <BmoLimbs />

      <div className="bmo-body">
        <BmoBody screenColor={screenColor} onPress={onPress} tourStep={tourStep}>
          {showFace && <BmoFace mouth={mouth} look={look} blinking={blinking} winking={winking} />}
        </BmoBody>
        {children && <div className="screen-app">{children}</div>}
      </div>
    </div>
  );
}
