const readlineSync = require('readline-sync');
const { awardXP } = require('./xpSystem');
const prompts = require('../assets/prompts.json');

function runDebateGame(roomId, players) {
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    console.log(`\nDebate Topic: "${prompt}"\n`);

    const playerArgs = {};

    // 🧠 Step 1: Players submit arguments
    players.forEach(player => {
        const arg = readlineSync.question(`${player}, enter your argument: `);
        playerArgs[player] = arg;
    });

    // 🧾 Show all arguments
    console.log("\n--- Arguments ---");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player}: ${playerArgs[player]}`);
    });

    // 🗳️ Step 2: Voting
    const votes = {};
    players.forEach(player => votes[player] = 0);

    console.log("\n--- Voting Phase ---");

    players.forEach(voter => {
        console.log(`\n${voter}, vote for the best argument:`);

        players.forEach((player, index) => {
            if (player !== voter) {
                console.log(`${index + 1}. ${player}`);
            }
        });

        let choice = readlineSync.questionInt("Enter number: ");

        // Adjust for index
        const selectedPlayer = players[choice - 1];

        if (selectedPlayer && selectedPlayer !== voter) {
            votes[selectedPlayer]++;
        } else {
            console.log("Invalid vote, skipped.");
        }
    });

    // 📊 Step 3: Determine winner
    let winner = null;
    let maxVotes = -1;

    for (let player in votes) {
        if (votes[player] > maxVotes) {
            maxVotes = votes[player];
            winner = player;
        }
    }

    // 🏆 Step 4: Show results
    console.log("\n--- Results ---");
    console.log("Votes:", votes);
    console.log(`Winner: ${winner}`);

    // 🎯 Step 5: Award XP
    if (winner) {
        awardXP(winner, 10);
    }
}

module.exports = { runDebateGame };
