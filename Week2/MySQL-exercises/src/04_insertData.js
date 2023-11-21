import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { INSERT_DATA_SQL_FILE } from "../constants.js";

// Create array from 01_createDatabase.sql file
const insertDataQueries = readAndProcessSqlFile(INSERT_DATA_SQL_FILE);

// Show results
const queryShowResults = [
  `SELECT * FROM authors;`,
  `SELECT * FROM researchPapers;`
];

export const insertData = async () => {
  try {
    console.log("\x1b[1mInserting initial data:\x1b[0m");
    await dbConnectAndQuery(insertDataQueries, queryShowResults);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
    return;
  }
};
