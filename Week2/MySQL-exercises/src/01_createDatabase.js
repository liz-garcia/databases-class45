import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { CREATE_DATABASE_SQL_FILE } from "../constants.js";

// Create array from 01_createDatabase.sql file
const createDatabaseQueries = readAndProcessSqlFile(CREATE_DATABASE_SQL_FILE);

// The resulting list should include: "authors_researchPapers"
const resultQueries = [`SHOW DATABASES;`];

export const createDatabase = async () => {
  try {
    console.log("\x1b[1mCreating database:\x1b[0m");
    await dbConnectAndQuery(createDatabaseQueries, resultQueries);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
  }
};
