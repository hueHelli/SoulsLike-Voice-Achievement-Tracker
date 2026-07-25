const fs = require("fs");
const path = require("path");
const envPaths = require("env-paths").default;

exports.checkGoal = (game, goal) => {
  const targetFolder = envPaths("SoulsLike-Voice-Achievement-Tracker");
  const targetFile = path.join(targetFolder.config, `${game}.csv`);

  try {
    if (!fs.existsSync(targetFile)) {
      return 1;
    }

    const file = fs.readFileSync(targetFile, "utf8").split("\n");
    let goals = [];
    for (const line of file) {
      goals.push(line.split(";"));
    }

    for (let i = 0; i < goals.length; i++) {
      const g = goals[i];
      if (g[0] === goal) {
        goals[i][3] = Math.abs(parseInt(g[3]) - 1);
        const updatedFile = goals.map((g) => g.join(";")).join("\n");
        fs.writeFileSync(targetFile, updatedFile);
        return 0;
      }
    }
  } catch (err) {
    console.error(err);
    return -1;
  }
};
