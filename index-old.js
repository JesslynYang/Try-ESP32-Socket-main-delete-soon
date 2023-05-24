const express = require('express');
const app = express();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const cors = require('cors');

// app.use(cors()); // Enable CORS for all routes
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('toggleButton', (state) => {
        console.log('Button state changed:', state);
        io.emit('buttonStateChanged', state);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
