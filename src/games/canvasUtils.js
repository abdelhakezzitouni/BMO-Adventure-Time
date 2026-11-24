// Shared canvas helpers.
export const WIDTH = 400;
export const HEIGHT = 264;
const INK = '#111';

export function drawBackground(ctx) {
  ctx.fillStyle = '#cdebd8';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

// Draw a highlighted block.
export function drawCell(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = 'rgba(255,255,255,.45)';
  ctx.fillRect(x + 3, y + 3, size * 0.35, 3);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(x + 1.25, y + 1.25, size - 2.5, size - 2.5);
}

export function drawOverlay(ctx, text) {
  ctx.fillStyle = 'rgba(0,0,0,.6)';
  ctx.fillRect(0, HEIGHT / 2 - 24, WIDTH, 48);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
}
