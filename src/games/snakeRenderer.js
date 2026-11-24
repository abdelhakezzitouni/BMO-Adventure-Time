import { COLS, ROWS } from './snake.js';
import { HEIGHT, drawBackground, drawOverlay } from './canvasUtils.js';

const CELL = 20;
const OFFSET_Y = (HEIGHT - ROWS * CELL) / 2;
const INK = '#111';

export function drawSnake(ctx, game, labels) {
  drawBackground(ctx);

  // Draw grid.
  ctx.fillStyle = 'rgba(0,0,0,.05)';
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if ((x + y) % 2 === 0) ctx.fillRect(x * CELL, OFFSET_Y + y * CELL, CELL, CELL);
    }
  }

  // Draw food.
  const fx = game.food.x * CELL + CELL / 2;
  const fy = OFFSET_Y + game.food.y * CELL + CELL / 2;
  ctx.fillStyle = '#ef3e4a';
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(fx, fy + 1, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Draw snake and eyes.
  game.body.forEach((s, i) => {
    const x = s.x * CELL;
    const y = OFFSET_Y + s.y * CELL;
    ctx.fillStyle = i === 0 ? '#8fe07a' : '#68b857';
    ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
    ctx.strokeRect(x + 1.25, y + 1.25, CELL - 2.5, CELL - 2.5);
  });
  const head = game.body[0];
  ctx.fillStyle = INK;
  [[6, 7], [14, 7]].forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(head.x * CELL + dx, OFFSET_Y + head.y * CELL + dy, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });

  if (game.status === 'ready') drawOverlay(ctx, labels.start);
  if (game.status === 'paused') drawOverlay(ctx, labels.paused);
  if (game.status === 'over') drawOverlay(ctx, labels.over);
}
