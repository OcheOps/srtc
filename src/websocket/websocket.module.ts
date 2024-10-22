import { Module } from '@nestjs/common';
import { WebSocketGateway } from './websocket.gateway';
import { RoomService } from './room.service';

@Module({
  providers: [WebSocketGateway, RoomService],
})
export class WebSocketModule {}