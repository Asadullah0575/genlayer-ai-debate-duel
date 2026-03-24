const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let rooms = {};

app.use(express.static('.'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinRoom', ({ roomId, name }) => {
        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = {
                players: [],
                arguments: {},
                votes: {}
            };
        }

        rooms[roomId].players.push(name);

        io.to(roomId).emit('updatePlayers', rooms[roomId].players);
    });

    socket.on('submitArgument', ({ roomId, name, argument }) => {
        rooms[roomId].arguments[name] = argument;

        io.to(roomId).emit('updateArguments', rooms[roomId].arguments);
    });

    socket.on('vote', ({ roomId, player }) => {
        if (!rooms[roomId].votes[player]) {
            rooms[roomId].votes[player] = 0;
        }

        rooms[roomId].votes[player]++;

        io.to(roomId).emit('updateVotes', rooms[roomId].votes);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
