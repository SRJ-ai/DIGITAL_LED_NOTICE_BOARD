import React, { useEffect, useRef } from 'react';
import { LogMessage } from '../types';

interface LogViewerProps {
  logs: LogMessage[];
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-0 overflow-hidden flex flex-col h-64 lg:h-full shadow-2xl">
      <div className="bg-white/5 p-5 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest">
          <i className="fa-solid fa-terminal mr-2.5 text-white/40"></i> 
          Transaction Log
        </h2>
        <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full text-white/70 font-medium">{logs.length} events</span>
      </div>
      
      <div className="flex-grow overflow-y-auto p-5 font-mono text-xs space-y-2.5 custom-scrollbar bg-transparent">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/30 italic">
            No activity recorded
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 animate-in fade-in duration-300">
              <span className="text-white/30 shrink-0">[{formatTime(log.timestamp)}]</span>
              
              {log.type === 'sent' && (
                <span className="text-white/60 font-bold shrink-0">{`>>`}</span>
              )}
              {log.type === 'received' && (
                <span className="text-emerald-400 font-bold shrink-0">{`<<`}</span>
              )}
              {log.type === 'error' && (
                <span className="text-red-400 font-bold shrink-0">!!</span>
              )}
              {log.type === 'info' && (
                <span className="text-blue-400 font-bold shrink-0">ii</span>
              )}
              
              <span className={`break-all ${
                log.type === 'error' ? 'text-red-300' : 
                log.type === 'sent' ? 'text-white/90' : 
                log.type === 'received' ? 'text-emerald-200' : 'text-white/50'
              }`}>
                {log.content}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default LogViewer;