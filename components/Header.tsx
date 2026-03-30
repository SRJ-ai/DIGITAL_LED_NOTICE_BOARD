import React from 'react';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  status: ConnectionStatus;
  currentView: 'app' | 'achievements';
  onViewChange: (view: 'app' | 'achievements') => void;
}

const Header: React.FC<HeaderProps> = ({ status, currentView, onViewChange }) => {
  const getStatusColor = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED: return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]';
      case ConnectionStatus.CONNECTING: return 'bg-amber-500 animate-pulse';
      case ConnectionStatus.ERROR: return 'bg-red-500';
      default: return 'bg-white/30';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED: return 'ONLINE';
      case ConnectionStatus.CONNECTING: return 'CONNECTING...';
      case ConnectionStatus.ERROR: return 'ERROR';
      default: return 'OFFLINE';
    }
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 bg-black/60 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 gap-4 sm:gap-0">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
            <i className="fa-solid fa-microchip text-white/80 text-lg sm:text-xl"></i>
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">Matrix Commander</h1>
            <p className="text-[10px] sm:text-xs text-white/50 font-medium tracking-wide uppercase truncate">ESP8266 Controller</p>
          </div>
        </div>

        {/* Status Indicator (Mobile Only) */}
        <div className="flex sm:hidden items-center space-x-2 bg-white/5 py-1 px-2.5 rounded-full border border-white/10 shrink-0">
          <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`}></div>
          <span className={`text-[10px] font-semibold tracking-wide ${status === ConnectionStatus.CONNECTED ? 'text-emerald-400' : 'text-white/50'}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6">
        {/* Navigation Tabs */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-full sm:w-auto justify-center">
          <button 
            onClick={() => onViewChange('app')} 
            className={`flex-1 sm:flex-none px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${currentView === 'app' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
          >
            App
          </button>
          <button 
            onClick={() => onViewChange('achievements')} 
            className={`flex-1 sm:flex-none px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${currentView === 'achievements' ? 'bg-white/15 text-white shadow-sm' : 'text-white/50 hover:text-white/80'}`}
          >
            Project Info
          </button>
        </div>

        {/* Status Indicator (Desktop Only) */}
        <div className="hidden sm:flex items-center space-x-3 bg-white/5 py-1.5 px-4 rounded-full border border-white/10 shrink-0">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
          <span className={`text-xs font-semibold tracking-wide ${status === ConnectionStatus.CONNECTED ? 'text-emerald-400' : 'text-white/50'}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;