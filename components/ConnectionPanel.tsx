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
  config, 
  status, 
  onConfigChange, 
  onConnect, 
  onDisconnect 
}) => {
  const [showAuth, setShowAuth] = useState(false);
  const [topicError, setTopicError] = useState<string | null>(null);

  const validateTopic = (topic: string) => {
    if (!topic.trim()) {
      return "Topic cannot be empty";
    }
    if (topic.includes('+') || topic.includes('#')) {
      return "Topic cannot contain wildcard characters (+, #)";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'topic') {
      setTopicError(validateTopic(value));
    }
    
    onConfigChange({
      ...config,
      [name]: name === 'port' ? parseInt(value, 10) : value
    });
  };

  const handleConnectClick = () => {
    const error = validateTopic(config.topic);
    if (error) {
      setTopicError(error);
      return;
    }
    setTopicError(null);
    onConnect();
  };

  const isConnected = status === ConnectionStatus.CONNECTED;
  const isConnecting = status === ConnectionStatus.CONNECTING;

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <i className="fa-solid fa-network-wired mr-3 text-white/50"></i>
          Broker Connection
        </h2>
        <button 
          onClick={() => setShowAuth(!showAuth)}
          className="text-xs font-medium text-white/50 hover:text-white transition-colors"
        >
          {showAuth ? 'Hide Credentials' : 'Show Credentials'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Host</label>
          <input
            type="text"
            name="host"
            value={config.host}
            onChange={handleChange}
            disabled={isConnected}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50"
            placeholder="broker.hivemq.com"
          />
        </div>
        <div className="flex space-x-3">
          <div className="w-1/3">
            <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Port</label>
            <input
              type="number"
              name="port"
              value={config.port}
              onChange={handleChange}
              disabled={isConnected}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50"
            />
          </div>
          <div className="w-2/3">
            <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Protocol</label>
            <div className="relative">
              <select
                name="protocol"
                value={config.protocol}
                onChange={handleChange}
                disabled={isConnected}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50 appearance-none"
              >
                <option value="wss" className="bg-black">WSS (Secure)</option>
                <option value="ws" className="bg-black">WS (Insecure)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2 -mt-2">
           <p className="text-[10px] text-white/40 font-medium">
             <i className="fa-solid fa-circle-info mr-1.5"></i>
             Common Ports: <b className="text-white/70">8884</b> (WSS), <b className="text-white/70">8000</b> (WS). Port 1883 is not supported in browsers.
           </p>
        </div>

        <div className="col-span-1 md:col-span-2">
            <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Topic</label>
            <input
              type="text"
              name="topic"
              value={config.topic}
              onChange={handleChange}
              disabled={isConnected}
              className={`w-full bg-white/5 border ${topicError ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-white/30 focus:bg-white/10'} rounded-2xl px-4 py-3 text-sm text-white font-mono focus:outline-none transition-all disabled:opacity-50`}
            />
            {topicError && (
              <p className="text-red-400 text-xs mt-2 font-medium"><i className="fa-solid fa-circle-exclamation mr-1.5"></i>{topicError}</p>
            )}
        </div>
      </div>

      {showAuth && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 p-5 bg-white/5 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-top-2">
          <div>
            <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Username</label>
            <input
              type="text"
              name="username"
              value={config.username || ''}
              onChange={handleChange}
              disabled={isConnected}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Password</label>
            <input
              type="password"
              name="password"
              value={config.password || ''}
              onChange={handleChange}
              disabled={isConnected}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50"
              placeholder="Optional"
            />
          </div>
        </div>
      )}

      {isConnected ? (
        <button
          onClick={onDisconnect}
          className="w-full py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-full font-semibold tracking-wide transition-all active:scale-[0.98]"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={handleConnectClick}
          disabled={isConnecting || !!topicError}
          className="w-full py-3.5 bg-white text-black hover:bg-white/90 rounded-full font-semibold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isConnecting ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin mr-2.5"></i> Connecting...
            </>
          ) : (
            <>
              Connect to Broker
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ConnectionPanel;