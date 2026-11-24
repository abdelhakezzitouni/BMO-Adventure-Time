import { COLS, ROWS, PIECES } from './blocks.js';
import { HEIGHT, drawBackground, drawCell, drawOverlay } from './canvasUtils.js';

const CELL = 16;
const BOARD_X = 120;
const BOARD_Y = (HEIGHT - ROWS * CELL) / 2;
const NEXT_X = 290;
const NEXT_Y = 40;

export function drawBlocks(ctx, game, labels) {
  drawBackground(ctx);

  // Draw board.
  ctx.fillStyle = '#eefaf2';
  ctx.fillRect(BOARD_X, BOARD_Y, COLS * CELL, ROWS * CELL);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 4;
  ctx.strokeRect(BOARD_X - 2, BOARD_Y - 2, COLS * CELL + 4, ROWS * CELL + 4);

  // Draw locked blocks.
  game.grid.forEach((row, r) =>
    row.forEach((color, c) => {
      if (color) drawCell(ctx, BOARD_X + c * CELL, BOARD_Y + r * CELL, CELL, color);
    })
  );

  // Draw active piece.
  const p = game.piece;
  p.shape.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell) drawCell(ctx, BOARD_X + (p.x + c) * CELL, BOARD_Y + (p.y + r) * CELL, CELL, p.color);
    })
  );

  // Draw next piece.
  ctx.fillStyle = '#eefaf2';
  ctx.fillRect(NEXT_X, NEXT_Y, 80, 80);
  ctx.strokeRect(NEXT_X, NEXT_Y, 80, 80);
  const next = PIECES[game.nextType];
  const offsetX = NEXT_X + (80 - next.shape[0].length * CELL) / 2;
  const offsetY = NEXT_Y + (80 - next.shape.length * CELL) / 2;
  next.shape.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell) drawCell(ctx, offsetX + c * CELL, offsetY + r * CELL, CELL, next.color);
    })
  );

  if (game.status === 'ready') drawOverlay(ctx, labels.start);
  if (game.status === 'paused') drawOverlay(ctx, labels.paused);
  if (game.status === 'over') drawOverlay(ctx, labels.over);
}
