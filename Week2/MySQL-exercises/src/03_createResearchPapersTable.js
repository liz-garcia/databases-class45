import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { RESEARCH_PAPERS_TABLE_SQL_FILE } from "../constants.js";

// Create array from 01_createDatabase.sql file
const researchPapersTableQueries = readAndProcessSqlFile(RESEARCH_PAPERS_TABLE_SQL_FILE);

// Show results
const queryShowResults = [
  `SHOW TABLES FROM authors_researchPapers;`,
  `SHOW COLUMNS FROM authors;`,
  `SHOW COLUMNS FROM researchPapers;`
];

export const createResearchPapersTable = async () => {
  try {
    console.log("\x1b[1mCreating 'researchPapers' table:\x1b[0m");
    await dbConnectAndQuery(researchPapersTableQueries, queryShowResults);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
    return;
  }
};
