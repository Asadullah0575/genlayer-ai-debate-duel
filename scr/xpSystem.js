const leaderboard = {};

function awardXP(player, points) {
    if (!leaderboard[player]) leaderboard[player] = 0;
    leaderboard[player] += points;
}

function showLeaderboard() {
    console.log("\n--- Leaderboard ---");
    Object.entries(leaderboard)
          .sort((a,b) => b[1] - a[1])
          .forEach(([player, points], i) => {
              console.log(`${i+1}. ${player}: ${points} XP`);
          });
}

module.exports = { awardXP, showLeaderboard };