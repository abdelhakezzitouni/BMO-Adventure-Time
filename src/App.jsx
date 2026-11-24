// Main app state.
import { useState } from 'react';
import Bmo from './components/bmo/Bmo.jsx';
import TopBar from './components/TopBar.jsx';
import HelpTour from './components/HelpTour.jsx';
import Menu from './components/screens/Menu.jsx';
import SnakeGame from './components/screens/SnakeGame.jsx';
import BlocksGame from './components/screens/BlocksGame.jsx';
import Gallery from './components/screens/Gallery.jsx';
import MusicPlayer from './components/screens/MusicPlayer.jsx';
import { controls, useControls } from './hooks/useControls.js';
import { useKeyboard } from './hooks/useKeyboard.js';
import { useFace } from './hooks/useFace.js';
import { useI18n } from './i18n/I18nProvider.jsx';
import { TOUR_STEPS } from './data/tourSteps.js';
import { setMuted } from './lib/audio.js';
import { beep } from './lib/sound.js';

const SCREEN_COLORS = ['#b9dfcb', '#f6c6d8', '#c6d8f6', '#f5e6a6'];
const OFF_COLOR = '#12332c';
const MOOD_FACES = { up: 'happy', right: 'smile', down: 'sad', left: 'wow' };
const BEEP_FOR = { up: 660, right: 560, down: 300, left: 760, ok: 440 }; // Button tones.

export default function App() {
  const { t, lang, setLang } = useI18n();
  const [screen, setScreen] = useState('home'); // Active screen.
  const [winking, setWinking] = useState(false);
  const [dancing, setDancing] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [tourIndex, setTourIndex] = useState(null); // Closed when null.
  const [muted, setMutedState] = useState(false);
  const face = useFace();

  const touring = tourIndex !== null;
  const tourStep = touring ? TOUR_STEPS[tourIndex] : null;

  const toggleMute = () => {
    setMutedState(!muted);
    setMuted(!muted);
  };

  const toggleTour = () => {
    if (touring) return setTourIndex(null);
    if (screen !== 'off') setScreen('home'); // Start at home.
    setTourIndex(0);
  };

  /* ---------- Button actions ---------- */
  const toggleMenu = () => setScreen(screen === 'home' ? 'menu' : 'home');

  const togglePower = () => {
    const turningOn = screen === 'off';
    beep(turningOn ? 900 : 200);
    setScreen(turningOn ? 'home' : 'off');
    if (turningOn) face.setMood('happy');
  };

  const dance = () => {
    setDancing(true);
    setTimeout(() => setDancing(false), 3000);
  };

  const wink = () => {
    setWinking(true);
    setTimeout(() => setWinking(false), 250);
  };

  /* ---------- Shared button input ---------- */
  const handlePress = (id) => {
    if (id === 'power') return togglePower();
    if (screen === 'off') return;

    beep(BEEP_FOR[id] || 520);

    switch (id) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
      case 'ok':
        controls.emit(id); // Notify active screen.
        break;
      case 'menu':
        toggleMenu();
        break;
      case 'back':
        if (touring) setTourIndex(null);
        else if (screen !== 'home') toggleMenu();
        break;
      case 'dance':
        dance();
        break;
      case 'color':
        setColorIndex((i) => (i + 1) % SCREEN_COLORS.length);
        break;
      case 'wink':
        wink();
        break;
      case 'laugh':
        face.laugh(1800);
        break;
      default:
    }
  };

  useKeyboard(handlePress);

  // Change face mood on home.
  useControls((action) => {
    if (screen === 'home' && MOOD_FACES[action]) face.setMood(MOOD_FACES[action]);
  });

  const content = {
    menu: <Menu onOpen={setScreen} />,
    snake: <SnakeGame />,
    blocks: <BlocksGame />,
    gallery: <Gallery />,
    music: <MusicPlayer />,
  }[screen];

  return (
    <>
      <TopBar
        t={t}
        lang={lang}
        onLang={setLang}
        muted={muted}
        onMute={toggleMute}
        help={touring}
        onHelp={toggleTour}
        highlight={tourStep && tourStep.kind === 'top' ? tourStep.id : null}
      />

      <main className="stage">
        <div className={touring ? 'main-col touring' : 'main-col'}>
          <Bmo
            dancing={dancing}
            winking={winking}
            tourStep={tourStep}
            screenColor={screen === 'off' ? OFF_COLOR : SCREEN_COLORS[colorIndex]}
            showFace={screen === 'home'}
            mouth={face.mouth}
            onPress={handlePress}
          >
            {content}
          </Bmo>

          {touring && <HelpTour t={t} index={tourIndex} onGo={setTourIndex} onClose={() => setTourIndex(null)} />}
        </div>
      </main>
    </>
  );
}
