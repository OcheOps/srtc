import { Injectable, OnModuleInit } from '@nestjs/common';
import { ExpressPeerServer } from 'peer';
import * as express from 'express';

@Injectable()
export class PeerService implements OnModuleInit {
  private peerServer: any;

  onModuleInit() {
    const app = express();
    this.peerServer = ExpressPeerServer(app.listen(9000), {
      path: '/peer',
      allow_discovery: true,
    });

    this.peerServer.on('connection', (client) => {
      console.log(`Peer connected: ${client.getId()}`);
    });

    this.peerServer.on('disconnect', (client) => {
      console.log(`Peer disconnected: ${client.getId()}`);
    });
  }

  getPeerServer() {
    return this.peerServer;
  }
}
