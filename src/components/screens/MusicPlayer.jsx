import { useEffect, useRef, useState } from 'react';
import { MusicIcon } from '../icons/index.jsx';
import { TRACKS } from '../../music/tracks.js';
import { createPlayer } from '../../music/player.js';
import { useControls } from '../../hooks/useControls.js';
import { useI18n, useDirections } from '../../i18n/I18nProvider.jsx';

const BAR_COLORS = ['#ef3e4a', '#ffd34d', '#68b857', '#46b8e0', '#f29ac2'];
const BARS = 10;

export default function MusicPlayer() {
  const { t } = useI18n();
  const { forward, back } = useDirections();
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const player = useRef(null);

  // Create and clean up the player.
  useEffect(() => {
    let alive = true;
    player.current = createPlayer((s) => alive && setStep(s));
    return () => {
      alive = false;
      player.current.pause();
    };
  }, []);

  const select = (index) => {
    const next = (index + TRACKS.length) % TRACKS.length;
    setTrack(next);
    player.current.setTrack(next);
  };

  const togglePlay = () => {
    if (playing) {
      player.current.pause();
    } else {
      player.current.setTrack(track);
      player.current.play();
    }
    setPlaying(!playing);
  };

  useControls((action) => {
    if (action === 'ok') togglePlay();
    if (action === forward) select(track + 1);
    if (action === back) select(track - 1);
  });

  // Update visualizer heights.
  const barHeight = (i) => (playing ? 25 + ((step * 7 + i * 13) % 70) : 12);

  return (
    <div className="music">
      <div className={playing ? 'music-icon bounce' : 'music-icon'}><MusicIcon /></div>
      <div className="track-name">{t.music.tracks[track]}</div>
      <div className="bars" aria-hidden="true">
        {Array.from({ length: BARS }, (_, i) => (
          <span key={i} style={{ height: `${barHeight(i)}%`, background: BAR_COLORS[i % BAR_COLORS.length] }} />
        ))}
      </div>
      <div className="dots" aria-hidden="true">
        {TRACKS.map((tr, i) => <i key={tr.id} className={i === track ? 'on' : ''} />)}
      </div>
      <small>{playing ? '\u00A0' : t.music.press}</small>
    </div>
  );
}
