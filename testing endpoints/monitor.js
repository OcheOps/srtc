const io = require('socket.io-client');
const axios = require('axios');

function monitorServers() {
    // Monitor WebSocket Server
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
        console.log('✅ WebSocket Server: Connected');
    });

    socket.on('connect_error', (error) => {
        console.error('❌ WebSocket Server Error:', error);
    });

    // Monitor PeerJS Server
    setInterval(async () => {
        try {
            await axios.get('http://localhost:9000/peer');
            console.log('✅ PeerJS Server: Running');
        } catch (error) {
            console.error('❌ PeerJS Server Error:', error.message);
        }
    }, 5000);
}

monitorServers();