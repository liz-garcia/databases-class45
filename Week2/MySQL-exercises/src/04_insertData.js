import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { INSERT_DATA_SQL } from "../constants.js";

// Create array from 01_createDatabase.sql file
const insertDataQueries = readAndProcessSqlFile(INSERT_DATA_SQL);

export const insertData = async () => {
  try {
    console.log("\x1b[34m\x1b[1mInserting initial data:\x1b[0m");
    await dbConnectAndQuery(insertDataQueries);
    console.log("\n");
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
    return;
  }
};
