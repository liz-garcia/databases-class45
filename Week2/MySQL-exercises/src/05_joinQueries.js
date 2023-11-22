import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { JOIN_QUERIES_SQL } from "../constants.js";

// Create array from 01_createDatabase.sql file
const joinQueriesSql = readAndProcessSqlFile(JOIN_QUERIES_SQL);

// Show results
const queryShowResults = joinQueriesSql.slice(1);
;

export const joinQueries = async () => {
  try {
    console.log("\x1b[34m\x1b[1mJoin queries:\x1b[0m");
    await dbConnectAndQuery(joinQueriesSql, queryShowResults);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
    return;
  }
};
