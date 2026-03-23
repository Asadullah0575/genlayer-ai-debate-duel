const prompts = [
  "Is AI more beneficial than harmful?",
  "Should Web3 replace Web2?",
  "Is decentralization always better?"
];

let players = [];
let argumentsMap = {};
let votes = {};
let leaderboard = {};

const topic = prompts[Math.floor(Math.random() * prompts.length)];
document.getElementById("topic").innerText = topic;

function submitArgument() {
  const name = document.getElementById("playerName").value;
  const argument = document.getElementById("argumentInput").value;

  if (!name || !argument) return alert("Fill all fields");

  players.push(name);
  argumentsMap[name] = argument;

  document.getElementById("arguments").innerHTML += `<p><b>${name}:</b> ${argument}</p>`;

  document.getElementById("playerName").value = "";
  document.getElementById("argumentInput").value = "";

  // Start voting after 3 players
  if (players.length === 3) {
    startVoting();
  }
}

function startVoting() {
  document.getElementById("voting").style.display = "block";

  const voteDiv = document.getElementById("voteOptions");
  voteDiv.innerHTML = "";

  players.forEach(player => {
    votes[player] = 0;
    voteDiv.innerHTML += `<button onclick="vote('${player}')">${player}</button>`;
  });
}

let voteCount = 0;

function vote(player) {
  votes[player]++;
  voteCount++;

  if (voteCount === players.length) {
    showResults();
  }
}

function showResults() {
  let winner = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );

  leaderboard[winner] = (leaderboard[winner] || 0) + 10;

  document.getElementById("result").innerText = `Winner: ${winner}`;

  let board = "Leaderboard:<br>";
  for (let p in leaderboard) {
    board += `${p}: ${leaderboard[p]} XP<br>`;
  }

  document.getElementById("leaderboard").innerHTML = board;
}
