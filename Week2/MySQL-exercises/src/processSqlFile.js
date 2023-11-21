// processSqlFile.js
import fs from "fs/promises"; // Note the change to fs.promises for asynchronous operations

export const readAndProcessSqlFile = async (filePath) => {
  try {
    // Returns an array of strings with SQL statements
    const fileContent = await fs.readFile(filePath, "utf8");
    return fileContent.split(";").filter((query) => query.trim() !== "");
  } catch (err) {
    console.error("Error reading and processing SQL file:", err);
    throw err; // Rethrow the error for the caller to handle
  }
};
