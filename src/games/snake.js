// Snake game logic.
export const COLS = 20;
export const ROWS = 13;

const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function randomFood(body) {
  let food;
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (body.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export function createSnake() {
  const body = [{ x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }];
  return { body, dir: DIRECTIONS.right, nextDir: DIRECTIONS.right, food: randomFood(body), status: 'ready' };
}

export function turnSnake(game, name) {
  const d = DIRECTIONS[name];
  if (!d) return;
  const isReverse = d.x === -game.dir.x && d.y === -game.dir.y;
  if (!isReverse) game.nextDir = d;
}

export function togglePause(game) {
  if (game.status === 'ready' || game.status === 'paused') game.status = 'running';
  else if (game.status === 'running') game.status = 'paused';
}

// Returns an event sound key.
export function stepSnake(game) {
  game.dir = game.nextDir;
  const head = { x: game.body[0].x + game.dir.x, y: game.body[0].y + game.dir.y };

  const hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
  const hitSelf = game.body.some((s) => s.x === head.x && s.y === head.y);
  if (hitWall || hitSelf) {
    game.status = 'over';
    return 'over';
  }

  game.body.unshift(head);
  if (head.x === game.food.x && head.y === game.food.y) {
    game.food = randomFood(game.body);
    return 'eat';
  }
  game.body.pop();
  return null;
}
