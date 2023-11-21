import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { CREATE_DATABASE_SQL_FILE } from "../constants.js";

// Create array from 01_createDatabase.sql file
const createDatabaseQueries = await readAndProcessSqlFile(CREATE_DATABASE_SQL_FILE);

export const createDatabase = () => {
  try {
    dbConnectAndQuery(createDatabaseQueries);
  } catch (err) {
    console.log("Oops! Something went wrong.", err);
  }
};

createDatabase();
