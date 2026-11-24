// Ordered tour steps.
// Coordinates use the 500x750 BMO body.
const bmo = (id, spot, tip, angle) => ({ id, kind: 'bmo', spot, tip, angle });

export const TOUR_STEPS = [
  bmo('menu', { x: 74, y: 372, w: 252, h: 34, rx: 17 }, [66, 389], 0),
  bmo('power', { x: 358, y: 363, w: 50, h: 50, rx: 25 }, [416, 388], 180),
  bmo('up', { x: 124, y: 464, w: 42, h: 46, rx: 10 }, [145, 456], 90),
  bmo('left', { x: 88, y: 500, w: 46, h: 46, rx: 10 }, [80, 523], 0),
  bmo('right', { x: 156, y: 500, w: 46, h: 46, rx: 10 }, [210, 523], 180),
  bmo('down', { x: 122, y: 534, w: 46, h: 44, rx: 10 }, [145, 588], -90),
  bmo('dance', { x: 298, y: 482, w: 86, h: 84, rx: 14 }, [294, 478], 53),
  bmo('color', { x: 424, y: 548, w: 54, h: 54, rx: 27 }, [451, 538], 90),
  bmo('ok', { x: 330, y: 605, w: 106, h: 106, rx: 53 }, [433, 691], 213),
  bmo('wink', { x: 62, y: 638, w: 94, h: 40, rx: 20 }, [109, 686], -90),
  bmo('laugh', { x: 153, y: 638, w: 94, h: 40, rx: 20 }, [200, 686], -90),
  // Top-bar buttons.
  { id: 'lang', kind: 'top' },
  { id: 'mute', kind: 'top' },
  { id: 'help', kind: 'top' },
];
