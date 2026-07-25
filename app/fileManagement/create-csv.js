const fs = require("fs");
const path = require("path");
const envPaths = require("env-paths").default;

/*
creates a CSV file for the provided game
returns 0 when the file was created successfully
returns 1 if the selected game isn't available in the assets folder
returns 2 if the file already exists
returns 3 if an error occurred while creating the file
*/
exports.createCSV = (game) => {
  const targetFolder = envPaths("SoulsLike-Voice-Achievement-Tracker");
  const currentPath = process.cwd();

  try {
    // 1. Ensure the destination directory actually exists on disk
    fs.mkdirSync(targetFolder.config, { recursive: true });

    // 2. Use path.join for safe cross-platform path resolution
    const sourceFile = path.join(currentPath, "assets", `${game}.csv`);
    const targetFile = path.join(targetFolder.config, `${game}.csv`);

    if (!fs.existsSync(sourceFile)) {
      return 1;
    }

    if (fs.existsSync(targetFile)) {
      return 2;
    }

    fs.copyFileSync(sourceFile, targetFile);
    return 0;
  } catch (err) {
    console.error(err);
    return 2;
  }
};
