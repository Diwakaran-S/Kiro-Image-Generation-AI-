import { useState } from 'react';
import { Zap, X, ChevronRight } from 'lucide-react';
import ChatBot from './ChatBot';
import PromptBuilder from './PromptBuilder';

const DEFAULT_SETTINGS = {
  negative: '',
  aspectRatio: '1:1',
  lighting: 'neon',
  style: 'cyberpunk',
  category: 'Generated',
};

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          id="floating-chat-btn"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 500,
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(0,245,255,0.5), 0 4px 20px rgba(0,0,0,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            animation: 'fab-pulse 2.5s infinite',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 0 36px rgba(0,245,255,0.7), 0 4px 24px rgba(0,0,0,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(0,245,255,0.5), 0 4px 20px rgba(0,0,0,0.4)';
          }}
          title="Open AI Generator"
        >
          <Zap size={24} color="#000" fill="#000" />
        </button>
      )}

      {/* Slide-over Panel */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(7,7,15,0.6)',
            backdropFilter: 'blur(4px)',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Panel */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: 860,
            background: 'var(--surface)',
            borderLeft: '1px solid var(--border)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Panel Header */}
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--panel)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 8px var(--green)',
              animation: 'pulse-dot 2s infinite',
            }} />
            <Zap size={16} style={{ color: 'var(--cyan)' }} />
            <span style={{ fontFamily: 'var(--title)', fontSize: 13, letterSpacing: 2, color: 'var(--text)' }}>
              AI IMAGE GENERATOR
            </span>
            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', marginLeft: 4 }}>
              FLUX · Pollinations.ai
            </span>

            {/* Toggle settings on mobile */}
            <button
              onClick={() => setShowSettings(p => !p)}
              className="btn btn-ghost btn-sm"
              style={{ marginLeft: 'auto', marginRight: 8 }}
            >
              ⚙ Settings
            </button>

            <button
              onClick={() => setOpen(false)}
              className="btn btn-ghost btn-sm btn-icon"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Panel Body */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: showSettings ? '1fr 280px' : '1fr',
            overflow: 'hidden',
            gap: 0,
          }}>
            <ChatBot settings={settings} />
            {showSettings && (
              <div style={{ borderLeft: '1px solid var(--border)', overflow: 'auto' }}>
                <PromptBuilder settings={settings} onChange={setSettings} />
              </div>
            )}
          </div>

          {/* Collapse button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: '50%',
              left: -18,
              transform: 'translateY(-50%)',
              width: 18,
              height: 64,
              background: 'var(--panel)',
              border: '1px solid var(--border)',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
            }}
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fab-pulse {
          0%, 100% { box-shadow: 0 0 24px rgba(0,245,255,0.5), 0 4px 20px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 40px rgba(0,245,255,0.8), 0 4px 24px rgba(0,0,0,0.5); }
        }
      `}</style>
    </>
  );
}
