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

  const getIndicator = (type: LogMessage['type']) => {
    switch (type) {
      case 'sent': return { text: '▲', color: 'var(--color-accent)' };
      case 'received': return { text: '▼', color: 'var(--color-success)' };
      case 'error': return { text: '✕', color: 'var(--color-danger)' };
      case 'info': return { text: '●', color: 'var(--color-info)' };
    }
  };

  const getContentColor = (type: LogMessage['type']) => {
    switch (type) {
      case 'error': return 'rgba(248, 113, 113, 0.9)';
      case 'sent': return 'var(--color-text)';
      case 'received': return 'rgba(52, 211, 153, 0.9)';
      default: return 'var(--color-text-muted)';
    }
  };

  return (
    <div className="glass-panel animate-fade-in-up animate-delay-2" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '180px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
        <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-terminal" style={{ color: 'var(--color-accent)', opacity: 0.5 }}></i>
          Transaction Log
        </h2>
        <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '100px', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.12)', color: 'var(--color-accent)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
          {logs.length}
        </span>
      </div>

      {/* Log Entries */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
        {logs.length === 0 ? (
          <div style={{ height: '100%', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-dim)', fontStyle: 'italic', fontSize: '12px' }}>
            <i className="fa-solid fa-terminal" style={{ marginRight: '8px', opacity: 0.4 }}></i>
            Awaiting activity...
          </div>
        ) : (
          logs.map((log) => {
            const indicator = getIndicator(log.type);
            return (
              <div key={log.id} className="log-entry">
                <span style={{ color: 'var(--color-text-dim)', flexShrink: 0, fontSize: '11px' }}>[{formatTime(log.timestamp)}]</span>
                <span style={{ color: indicator.color, fontWeight: 700, flexShrink: 0, fontSize: '11px' }}>{indicator.text}</span>
                <span style={{ color: getContentColor(log.type), wordBreak: 'break-all' }}>{log.content}</span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default LogViewer;