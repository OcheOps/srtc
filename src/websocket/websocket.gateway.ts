import {
  WebSocketGateway as NestWebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';

@NestWebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomService: RoomService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const result = this.roomService.removeUser(client.id);
    if (result) {
      this.server.to(result.room).emit('userLeft', {
        userId: result.user.id,
        name: result.user.name,
      });
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: { userId: string; room: string; name: string }) {
    const { userId, room, name } = payload;
    
    // Join the Socket.IO room
    client.join(room);

    // Add user to room service
    this.roomService.addUser({
      id: userId,
      socketId: client.id,
      name,
      room,
      isAudioMuted: false,
      isVideoMuted: false,
    });

    // Get all users in the room
    const users = this.roomService.getRoomUsers(room);

    // Notify others in the room
    client.to(room).emit('userJoined', {
      userId,
      name,
      isAudioMuted: false,
      isVideoMuted: false,
    });

    // Send room users to the joining client
    client.emit('roomUsers', users);
  }

  @SubscribeMessage('toggleMedia')
  handleToggleMedia(client: Socket, payload: { type: 'audio' | 'video'; value: boolean }) {
    const { type, value } = payload;
    const user = this.roomService.updateUserMedia(client.id, type, value);
    
    if (user) {
      this.server.to(user.room).emit('mediaStateChanged', {
        userId: user.id,
        type,
        value,
      });
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { room: string; message: string; sender: string }) {
    const { room, message, sender } = payload;
    this.server.to(room).emit('message', {
      sender,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}