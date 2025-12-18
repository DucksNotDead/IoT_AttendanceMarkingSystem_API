import { createServer } from 'node:net';

import aedes from 'aedes';
import cors from 'cors';
import express, { type Express } from 'express';
import mqtt from 'mqtt';
import { WebSocketServer } from 'ws';

export type Broker = aedes.default;

interface ServersResult {
  app: Express;
  //mqtt: MqttClient;
}

const mqttsPort = 1883;
const wssPort = 8888;
const appPort = 8000;

function initMQTTS(): Promise<Broker> {
  const broker = aedes.createBroker();
  const server = createServer(broker.handle);

  return new Promise<Broker>(resolve => {
    server.listen(mqttsPort, () => {
      console.log(`mqtts on ${mqttsPort}`);
      resolve(broker);
    });
  });
}

function initWSS(): void {
  const wsServer = new WebSocketServer({ port: wssPort });

  console.log(`wss on ${wssPort}`);

  const client = mqtt.connect(`mqtt://localhost:${mqttsPort}`);

  wsServer.on('connection', ws => {
    ws.on('message', msg => {
      client.publish('client', msg as unknown as string);
    });

    client.on('message', (_, msg) => {
      ws.send(msg.toString());
    });

    client.subscribe('esp');
  });
}

function initExpress(): Promise<ServersResult> {
  const app = express();

  app.use(express.json());
  app.use(cors());

  return new Promise(resolve => {
    app.listen(8000, () => {
      console.log(`express on ${appPort}`);
      resolve({ app });
    });
  });
}

export function initServers(): Promise<ServersResult> {
  const app = express();

  app.use(express.json());
  app.use(cors());

  return new Promise(resolve => {
    initMQTTS().then(() => {
      initWSS();
      initExpress().then(resolve);
    });
  });
}
