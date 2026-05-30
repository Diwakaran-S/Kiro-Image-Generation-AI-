import { useState } from 'react';
import { Settings, Key, Cpu, Save, ExternalLink, CheckCircle } from 'lucide-react';

const MODELS = [
  { id: 'runwayml/stable-diffusion-v1-5', label: 'SD v1.5 (Recommended — Fast)' },
  { id: 'stabilityai/stable-diffusion-2-1', label: 'SD 2.1 (Higher Quality)' },
  { id: 'CompVis/stable-diffusion-v1-4', label: 'SD v1.4 (Lightest)' },
];

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <div className="section-header">
        <h2 className="section-title">
          <Settings size={18} style={{ color: 'var(--cyan)' }} />
          SETTINGS
        </h2>
      </div>

      {/* API Key info */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--title)', fontSize: 14, letterSpacing: 2, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Key size={16} style={{ color: 'var(--cyan)' }} />
          HUGGING FACE API KEY
        </h3>

        <div style={{ background: 'var(--panel)', borderRadius: 'var(--radius)', padding: 16, border: '1px solid var(--border)', marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
            Your API key is configured via the <code style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', background: 'rgba(0,245,255,0.1)', padding: '1px 6px', borderRadius: 3 }}>.env</code> file in your project root.<br />
            Edit <strong style={{ color: 'var(--text)' }}>VITE_HF_API_KEY</strong> in that file and restart the dev server.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            Free tier — No credit card needed
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
            ~1000 requests/day on free tier
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple)', boxShadow: '0 0 8px var(--purple)' }} />
            Cold start: 30–60s first load per session
          </div>
        </div>

        <a
          href="https://huggingface.co/settings/tokens"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 16, textDecoration: 'none', display: 'inline-flex' }}
        >
          <ExternalLink size={13} />
          Get your free API token
        </a>
      </div>

      {/* Model info */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--title)', fontSize: 14, letterSpacing: 2, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={16} style={{ color: 'var(--purple)' }} />
          AI MODEL
        </h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.7 }}>
          Model is set via <code style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', background: 'rgba(0,245,255,0.1)', padding: '1px 6px', borderRadius: 3 }}>VITE_HF_MODEL</code> in your .env file.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MODELS.map(m => (
            <div key={m.id} className="card" style={{
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              borderColor: m.id === 'runwayml/stable-diffusion-v1-5' ? 'rgba(0,245,255,0.3)' : 'var(--border)',
            }}>
              {m.id === 'runwayml/stable-diffusion-v1-5' && (
                <CheckCircle size={14} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
              )}
              <div>
                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 2 }}>{m.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to setup */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--title)', fontSize: 14, letterSpacing: 2, marginBottom: 16 }}>
          SETUP GUIDE
        </h3>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {STEPS.map((step, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: step }}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

const STEPS = [
  'Go to <a href="https://huggingface.co" target="_blank" style="color:var(--cyan)">huggingface.co</a> and create a free account',
  'Navigate to <strong style="color:var(--text)">Profile → Settings → Access Tokens</strong>',
  'Click <strong style="color:var(--text)">New token</strong>, give it a name, select <strong style="color:var(--text)">Read</strong> permission',
  'Copy the token (starts with <code style="color:var(--cyan);font-family:monospace;background:rgba(0,245,255,0.1);padding:1px 5px;border-radius:3px">hf_...</code>)',
  'Open the <strong style="color:var(--text)">.env</strong> file in your project and paste: <code style="color:var(--cyan);font-family:monospace;background:rgba(0,245,255,0.1);padding:1px 5px;border-radius:3px">VITE_HF_API_KEY=hf_yourtoken</code>',
  'Restart the dev server with <code style="color:var(--cyan);font-family:monospace;background:rgba(0,245,255,0.1);padding:1px 5px;border-radius:3px">npm run dev</code>',
  '🚀 Go to the Generate page and start creating!',
];
