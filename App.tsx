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
      (err) => {
        addLog('error', err);
      }
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
      if (sent) {
        addLog('sent', message);
      }
    } catch (error: any) {
      addLog('error', error.message || 'Failed to publish message');
    }
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] flex flex-col font-sans text-white/90 selection:bg-cyan-500/30">
      <Header status={status} currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-grow p-4 md:p-6 max-w-7xl mx-auto w-full">
        {currentView === 'app' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Config & Controls */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <ConnectionPanel 
                config={config}
                status={status}
                onConfigChange={setConfig}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
              
              {/* Mobile/Tablet: Logs appear below connection on small screens, right on large */}
              <div className="lg:hidden block">
                <LogViewer logs={logs} />
              </div>
            </div>

            {/* Right Column: Control Interface & Desktop Logs */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex-grow min-h-[400px] lg:min-h-[500px]">
                <ControlCenter 
                  connected={status === ConnectionStatus.CONNECTED}
                  onSendMessage={handleSendMessage}
                  history={history}
                />
              </div>
              
              <div className="hidden lg:block h-64">
                 <LogViewer logs={logs} />
              </div>
            </div>

          </div>
        ) : (
          <Achievements />
        )}
      </main>

      <footer className="py-4 text-center text-white/40 text-xs border-t border-white/5">
        <p>© {new Date().getFullYear()} Matrix Commander. Built for ESP8266 & HiveMQ.</p>
      </footer>
    </div>
  );
};

export default App;