// Blocks game logic.
export const COLS = 10;
export const ROWS = 16;

export const PIECES = {
  I: { shape: [[1, 1, 1, 1]], color: '#46b8e0' },
  O: { shape: [[1, 1], [1, 1]], color: '#ffd34d' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#f29ac2' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#68b857' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef3e4a' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#5b7fe0' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f5a04a' },
};
const TYPES = Object.keys(PIECES);

const randomType = () => TYPES[Math.floor(Math.random() * TYPES.length)];
const emptyGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));
const rotateMatrix = (m) => m[0].map((_, c) => m.map((row) => row[c]).reverse());

function spawn(type) {
  const { shape, color } = PIECES[type];
  return { shape, color, x: Math.floor((COLS - shape[0].length) / 2), y: 0 };
}

export function createBlocks() {
  return { grid: emptyGrid(), piece: spawn(randomType()), nextType: randomType(), status: 'ready' };
}

function collides(grid, shape, x, y) {
  return shape.some((row, r) =>
    row.some((cell, c) => {
      if (!cell) return false;
      const gx = x + c;
      const gy = y + r;
      return gx < 0 || gx >= COLS || gy >= ROWS || (gy >= 0 && grid[gy][gx]);
    })
  );
}

export function movePiece(game, dx) {
  const p = game.piece;
  if (!collides(game.grid, p.shape, p.x + dx, p.y)) p.x += dx;
}

export function rotatePiece(game) {
  const p = game.piece;
  const rotated = rotateMatrix(p.shape);
  for (const kick of [0, -1, 1, -2, 2]) { // Try wall kicks.
    if (!collides(game.grid, rotated, p.x + kick, p.y)) {
      p.shape = rotated;
      p.x += kick;
      return true;
    }
  }
  return false;
}

// Returns the drop event.
export function dropPiece(game) {
  const p = game.piece;
  if (!collides(game.grid, p.shape, p.x, p.y + 1)) {
    p.y += 1;
    return null;
  }
  return lockPiece(game);
}

function lockPiece(game) {
  const { piece, grid } = game;
  piece.shape.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell && grid[piece.y + r]) grid[piece.y + r][piece.x + c] = piece.color;
    })
  );

  // Remove full rows.
  game.grid = grid.filter((row) => row.some((cell) => !cell));
  const cleared = ROWS - game.grid.length;
  while (game.grid.length < ROWS) game.grid.unshift(Array(COLS).fill(null));

  game.piece = spawn(game.nextType);
  game.nextType = randomType();
  if (collides(game.grid, game.piece.shape, game.piece.x, game.piece.y)) {
    game.status = 'over';
    return 'over';
  }
  return cleared ? 'clear' : 'lock';
}

export function togglePause(game) {
  if (game.status === 'ready' || game.status === 'paused') game.status = 'running';
  else if (game.status === 'running') game.status = 'paused';
}
