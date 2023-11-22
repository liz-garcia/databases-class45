import { dbConnectAndQuery } from "./dbConnection.js";
import { readAndProcessSqlFile } from "./processSqlFile.js";
import { RESEARCH_PAPERS_TABLE_SQL } from "../constants.js";

// Create array from 01_createDatabase.sql file
const researchPapersTableQueries = readAndProcessSqlFile(RESEARCH_PAPERS_TABLE_SQL);

// Show results
const queryShowResults = [
  `SHOW TABLES FROM authors_researchPapers;`
];

export const createResearchPapersTable = async () => {
  try {
    console.log("\x1b[34m\x1b[1mCreating 'researchPapers' and 'author_paper' tables:\x1b[0m");
    await dbConnectAndQuery(researchPapersTableQueries, queryShowResults);
  } catch (err) {
    console.log("\nOops! Something went wrong.\n\n", err);
    return;
  }
};
