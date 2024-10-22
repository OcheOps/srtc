import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  socketId: string;
  name: string;
  room: string;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
}

@Injectable()
export class RoomService {
  private rooms: Map<string, Set<User>> = new Map();

  addUser(user: User): void {
    const room = this.rooms.get(user.room) || new Set();
    room.add(user);
    this.rooms.set(user.room, room);
  }

  removeUser(socketId: string): { user: User; room: string } | null {
    for (const [roomId, users] of this.rooms.entries()) {
      const user = Array.from(users).find(u => u.socketId === socketId);
      if (user) {
        users.delete(user);
        if (users.size === 0) {
          this.rooms.delete(roomId);
        }
        return { user, room: roomId };
      }
    }
    return null;
  }

  getRoomUsers(room: string): User[] {
    return Array.from(this.rooms.get(room) || []);
  }

  updateUserMedia(socketId: string, type: 'audio' | 'video', value: boolean): User | null {
    for (const users of this.rooms.values()) {
      const user = Array.from(users).find(u => u.socketId === socketId);
      if (user) {
        if (type === 'audio') {
          user.isAudioMuted = value;
        } else {
          user.isVideoMuted = value;
        }
        return user;
      }
    }
    return null;
  }
}