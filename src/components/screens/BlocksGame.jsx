import { useEffect, useRef } from 'react';
import { createBlocks, dropPiece, movePiece, rotatePiece, togglePause } from '../../games/blocks.js';
import { drawBlocks } from '../../games/blocksRenderer.js';
import { WIDTH, HEIGHT } from '../../games/canvasUtils.js';
import { useControls } from '../../hooks/useControls.js';
import { useInterval } from '../../hooks/useInterval.js';
import { sfx } from '../../lib/sound.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';

export default function BlocksGame() {
  const { t } = useI18n();
  const canvasRef = useRef(null);
  const game = useRef(createBlocks());

  const paint = () => drawBlocks(canvasRef.current.getContext('2d'), game.current, t.game);

  // Redraw when language changes.
  useEffect(() => {
    paint();
  }, [t]);

  // Drop blocks every half second.
  useInterval(() => {
    if (game.current.status === 'running') {
      const result = dropPiece(game.current); // Drop event.
      if (result) sfx[result]();
      paint();
    }
  }, 500);

  useControls((action) => {
    const g = game.current;
    if (action === 'ok') {
      if (g.status === 'over') game.current = createBlocks();
      else togglePause(g);
    } else if (g.status === 'running') {
      if (action === 'left') movePiece(g, -1);
      if (action === 'right') movePiece(g, 1);
      if (action === 'up') rotatePiece(g);
      if (action === 'down') {
        const result = dropPiece(g);
        if (result) sfx[result]();
      }
    }
    paint();
  });

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />;
}
