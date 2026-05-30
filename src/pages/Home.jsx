import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, LayoutGrid, ArrowRight, Sparkles, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateImage, buildPrompt } from '../utils/api';

const QUICK_PROMPTS = [
  'Cyberpunk city skyline at night, neon reflections, rain',
  'Holographic corporate logo with geometric shapes',
  'Futuristic hero character in glowing armor',
  'Abstract tech icon set with neon glow effects',
  'Dark corporate office with holographic displays',
];

export default function Home() {
  const { gallery, addToGallery, showToast } = useApp();
  const navigate = useNavigate();
  const [heroPrompt, setHeroPrompt] = useState('');
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroResult, setHeroResult] = useState(null);
  const inputRef = useRef(null);

  const handleHeroGenerate = async () => {
    const prompt = heroPrompt.trim();
    if (!prompt || heroLoading) return;
    setHeroLoading(true);
    setHeroResult(null);
    try {
      const result = await generateImage({ prompt, lighting: 'neon', style: 'cyberpunk', aspectRatio: '1:1' });
      setHeroResult({ ...result, prompt });
    } catch (err) {
      showToast('Generation failed: ' + err.message, 'error');
    }
    setHeroLoading(false);
  };

  const handleSave = () => {
    if (!heroResult) return;
    addToGallery({ url: heroResult.url, prompt: heroResult.prompt, lighting: 'neon', style: 'cyberpunk', aspectRatio: '1:1', category: 'Generated', model: heroResult.model });
    showToast('Saved to gallery!', 'success');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleHeroGenerate();
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="hero-badge">
          <span className="badge badge-cyan">
            <Sparkles size={10} /> AI IMAGE STUDIO
          </span>
        </div>

        <h1 className="hero-title">
          CYBERPUNK<br />CREATIVE STUDIO
        </h1>

        <p className="hero-subtitle">
          Generate high-fidelity, brand-consistent visual assets using FLUX AI.
          Craft logos, hero images, and icon sets with advanced prompting.
        </p>

        {/* ── Inline Quick Generator ── */}
        <div style={{
          width: '100%', maxWidth: 640,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 16,
          marginBottom: 32,
          boxShadow: '0 0 40px rgba(0,245,255,0.06)',
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }} />
            QUICK GENERATE · FLUX MODEL
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              ref={inputRef}
              className="input"
              placeholder="Describe your image and press Enter…"
              value={heroPrompt}
              onChange={e => setHeroPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={heroLoading}
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-primary"
              onClick={handleHeroGenerate}
              disabled={!heroPrompt.trim() || heroLoading}
              style={{ flexShrink: 0 }}
            >
              {heroLoading
                ? <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : <><Zap size={14} /> Generate</>
              }
            </button>
          </div>

          {/* Quick prompt chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {['Cyberpunk logo', 'Hero image', 'Neon icons', 'Corporate HQ'].map(chip => (
              <button key={chip} className="chip"
                onClick={() => { setHeroPrompt(chip + ', neon glow, dark background'); inputRef.current?.focus(); }}
              >{chip}</button>
            ))}
          </div>

          {/* Result preview */}
          {heroLoading && (
            <div style={{ marginTop: 14, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div className="spinner" />
              <span className="generating-text" style={{ fontSize: 12 }}>Generating with FLUX… 5–15 seconds ⚡</span>
            </div>
          )}

          {heroResult && !heroLoading && (
            <div style={{ marginTop: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <img
                src={heroResult.url}
                alt={heroResult.prompt}
                referrerPolicy="no-referrer"
                style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--border)', flexShrink: 0, cursor: 'pointer' }}
                onClick={() => window.open(heroResult.url, '_blank')}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>{heroResult.prompt}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn btn-primary btn-sm" onClick={handleSave}>
                    💾 Save to Gallery
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate('/generate')}>
                    <Zap size={12} /> Full Studio
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          <Link to="/generate" className="btn btn-ghost" style={{ fontSize: 14, padding: '10px 24px' }}>
            <Zap size={15} /> Full Generator <ArrowRight size={14} />
          </Link>
          <Link to="/gallery" className="btn btn-ghost" style={{ fontSize: 14, padding: '10px 24px' }}>
            <LayoutGrid size={15} /> View Gallery
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-value">{gallery.length}</div>
            <div className="stat-label">IMAGES CREATED</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">FLUX</div>
            <div className="stat-label">AI MODEL</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">6</div>
            <div className="stat-label">LIGHTING STYLES</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">6</div>
            <div className="stat-label">STYLE PRESETS</div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 28px' }} />

      {/* Feature cards */}
      <section style={{ padding: '32px 28px' }}>
        <div className="section-header">
          <h2 className="section-title">CAPABILITIES</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card" style={{ padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--title)', fontSize: 14, letterSpacing: 2, marginBottom: 8, color: 'var(--text)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick prompts */}
      <section style={{ padding: '0 28px 32px' }}>
        <div className="section-header">
          <h2 className="section-title">QUICK START PROMPTS</h2>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>click to generate</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {QUICK_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => { setHeroPrompt(p); window.scrollTo({ top: 0, behavior: 'smooth' }); inputRef.current?.focus(); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--muted)',
                fontSize: 14,
                cursor: 'pointer',
                transition: 'var(--transition)',
                textAlign: 'left',
                width: '100%',
                fontFamily: 'var(--font)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              <span><Zap size={13} style={{ display: 'inline', marginRight: 8, color: 'var(--cyan)' }} />{p}</span>
              <Send size={13} style={{ flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </section>

      {/* Recent gallery preview */}
      {gallery.length > 0 && (
        <section style={{ padding: '0 28px 40px' }}>
          <div className="section-header">
            <h2 className="section-title">RECENT CREATIONS</h2>
            <Link to="/gallery" className="btn btn-ghost btn-sm">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
            {gallery.slice(0, 6).map(item => (
              <div key={item.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
                  <img src={item.url} alt={item.prompt} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

const FEATURES = [
  { icon: '⚡', title: 'INSTANT GENERATION', desc: 'Generate images in 5–15 seconds using FLUX via Pollinations.ai — completely free, no API key.' },
  { icon: '🤖', title: 'AI CHATBOT STUDIO', desc: 'Full chat-based generation with message history, regeneration, and one-click gallery saving.' },
  { icon: '🎛️', title: 'ADVANCED PROMPTING', desc: 'Negative prompts, lighting styles (neon, cinematic, holographic), aspect ratios, and style presets.' },
  { icon: '🖼️', title: 'PERSISTENT GALLERY', desc: 'All images saved locally. Filter by category, search by prompt, download or delete anytime.' },
];
