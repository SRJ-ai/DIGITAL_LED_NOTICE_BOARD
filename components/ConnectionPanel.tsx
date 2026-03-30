import React, { useState } from 'react';
import { MqttConfig, ConnectionStatus } from '../types';

interface ConnectionPanelProps {
  config: MqttConfig;
  status: ConnectionStatus;
  onConfigChange: (newConfig: MqttConfig) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectionPanel: React.FC<ConnectionPanelProps> = ({
  config, status, onConfigChange, onConnect, onDisconnect
}) => {
  const [showAuth, setShowAuth] = useState(false);
  const [topicError, setTopicError] = useState<string | null>(null);

  const validateTopic = (topic: string) => {
    if (!topic.trim()) return "Topic cannot be empty";
    if (topic.includes('+') || topic.includes('#')) return "Wildcards not allowed";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'topic') setTopicError(validateTopic(value));
    onConfigChange({ ...config, [name]: name === 'port' ? parseInt(value, 10) : value });
  };

  const handleConnectClick = () => {
    const error = validateTopic(config.topic);
    if (error) { setTopicError(error); return; }
    setTopicError(null);
    onConnect();
  };

  const isConnected = status === ConnectionStatus.CONNECTED;
  const isConnecting = status === ConnectionStatus.CONNECTING;

  return (
    <div className="glass-panel animate-fade-in-up" style={{ padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title">
          <i className="fa-solid fa-network-wired"></i>
          Broker
        </h2>
        <button
          onClick={() => setShowAuth(!showAuth)}
          style={{
            background: 'none', border: 'none', color: 'var(--color-text-dim)',
            fontSize: '12px', fontFamily: 'var(--font-sans)', fontWeight: 600, cursor: 'pointer',
          }}
        >
          <i className={`fa-solid ${showAuth ? 'fa-eye-slash' : 'fa-key'}`} style={{ marginRight: '6px' }}></i>
          {showAuth ? 'Hide' : 'Auth'}
        </button>
      </div>

      {/* Fields */}
      <div className="connection-fields" style={{ marginBottom: '16px' }}>
        <div>
          <label className="field-label">Host</label>
          <input type="text" name="host" value={config.host} onChange={handleChange} disabled={isConnected} className="input-field" placeholder="broker.hivemq.com" />
        </div>
        <div className="connection-port-proto">
          <div>
            <label className="field-label">Port</label>
            <input type="number" name="port" value={config.port} onChange={handleChange} disabled={isConnected} className="input-field input-mono" />
          </div>
          <div style={{ position: 'relative' }}>
            <label className="field-label">Protocol</label>
            <select name="protocol" value={config.protocol} onChange={handleChange} disabled={isConnected} className="input-field">
              <option value="wss" style={{ background: '#030712' }}>WSS (Secure)</option>
              <option value="ws" style={{ background: '#030712' }}>WS</option>
            </select>
            <div style={{ position: 'absolute', right: '14px', bottom: '16px', pointerEvents: 'none', color: 'var(--color-text-dim)' }}>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Port info */}
      <div className="info-box" style={{ marginBottom: '16px' }}>
        <i className="fa-solid fa-circle-info" style={{ marginRight: '8px' }}></i>
        Ports: <strong style={{ color: 'var(--color-accent)' }}>8884</strong> (WSS), <strong style={{ color: 'var(--color-accent)' }}>8000</strong> (WS)
      </div>

      {/* Topic */}
      <div style={{ marginBottom: '20px' }}>
        <label className="field-label">MQTT Topic</label>
        <input type="text" name="topic" value={config.topic} onChange={handleChange} disabled={isConnected}
          className="input-field input-mono" style={{ borderColor: topicError ? 'rgba(248, 113, 113, 0.4)' : undefined }} />
        {topicError && (
          <p style={{ color: 'var(--color-danger)', fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>
            <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '6px' }}></i>{topicError}
          </p>
        )}
      </div>

      {/* Auth */}
      {showAuth && (
        <div className="auth-grid" style={{ marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div>
            <label className="field-label">Username</label>
            <input type="text" name="username" value={config.username || ''} onChange={handleChange} disabled={isConnected} className="input-field" placeholder="Optional" />
          </div>
          <div>
            <label className="field-label">Password</label>
            <input type="password" name="password" value={config.password || ''} onChange={handleChange} disabled={isConnected} className="input-field" placeholder="Optional" />
          </div>
        </div>
      )}

      {/* Action Button */}
      {isConnected ? (
        <button onClick={onDisconnect} className="btn-primary btn-disconnect" style={{ width: '100%' }}>
          <i className="fa-solid fa-link-slash"></i> Disconnect
        </button>
      ) : (
        <button onClick={handleConnectClick} disabled={isConnecting || !!topicError} className="btn-primary btn-connect" style={{ width: '100%' }}>
          {isConnecting ? (<><i className="fa-solid fa-circle-notch fa-spin"></i> Connecting...</>) : (<><i className="fa-solid fa-bolt"></i> Connect to Broker</>)}
        </button>
      )}
    </div>
  );
};

export default ConnectionPanel;