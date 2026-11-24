import { useState } from 'react';
import { useControls } from '../../hooks/useControls.js';
import { useI18n, useDirections } from '../../i18n/I18nProvider.jsx';
import { BlocksIcon, GalleryIcon, MusicIcon, SnakeIcon } from '../icons/index.jsx';

const ITEMS = [
  { id: 'snake', Icon: SnakeIcon },
  { id: 'blocks', Icon: BlocksIcon },
  { id: 'gallery', Icon: GalleryIcon },
  { id: 'music', Icon: MusicIcon },
];

export default function Menu({ onOpen }) {
  const { t } = useI18n();
  const { forward, back } = useDirections();
  const [index, setIndex] = useState(0);
  const step = (d) => setIndex((i) => (i + d + ITEMS.length) % ITEMS.length);

  useControls((action) => {
    if (action === forward) step(1);
    if (action === back) step(-1);
    if (action === 'ok') onOpen(ITEMS[index].id);
  });

  return (
    <div className="menu">
      {ITEMS.map(({ id, Icon }, i) => (
        <button key={id} className={i === index ? 'tile selected' : 'tile'} onClick={() => onOpen(id)}>
          <Icon />
          <span>{t.apps[id]}</span>
        </button>
      ))}
    </div>
  );
}
