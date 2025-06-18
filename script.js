const teamA = {
  name: "チームA",
  players: Array(9).fill().map((_, i) => ({ name: `A選手${i+1}`, avg: 0.3 }))
};

const teamB = {
  name: "チームB",
  players: Array(9).fill().map((_, i) => ({ name: `B選手${i+1}`, avg: 0.28 }))
};

function startGame() {
  const log = document.getElementById("log");
  log.textContent = ""; // clear log

  let score = { A: 0, B: 0 };
  let lineup = { A: 0, B: 0 };

  for (let inning = 1; inning <= 9; inning++) {
    logLine(`【${inning}回表】`);
    score.A += playHalfInning(teamA, lineup, log);

    logLine(`【${inning}回裏】`);
    score.B += playHalfInning(teamB, lineup, log);
  }

  logLine("\n試合終了！");
  logLine(`スコア：${teamA.name} ${score.A} - ${score.B} ${teamB.name}`);
}

function playHalfInning(team, lineup, log) {
  let runs = 0;
  let outs = 0;
  while (outs < 3) {
    const batter = team.players[lineup[team.name === "チームA" ? "A" : "B"]];
    const hit = Math.random() < batter.avg;
    logLine(`${batter.name}：${hit ? "ヒット！" : "アウト…"}`);
    if (hit) runs++;
    else outs++;

    lineup[team.name === "チームA" ? "A" : "B"] = (lineup[team.name === "チームA" ? "A" : "B"] + 1) % 9;
  }
  logLine(`→ この回 ${runs} 点`);
  return runs;
}

function logLine(text) {
  document.getElementById("log").textContent += text + "\n";
}

