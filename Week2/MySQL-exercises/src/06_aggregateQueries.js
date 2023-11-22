import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { AGGREGATE_QUERIES_SQL } from "../constants.js";

// Create array from 01_createDatabase.sql file
const aggregateQueriesSql = readAndProcessSqlFile(AGGREGATE_QUERIES_SQL);

// Show results
const queryShowResults = aggregateQueriesSql.slice(1);

export const aggregateQueries = async () => {
  try {
    console.log("\x1b[34m\x1b[1mAggregate queries:\x1b[0m");
    await dbConnectAndQuery(aggregateQueriesSql, queryShowResults);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
    return;
  }
};
