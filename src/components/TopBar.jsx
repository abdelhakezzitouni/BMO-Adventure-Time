// Top navigation bar.
import { LANGS } from '../i18n/translations.js';
import { SpeakerIcon } from './icons/index.jsx';

export default function TopBar({ t, lang, onLang, muted, onMute, help, onHelp, highlight }) {
  const mark = (id) => (highlight === id ? ' tour-target' : '');

  return (
    <header className="topbar">
      <div className={'lang-switch' + mark('lang')} role="group" aria-label={t.top.language}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            lang={l.code}
            className={l.code === lang ? 'chip active' : 'chip'}
            aria-pressed={l.code === lang}
            onClick={() => onLang(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="top-actions">
        <button className={'chip round' + mark('mute')} aria-pressed={muted} aria-label={t.top.mute} title={t.top.mute} onClick={onMute}>
          <SpeakerIcon muted={muted} />
        </button>
        <button className={(help ? 'chip round active' : 'chip round') + mark('help')} aria-pressed={help} aria-label={t.top.help} title={t.top.help} onClick={onHelp}>
          ?
        </button>
      </div>
    </header>
  );
}
