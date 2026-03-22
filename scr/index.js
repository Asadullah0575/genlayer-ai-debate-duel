const { createRoom, getPlayers } = require('./roomManager');
const { runDebateGame } = require('./gameLogic');
const { showLeaderboard } = require('./xpSystem');

const players = ['Alice', 'Bob', 'Charlie']; // Example players
const roomId = 'room1';

createRoom(roomId, players);
runDebateGame(roomId, getPlayers(roomId));
showLeaderboard();