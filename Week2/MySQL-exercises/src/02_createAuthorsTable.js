import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { AUTHORS_TABLE_SQL } from "../constants.js";

// Create array from 01_createDatabase.sql file
const authorsTableQueries = readAndProcessSqlFile(AUTHORS_TABLE_SQL);

// Show results
const resultQueries = [`SHOW TABLES FROM authors_researchPapers;`];

export const createAuthorsTable = async () => {
  try {
    console.log("\x1b[34m\x1b[1mCreating 'authors' table:\x1b[0m");
    await dbConnectAndQuery(authorsTableQueries, resultQueries);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
  }
};