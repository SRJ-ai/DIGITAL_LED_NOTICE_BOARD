import React, { useState } from 'react';
import { MatrixPreset, HistoryItem } from '../types';
import { generateMatrixContent } from '../services/geminiService';

interface ControlCenterProps {
  connected: boolean;
  onSendMessage: (msg: string) => Promise<void>;
  history: HistoryItem[];
}

const presets: (MatrixPreset & { cssClass: string })[] = [
  { name: 'ON', payload: 'ON', icon: 'fa-power-off', color: 'var(--color-success)', cssClass: 'preset-on' },
  { name: 'OFF', payload: 'OFF', icon: 'fa-power-off', color: 'var(--color-danger)', cssClass: 'preset-off' },
  { name: 'HELLO', payload: 'Hello World', icon: 'fa-hand-wave', color: 'var(--color-warning)', cssClass: 'preset-hello' },
  { name: 'TIME', payload: 'SHOW_TIME', icon: 'fa-clock', color: 'var(--color-info)', cssClass: 'preset-time' },
];

const ControlCenter: React.FC<ControlCenterProps> = ({ connected, onSendMessage, history }) => {
  const [message, setMessage] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'ai' | 'history'>('manual');
  const [displayType, setDisplayType] = useState<'scrolling' | 'static'>('scrolling');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');
  const [isEditingKey, setIsEditingKey] = useState(!localStorage.getItem('gemini_api_key'));

  const handleSaveKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('gemini_api_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setIsEditingKey(false);
      setTempApiKey('');
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsEditingKey(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);
    await onSendMessage(message);
    setIsSending(false);
    setMessage('');
  };

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const generated = await generateMatrixContent(aiPrompt, displayType, apiKey);
      await onSendMessage(generated);
      setMessage(generated);
    } catch (error) {
      console.error("AI Gen Error", error);
      alert("Could not generate AI message. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const tabs = [
    { id: 'manual' as const, label: 'Manual', icon: 'fa-keyboard' },
    { id: 'ai' as const, label: 'AI Gen', icon: 'fa-wand-magic-sparkles' },
    { id: 'history' as const, label: 'History', icon: 'fa-clock-rotate-left' },
  ];

  return (
    <div className="glass-panel animate-fade-in-up animate-delay-1">
      {/* Tabs */}
      <div className="tab-container">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}>
            <i className={`fa-solid ${tab.icon}`} style={{ fontSize: '13px' }}></i>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px 28px' }}>
        {/* ---- Manual Tab ---- */}
        {activeTab === 'manual' && (
          <div>
            {/* LED Preview */}
            <div className="led-preview" style={{ marginBottom: '20px' }}>
              <div className="led-dot"></div>
              <div className="led-dot"></div>
              <div className="led-dot"></div>
              <span style={{ marginLeft: '4px' }}>LED Matrix Display</span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="field-label">Message Payload</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!connected}
                placeholder="Enter text to display on LED Matrix..."
                className="input-field input-mono"
                style={{ minHeight: '100px' }}
              />
            </div>

            <button type="button" onClick={handleSend} disabled={!connected || !message.trim() || isSending}
              className="btn-primary btn-send" style={{ width: '100%', marginBottom: '24px' }}>
              {isSending ? (<><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</>) : (<><i className="fa-solid fa-paper-plane"></i> Send to Matrix</>)}
            </button>

            {/* Presets — Always visible */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
              <h3 className="field-label" style={{ marginBottom: '14px' }}>Quick Presets</h3>
              <div className="presets-grid">
                {presets.map((preset) => (
                  <button key={preset.name} onClick={() => onSendMessage(preset.payload)} disabled={!connected} type="button" className={`preset-btn ${preset.cssClass}`}>
                    <i className={`fa-solid ${preset.icon}`} style={{ fontSize: '18px', color: preset.color }}></i>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: preset.color, letterSpacing: '0.05em' }}>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---- AI Tab ---- */}
        {activeTab === 'ai' && (
          <div>
            <div className="info-box" style={{ marginBottom: '20px' }}>
              <i className="fa-solid fa-sparkles" style={{ marginRight: '8px' }}></i>
              Describe what you want to say and AI will craft it for the LED display.
            </div>

            {isEditingKey ? (
              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <label className="field-label" style={{ marginBottom: '12px' }}>
                  <i className="fa-solid fa-key" style={{ marginRight: '6px', color: 'var(--color-accent)' }}></i>
                  Gemini API Key Required
                </label>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                  Provide your free Gemini API key. Stored only in your browser.
                </p>
                <div style={{ padding: '16px', background: 'rgba(34,211,238,0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(34,211,238,0.1)', marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '10px' }}>How to get a free key:</p>
                  <ol style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 2, paddingLeft: '20px' }}>
                    <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Google AI Studio</a></li>
                    <li>Sign in with Google</li>
                    <li>Click <strong style={{ color: 'var(--color-text)' }}>"Create API key"</strong></li>
                    <li>Paste it below</li>
                  </ol>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input type="password" value={tempApiKey} onChange={(e) => setTempApiKey(e.target.value)} placeholder="AIzaSy..." className="input-field input-mono" style={{ flex: '1 1 200px' }} />
                  <button onClick={handleSaveKey} disabled={!tempApiKey.trim()} className="btn-primary btn-connect">Save</button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-success)' }}>
                    <i className="fa-solid fa-check-circle" style={{ marginRight: '6px' }}></i>API Key Saved
                  </span>
                  <button type="button" onClick={handleClearKey} style={{ background: 'none', border: 'none', color: 'var(--color-text-dim)', fontSize: '12px', fontFamily: 'var(--font-sans)', fontWeight: 600, cursor: 'pointer' }}>Clear Key</button>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label className="field-label">Display Type</label>
                  <div style={{ position: 'relative' }}>
                    <select value={displayType} onChange={(e) => setDisplayType(e.target.value as 'scrolling' | 'static')} disabled={!connected || isGenerating} className="input-field">
                      <option value="scrolling" style={{ background: '#030712' }}>Short Scrolling Text (LED Matrix)</option>
                      <option value="static" style={{ background: '#030712' }}>Static Text (Larger Display)</option>
                    </select>
                    <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-dim)' }}>
                      <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label className="field-label">Idea Prompt</label>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} disabled={!connected || isGenerating} placeholder="Make a spooky halloween greeting..." className="input-field" style={{ minHeight: '100px' }} />
                </div>
                <button type="button" onClick={handleAiGenerate} disabled={!connected || !aiPrompt.trim() || isGenerating} className="btn-primary btn-send" style={{ width: '100%' }}>
                  {isGenerating ? (<><i className="fa-solid fa-circle-notch fa-spin"></i> Generating...</>) : (<><i className="fa-solid fa-wand-magic-sparkles"></i> Generate & Send</>)}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---- History Tab ---- */}
        {activeTab === 'history' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', maxHeight: '400px', overflowY: 'auto' }}>
              {history.length === 0 ? (
                <div style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-dim)' }}>
                  <i className="fa-solid fa-inbox" style={{ fontSize: '40px', opacity: 0.3, marginBottom: '16px' }}></i>
                  <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text-muted)' }}>No messages yet</p>
                  <p style={{ fontSize: '12px' }}>Messages sent to the topic will appear here.</p>
                </div>
              ) : (
                history.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                        <i className="fa-regular fa-clock" style={{ marginRight: '6px' }}></i>{item.timestamp.toLocaleTimeString()}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--color-text)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{item.payload}</div>
                    </div>
                    <button onClick={() => { setMessage(item.payload); setActiveTab('manual'); }} disabled={!connected}
                      style={{ padding: '8px 10px', background: 'rgba(34,211,238,0.08)', color: 'var(--color-accent)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', flexShrink: 0, fontFamily: 'var(--font-sans)' }}>
                      <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-dim)', fontWeight: 500, textAlign: 'center' }}>
              <i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }}></i>
              Showing last {history.length} messages from current session
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlCenter;