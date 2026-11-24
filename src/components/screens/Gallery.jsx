// Full-screen image gallery.
import { useState } from 'react';
import { FRIENDS, IMAGE_EXTENSIONS } from '../../data/friends.js';
import { useControls } from '../../hooks/useControls.js';
import { useDirections } from '../../i18n/I18nProvider.jsx';

function FriendImage({ friend, name }) {
  const [extIndex, setExtIndex] = useState(0); // Try image formats.

  if (extIndex >= IMAGE_EXTENSIONS.length) {
    return null;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}images/${friend.file}.${IMAGE_EXTENSIONS[extIndex]}`}
      alt={name}
      draggable={false}
      onError={() => setExtIndex((i) => i + 1)}
    />
  );
}

export default function Gallery() {
  const { forward, back } = useDirections();
  const [index, setIndex] = useState(0);
  const go = (d) => setIndex((i) => (i + d + FRIENDS.length) % FRIENDS.length);

  useControls((action) => {
    if (action === forward || action === 'ok') go(1);
    if (action === back) go(-1);
  });

  const friend = FRIENDS[index];
  return (
    <div className="gallery" onClick={() => go(1)}>
      <FriendImage key={friend.file} friend={friend} name={`Photo ${friend.file}`} />
    </div>
  );
}
