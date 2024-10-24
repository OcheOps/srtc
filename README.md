# Real-time Communication Backend

A Nest.js-based backend application that provides real-time communication capabilities using WebSocket and PeerJS integration. This system supports room-based communication, user management, and peer-to-peer connections for video/audio streaming.

## Features

- Real-time WebSocket communication
- Room-based user management
- Peer-to-peer video/audio streaming
- Message broadcasting
- Audio/video state management
- Cross-Origin Resource Sharing (CORS) support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd srtc
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## API Documentation

### WebSocket Endpoints

The WebSocket server runs on `ws://localhost:3000`

#### Events (Client → Server)

1. **Join Room**
```typescript
// Event: joinRoom
{
  userId: string;
  room: string;
  name: string;
}
```

2. **Toggle Media**
```typescript
// Event: toggleMedia
{
  type: 'audio' | 'video';
  value: boolean;
}
```

3. **Send Message**
```typescript
// Event: message
{
  room: string;
  message: string;
  sender: string;
}
```

#### Events (Server → Client)

1. **User Joined**
```typescript
// Event: userJoined
{
  userId: string;
  name: string;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
}
```

2. **User Left**
```typescript
// Event: userLeft
{
  userId: string;
  name: string;
}
```

3. **Media State Changed**
```typescript
// Event: mediaStateChanged
{
  userId: string;
  type: 'audio' | 'video';
  value: boolean;
}
```

4. **Room Users**
```typescript
// Event: roomUsers
Array<{
  id: string;
  name: string;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
}>
```

### PeerJS Server

The PeerJS server runs on `http://localhost:9000/peer`

- Endpoint: `/peer`
- Default port: 9000
- Discovery enabled: true

## Project Structure

```
src/
├── main.ts                  # Application entry point
├── app.module.ts            # Root application module
├── websocket/
│   ├── websocket.module.ts  # WebSocket module
│   ├── websocket.gateway.ts # WebSocket event handlers
│   └── room.service.ts      # Room management service
└── peer/
    ├── peer.module.ts       # PeerJS module
    ├── peer.service.ts      # PeerJS server service
    └── peer.controller.ts   # PeerJS HTTP controller
```

## Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:coverage
```

## Code Style

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## Environment Variables

The application supports the following environment variables:

- `CLIENT_URL`: Client application URL for CORS (default: 'http://localhost:3000')
- `PORT`: Server port (default: 3000)
- `PEER_PORT`: PeerJS server port (default: 9000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.