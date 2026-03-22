const readlineSync = require('readline-sync');
const { awardXP } = require('./xpSystem');
const prompts = require('../assets/prompts.json');

function runDebateGame(roomId, players) {
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    console.log(`\nDebate Topic: "${prompt}"\n`);

    const playerArgs = {};
    players.forEach(player => {
        const arg = readlineSync.question(`${player}, enter your argument: `);
        playerArgs[player] = arg;
    });

    console.log("\nVoting Time! Players vote on the best argument (1 = player1, 2 = player2...)\n");
    players.forEach(player => {
        console.log(`${player}'s argument: ${playerArgs[player]}`);
    });

    // Simulated votes (for now, random)
    const winner = players[Math.floor(Math.random() * players.length)];
    console.log(`\nWinner by consensus: ${winner}`);
    awardXP(winner, 10);
}

module.exports = { runDebateGame };