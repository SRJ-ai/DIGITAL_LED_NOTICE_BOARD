import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ConnectionPanel from './components/ConnectionPanel';
import ControlCenter from './components/ControlCenter';
import LogViewer from './components/LogViewer';
import Achievements from './components/Achievements';
import { MqttConfig, ConnectionStatus, LogMessage, HistoryItem } from './types';
import { connectToBroker, disconnectClient, publishMessage, isClientConnected } from './services/mqttService';

const App: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentView, setCurrentView] = useState<'app' | 'achievements'>('app');

  const [config, setConfig] = useState<MqttConfig>({
    host: 'broker.hivemq.com',
    port: 8884,
    protocol: 'wss',
    path: '/mqtt',
    clientId: `matrix_user_${Math.random().toString(16).slice(2, 8)}`,
    username: '',
    password: '',
    topic: 'esp8266/ledmatrix'
  });

  const addLog = useCallback((type: LogMessage['type'], content: string) => {
    setLogs(prev => [...prev.slice(-49), {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type,
      content
    }]);
  }, []);

  const handleConnect = () => {
    connectToBroker(
      config,
      (newStatus) => {
        setStatus(newStatus);
        if (newStatus === ConnectionStatus.CONNECTED) {
          addLog('info', `Connected to ${config.host}:${config.port} via ${config.protocol.toUpperCase()}`);
        } else if (newStatus === ConnectionStatus.DISCONNECTED) {
          addLog('info', 'Disconnected from broker');
        }
      },
      (topic, msg) => {
        addLog('received', `[${topic}] ${msg}`);
        if (topic === config.topic) {
          setHistory(prev => {
            const newItem: HistoryItem = {
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date(),
              payload: msg
            };
            return [newItem, ...prev].slice(0, 50);
          });
        }
      },
      (err) => { addLog('error', err); }
    );
  };

  const handleDisconnect = () => {
    disconnectClient();
    setStatus(ConnectionStatus.DISCONNECTED);
  };

  const handleSendMessage = async (message: string) => {
    if (!isClientConnected()) {
      addLog('error', 'Cannot send: Not connected');
      return;
    }
    try {
      const sent = await publishMessage(config.topic, message);
      if (sent) addLog('sent', message);
    } catch (error: any) {
      addLog('error', error.message || 'Failed to publish message');
    }
  };

  return (
    <div className="app-bg">
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      <Header status={status} currentView={currentView} onViewChange={setCurrentView} />

      <main className="app-main">
        {currentView === 'app' ? (
          <div className="app-grid">
            <div className="panel-connection">
              <ConnectionPanel
                config={config}
                status={status}
                onConfigChange={setConfig}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            </div>
            <div className="panel-control">
              <ControlCenter
                connected={status === ConnectionStatus.CONNECTED}
                onSendMessage={handleSendMessage}
                history={history}
              />
            </div>
            <div className="panel-log">
              <LogViewer logs={logs} />
            </div>
          </div>
        ) : (
          <Achievements />
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} <span>Matrix Commander</span>. Built for ESP8266 & HiveMQ.</p>
      </footer>
    </div>
  );
};

export default App;