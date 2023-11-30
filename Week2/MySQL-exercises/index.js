import { dbConnection } from "./src/dbConnection.js";
import { KEYS_QUERIES, RELATIONSHIPS_QUERIES, JOINS_QUERIES, AGGREGATE_FUNCTIONS_QUERIES } from "./src/processSqlFiles.js";

// npm start
const mySqlExercises = async () => {
  try {
    // Create database and tables
    console.log("\nCreating initial data...");
    await dbConnection(KEYS_QUERIES);
    await dbConnection(RELATIONSHIPS_QUERIES);
    console.log("\x1b[34m\x1b[1mSuccessful database creation!\x1b[0m");
    // Retrieve information
    console.log("\nRetrieving data...");
    await dbConnection(JOINS_QUERIES);
    await dbConnection(AGGREGATE_FUNCTIONS_QUERIES);
  } catch (err) {
    console.log("Oops! There was an error.\n", err);
  }
};

mySqlExercises();
