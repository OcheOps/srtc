import { Module } from '@nestjs/common';
import { WebSocketModule } from './websocket/websocket.module';
import { PeerModule } from './peer/peer.module';

@Module({
  imports: [WebSocketModule, PeerModule],
})
export class AppModule {}