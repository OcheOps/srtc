import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import ws from 'k6/ws';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const url = 'ws://localhost:3000';
    
    const res = ws.connect(url, {}, function (socket) {
        socket.on('open', () => {
            socket.send(JSON.stringify({
                event: 'joinRoom',
                data: {
                    userId: `user_${__VU}`,
                    room: 'loadtest',
                    name: `Load Test User ${__VU}`
                }
            }));
        });

        socket.on('message', (data) => {
            console.log(data);
        });
    });

    check(res, { 'Connected successfully': (r) => r && r.status === 101 });
    sleep(1);
}