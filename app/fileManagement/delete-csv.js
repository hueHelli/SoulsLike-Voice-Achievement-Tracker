const fs = require("fs");
const path = require("path");
const envPaths = require("env-paths").default;

exports.deleteCSV = (game) => {
  const targetFolder = envPaths("SoulsLike-Voice-Achievement-Tracker");
  const targetFile = path.join(targetFolder.config, `${game}.csv`);

  try {
    fs.rmSync(targetFile);
    return 0;
  } catch (err) {
    console.error(err);
    return -1;
  }
};
