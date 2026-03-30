import { ConnectionStatus, LogMessage, MqttConfig } from '../types';

// Access the global mqtt object loaded via CDN
declare global {
  interface Window {
    mqtt: any;
  }
}

let client: any = null;

export const connectToBroker = (
  config: MqttConfig,
  onStatusChange: (status: ConnectionStatus) => void,
  onMessage: (topic: string, message: string) => void,
  onError: (error: string) => void
) => {
  if (client) {
    client.end();
  }

  onStatusChange(ConnectionStatus.CONNECTING);

  const url = `${config.protocol}://${config.host}:${config.port}${config.path}`;
  
  console.log(`Connecting to ${url} as ${config.clientId}`);

  const options = {
    clientId: config.clientId,
    username: config.username,
    password: config.password,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    keepalive: 15, // Send a ping every 15 seconds to keep the connection alive
  };

  try {
    client = window.mqtt.connect(url, options);

    client.on('connect', () => {
      console.log('MQTT Connected');
      onStatusChange(ConnectionStatus.CONNECTED);
      // Subscribe to the topic to verify connection and see own messages if echoed
      if (client) {
        client.subscribe(config.topic, (err: any) => {
          if (!err) {
            console.log(`Subscribed to ${config.topic}`);
          }
        });
      }
    });

    client.on('message', (topic: string, message: any) => {
      onMessage(topic, message.toString());
    });

    client.on('error', (err: any) => {
      console.error('MQTT Error:', err);
      onStatusChange(ConnectionStatus.ERROR);
      onError(err.message || 'Connection failed');
      client.end();
    });

    client.on('offline', () => {
      onStatusChange(ConnectionStatus.DISCONNECTED);
    });

    client.on('close', () => {
      onStatusChange(ConnectionStatus.DISCONNECTED);
    });

  } catch (e: any) {
    onStatusChange(ConnectionStatus.ERROR);
    onError(e.message);
  }
};

export const publishMessage = (topic: string, message: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (client && client.connected) {
      // Using QoS 1 to ensure we get an acknowledgment from the broker
      client.publish(topic, message, { qos: 1 }, (error: any) => {
        if (error) {
          console.error('Publish error:', error);
          
          // Map common errors to user-friendly messages
          let friendlyMessage = 'Failed to publish message';
          const errMsg = error.message?.toLowerCase() || '';
          
          if (errMsg.includes('offline') || errMsg.includes('disconnect')) {
            friendlyMessage = 'Broker is unavailable or connection was lost.';
          } else if (errMsg.includes('network') || errMsg.includes('socket')) {
            friendlyMessage = 'Network issue: Please check your internet connection.';
          } else if (errMsg.includes('timeout')) {
            friendlyMessage = 'Request timed out: The broker took too long to respond.';
          } else {
            friendlyMessage = `${friendlyMessage}: ${error.message || 'Unknown error'}`;
          }
          
          reject(new Error(friendlyMessage));
        } else {
          resolve(true);
        }
      });
    } else {
      reject(new Error('Cannot send: Not connected to the broker.'));
    }
  });
};

export const disconnectClient = () => {
  if (client) {
    client.end();
    client = null;
  }
};

export const isClientConnected = (): boolean => {
  return client && client.connected;
};