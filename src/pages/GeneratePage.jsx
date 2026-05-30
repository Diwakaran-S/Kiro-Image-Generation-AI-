import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Zap } from 'lucide-react';
import ChatBot from '../components/ChatBot';
import PromptBuilder from '../components/PromptBuilder';

const DEFAULT_SETTINGS = {
  negative: '',
  aspectRatio: '1:1',
  lighting: 'neon',
  style: 'cyberpunk',
  category: 'Generated',
};

export default function GeneratePage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [searchParams] = useSearchParams();

  // Support ?prompt= query from quick-start links
  const initialPrompt = searchParams.get('prompt') || '';

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div className="section-header">
        <h2 className="section-title">
          <Zap size={18} style={{ color: 'var(--cyan)' }} />
          GENERATE
        </h2>
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', alignItems: 'center' }}>
          <span className="badge badge-green">● ONLINE</span>
          Stable Diffusion v1.5
        </div>
      </div>

      <div className="chat-layout" style={{ flex: 1 }}>
        <ChatBot settings={settings} initialPrompt={initialPrompt} />
        <PromptBuilder settings={settings} onChange={setSettings} />
      </div>
    </div>
  );
}
