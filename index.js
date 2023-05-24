const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
})

// WebSocket server
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });
});

// Express server
app.use(express.static('public'));

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});
