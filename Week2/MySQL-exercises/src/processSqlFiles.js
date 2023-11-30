import fs from "fs";

// Read the content from SQL files and turn it into an array
const readAndProcessSqlFile = (filePath) => {
  // Returns an array of strings with SQL statements
  return fs
    .readFileSync(filePath, "utf8")
    .split(";")
    .filter((query) => query.trim() !== "");
};

export const KEYS_QUERIES = readAndProcessSqlFile("./db/01_keys.sql");
export const RELATIONSHIPS_QUERIES = readAndProcessSqlFile("./db/02_relationships.sql");
export const JOINS_QUERIES = readAndProcessSqlFile("./db/03_joins.sql");
export const AGGREGATE_FUNCTIONS_QUERIES = readAndProcessSqlFile("./db/04_aggregateFunctions.sql");