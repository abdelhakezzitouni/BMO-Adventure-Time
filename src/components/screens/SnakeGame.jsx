import { useEffect, useRef } from 'react';
import { createSnake, stepSnake, turnSnake, togglePause } from '../../games/snake.js';
import { drawSnake } from '../../games/snakeRenderer.js';
import { WIDTH, HEIGHT } from '../../games/canvasUtils.js';
import { useControls } from '../../hooks/useControls.js';
import { useInterval } from '../../hooks/useInterval.js';
import { sfx } from '../../lib/sound.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';

export default function SnakeGame() {
  const { t } = useI18n();
  const canvasRef = useRef(null);
  const game = useRef(createSnake());

  const paint = () => drawSnake(canvasRef.current.getContext('2d'), game.current, t.game);

  // Redraw when language changes.
  useEffect(() => {
    paint();
  }, [t]);

  useInterval(() => {
    if (game.current.status === 'running') {
      const result = stepSnake(game.current); // Game event.
      if (result) sfx[result]();
      paint();
    }
  }, 130);

  useControls((action) => {
    if (action === 'ok') {
      if (game.current.status === 'over') game.current = createSnake();
      else togglePause(game.current);
    } else {
      turnSnake(game.current, action);
      if (game.current.status === 'ready') game.current.status = 'running';
    }
    paint();
  });

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />;
}
