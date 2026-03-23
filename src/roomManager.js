const rooms = {};

function createRoom(roomId, players) {
    rooms[roomId] = players;
    console.log(`Room ${roomId} created with players: ${players.join(", ")}`);
}

function getPlayers(roomId) {
    return rooms[roomId] || [];
}

module.exports = { createRoom, getPlayers };