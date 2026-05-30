import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ImagePlus, RefreshCw, Download, Bookmark } from 'lucide-react';
import { generateImage, downloadImage, buildPrompt } from '../utils/api';
import { useApp } from '../context/AppContext';

const WELCOME_MSG = {
  id: 'welcome',
  role: 'bot',
  type: 'text',
  content: `Welcome! I'm **Kiro**, your AI image generator powered by FLUX via Pollinations.ai. No API key required – just type a prompt and watch the magic happen!`,
};

export default function ChatBot({ settings, onSettingsChange }) {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('SD');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { addToGallery, showToast } = useApp();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (msg) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), ...msg }]);
  };

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    setInput('');

    // User message
    addMessage({ role: 'user', type: 'text', content: prompt });

    // Bot thinking
    addMessage({ role: 'bot', type: 'loading', content: '' });
    setLoading(true);

    try {
      const result = await generateImage({
        prompt,
        lighting: settings.lighting,
        style: settings.style,
        negative: settings.negative,
        aspectRatio: settings.aspectRatio,
      });

      const { url, model: usedModel } = result;
      setActiveModel(usedModel?.split('/').pop() || 'SD');

      // Build display of what was used
      const { positive } = buildPrompt({ prompt, lighting: settings.lighting, style: settings.style, negative: settings.negative });

      // Replace loading with image
      setMessages(prev => {
        const msgs = prev.filter(m => m.type !== 'loading');
        return [
          ...msgs,
          {
            id: Date.now().toString(),
            role: 'bot',
            type: 'image',
            content: ``,
            imageUrl: url,
            prompt,
            positivePrompt: positive,
            model: usedModel,
            settings: { ...settings },
          },
        ];
      });

    } catch (err) {
      setMessages(prev => prev.filter(m => m.type !== 'loading'));
      const errMsg = `❌ **Generation failed**\n\n${err.message}\n\nCheck your internet connection and try again.`;
      addMessage({ role: 'bot', type: 'error', content: errMsg });
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveToGallery = (msg) => {
    addToGallery({
      url: msg.imageUrl,
      prompt: msg.prompt,
      positivePrompt: msg.positivePrompt,
      negative: msg.settings?.negative,
      lighting: msg.settings?.lighting,
      style: msg.settings?.style,
      aspectRatio: msg.settings?.aspectRatio,
      category: settings.category || 'Generated',
      model: msg.model || 'stable-diffusion',
    });
    showToast('Saved to gallery!', 'success');
  };

  const handleDownload = (msg) => {
    downloadImage(msg.imageUrl, `ai-studio-${Date.now()}.png`);
    showToast('Downloaded!', 'success');
  };

  const handleRegenerate = (msg) => {
    setInput(msg.prompt);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="chat-panel">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-dot" />
        <Bot size={16} style={{ color: 'var(--cyan)' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
          Kiro
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          {activeModel}
        </span>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className={`msg-avatar ${msg.role}`}>
              {msg.role === 'bot' ? <Bot size={16} color="#000" /> : <User size={16} />}
            </div>

            <div className="msg-content">
              {/* Text bubble */}
              {(msg.type === 'text' || msg.type === 'error') && (
                <div className={`msg-bubble ${msg.role}`}
                  style={msg.type === 'error' ? { borderColor: 'rgba(255,0,102,0.3)' } : {}}
                  dangerouslySetInnerHTML={{ __html: formatMsg(msg.content) }}
                />
              )}

              {/* Loading */}
              {msg.type === 'loading' && (
                <div className="msg-bubble bot">
                  <div className="generating-overlay" style={{ padding: '20px 10px' }}>
                    <div className="spinner" />
                    <span className="generating-text">Generating with FLUX...</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>Usually 5–15 seconds ⚡</span>
                  </div>
                </div>
              )}

              {/* Image */}
              {msg.type === 'image' && (
                <>
                  <div className="msg-bubble bot"
                    dangerouslySetInnerHTML={{ __html: formatMsg(msg.content) }}
                  />
                  <img
                    src={msg.imageUrl}
                    alt={msg.prompt}
                    className="msg-image"
                    referrerPolicy="no-referrer"
                    onClick={() => window.open(msg.imageUrl, '_blank')}
                  />
                  <div className="msg-actions">
                    <button className="btn btn-primary btn-sm" onClick={() => handleSaveToGallery(msg)}>
                      <Bookmark size={13} /> Save to Gallery
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleDownload(msg)}>
                      <Download size={13} /> Download
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleRegenerate(msg)}>
                      <RefreshCw size={13} /> Regenerate
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Describe the image you want to generate... (Enter to send)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            disabled={loading}
          />
          <button
            className="btn btn-primary btn-icon"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            style={{ height: 44, width: 44, borderRadius: 'var(--radius)', flexShrink: 0 }}
          >
            {loading ? <RefreshCw size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Send size={16} />}
          </button>
        </div>
        {/* Negative prompt input */}
        <textarea
          placeholder="Negative prompt (things to avoid)"
          value={settings.negative}
          onPaste={e => { e.preventDefault(); const text = e.clipboardData.getData('text'); onSettingsChange(prev => ({ ...prev, negative: text })); }}
          onChange={e => onSettingsChange(prev => ({ ...prev, negative: e.target.value }))}
          rows={2}
          style={{ width: '100%', padding: 8, marginTop: 8, borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
          disabled={loading}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          <ImagePlus size={11} style={{ display: 'inline', marginRight: 4 }} />
          Shift+Enter for new line · Enter to generate
        </div>
      </div>
    </div>
  );
}

// Simple markdown-lite formatter
function formatMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(0,245,255,0.1);padding:1px 5px;border-radius:3px;font-size:12px;font-family:monospace">$1</code>')
    .replace(/\n/g, '<br/>');
}
