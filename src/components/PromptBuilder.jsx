const LIGHTING_OPTIONS = [
  { id: 'neon',        label: '⚡ Neon' },
  { id: 'cinematic',   label: '🎬 Cinematic' },
  { id: 'holographic', label: '🌈 Holographic' },
  { id: 'studio',      label: '💡 Studio' },
  { id: 'golden',      label: '🌅 Golden Hour' },
  { id: 'dark',        label: '🌑 Dark Moody' },
];

const STYLE_OPTIONS = [
  { id: 'cyberpunk',   label: 'Cyberpunk' },
  { id: 'corporate',   label: 'Corporate' },
  { id: 'futuristic',  label: 'Futuristic' },
  { id: 'minimal',     label: 'Minimal' },
  { id: 'synthwave',   label: 'Synthwave' },
  { id: 'glitch',      label: 'Glitch Art' },
];

const ASPECT_OPTIONS = [
  { id: '1:1',  label: '1:1  Square' },
  { id: '16:9', label: '16:9 Wide' },
  { id: '9:16', label: '9:16 Portrait' },
  { id: '4:3',  label: '4:3  Classic' },
];

const CATEGORY_OPTIONS = ['Generated', 'Logo', 'Hero', 'Icon', 'Portrait', 'Background', 'UI Asset'];

export default function PromptBuilder({ settings, onChange }) {
  const set = (key, val) => onChange({ ...settings, [key]: val });
  const toggle = (key, val) => set(key, settings[key] === val ? '' : val);

  return (
    <div className="prompt-panel">
      <div className="prompt-panel-header">⚙ ADVANCED SETTINGS</div>

      <div className="prompt-panel-body">

        {/* Negative Prompt */}
        <div className="field-group">
          <label className="field-label">Negative Prompt</label>
          <textarea
            className="textarea"
            style={{ minHeight: 70, fontSize: 13 }}
            placeholder="e.g. blurry, distorted, ugly, text..."
            value={settings.negative}
            onChange={e => set('negative', e.target.value)}
          />
        </div>

        {/* Aspect Ratio */}
        <div className="field-group">
          <label className="field-label">Aspect Ratio</label>
          <div className="chip-group">
            {ASPECT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`chip${settings.aspectRatio === opt.id ? ' selected' : ''}`}
                onClick={() => toggle('aspectRatio', opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Style */}
        <div className="field-group">
          <label className="field-label">Lighting Style</label>
          <div className="chip-group">
            {LIGHTING_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`chip${settings.lighting === opt.id ? ' selected' : ''}`}
                onClick={() => toggle('lighting', opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style Preset */}
        <div className="field-group">
          <label className="field-label">Style Preset</label>
          <div className="chip-group">
            {STYLE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`chip${settings.style === opt.id ? ' selected' : ''}`}
                onClick={() => toggle('style', opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="field-group">
          <label className="field-label">Category Tag</label>
          <select
            className="select"
            value={settings.category}
            onChange={e => set('category', e.target.value)}
          >
            {CATEGORY_OPTIONS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="divider" />

        {/* Active settings summary */}
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', lineHeight: 1.8 }}>
          {settings.lighting && <div>⚡ Light: <span style={{ color: 'var(--cyan)' }}>{settings.lighting}</span></div>}
          {settings.style    && <div>🎨 Style: <span style={{ color: 'var(--purple)' }}>{settings.style}</span></div>}
          {settings.aspectRatio && <div>📐 Ratio: <span style={{ color: 'var(--green)' }}>{settings.aspectRatio}</span></div>}
        </div>

      </div>
    </div>
  );
}
