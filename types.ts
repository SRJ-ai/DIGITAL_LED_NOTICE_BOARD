export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}

export interface MqttConfig {
  host: string;
  port: number;
  protocol: 'wss' | 'ws';
  path: string;
  clientId: string;
  username?: string;
  password?: string;
  topic: string;
}

export interface LogMessage {
  id: string;
  timestamp: Date;
  type: 'sent' | 'received' | 'info' | 'error';
  content: string;
  topic?: string;
}

export interface MatrixPreset {
  name: string;
  payload: string;
  icon: string;
  color: string;
}

export interface HistoryItem {
  id: string;
  timestamp: Date;
  payload: string;
}