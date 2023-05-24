const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const cors = require('cors')

const wss = new WebSocket.Server({ server: http });

app.use(express.static(__dirname + '/public'));

app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})

wss.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log('Received message from client:', message);
        // Perform any required actions based on the received message

        // Example: Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
