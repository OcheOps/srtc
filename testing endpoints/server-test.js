const io = require('socket.io-client');
const { PeerServer } = require('peer');
const axios = require('axios');

// First install required dependencies
// npm install socket.io-client axios jest --save-dev

describe('Server Tests', () => {
    let socket;
    const serverUrl = 'http://localhost:3000';
    const peerUrl = 'http://localhost:9000/peer';

    beforeEach((done) => {
        socket = io(serverUrl, {
            transports: ['websocket'],
            autoConnect: true
        });
        socket.on('connect', done);
    });

    afterEach(() => {
        if (socket.connected) {
            socket.disconnect();
        }
    });

    test('WebSocket server is running', (done) => {
        expect(socket.connected).toBe(true);
        done();
    });

    test('PeerJS server is running', async () => {
        try {
            const response = await axios.get(peerUrl);
            expect(response.status).toBe(200);
        } catch (error) {
            fail('PeerJS server is not running');
        }
    });
});