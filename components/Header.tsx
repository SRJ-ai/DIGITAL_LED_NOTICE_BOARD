import React from 'react';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  status: ConnectionStatus;
  currentView: 'app' | 'achievements';
  onViewChange: (view: 'app' | 'achievements') => void;
}

const Header: React.FC<HeaderProps> = ({ status, currentView, onViewChange }) => {
  const getStatusClass = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED: return 'online';
      case ConnectionStatus.CONNECTING: return 'connecting';
      case ConnectionStatus.ERROR: return 'error';
      default: return 'offline';
    }
  };

  const getBadgeClass = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED: return 'status-badge status-online';
      case ConnectionStatus.CONNECTING: return 'status-badge status-connecting';
      case ConnectionStatus.ERROR: return 'status-badge status-error';
      default: return 'status-badge status-offline';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED: return 'ONLINE';
      case ConnectionStatus.CONNECTING: return 'SYNCING';
      case ConnectionStatus.ERROR: return 'ERROR';
      default: return 'OFFLINE';
    }
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">
          <i className="fa-solid fa-microchip" style={{ fontSize: '18px', color: 'var(--color-accent)' }}></i>
        </div>
        <div>
          <h1><span className="gradient-text">Matrix Commander</span></h1>
          <p className="subtitle">ESP8266 LED Controller</p>
        </div>
      </div>

      <div className="header-nav">
        <div className="nav-pill">
          <button
            onClick={() => onViewChange('app')}
            className={currentView === 'app' ? 'active' : ''}
          >
            <i className="fa-solid fa-terminal" style={{ marginRight: '6px', fontSize: '10px' }}></i>
            Controller
          </button>
          <button
            onClick={() => onViewChange('achievements')}
            className={currentView === 'achievements' ? 'active' : ''}
          >
            <i className="fa-solid fa-cube" style={{ marginRight: '6px', fontSize: '10px' }}></i>
            Project Info
          </button>
        </div>
      </div>

      <div className="header-status">
        <div className={getBadgeClass()}>
          <div className={`status-dot ${getStatusClass()}`}></div>
          {getStatusText()}
        </div>
      </div>
    </header>
  );
};

export default Header;