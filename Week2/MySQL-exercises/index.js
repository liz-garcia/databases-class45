import { createDatabase } from "./src/01_createDatabase.js";
import { createAuthorsTable } from "./src/02_createAuthorsTable.js";
import { createResearchPapersTable } from "./src/03_createResearchPapersTable.js";
import { insertData } from "./src/04_insertData.js";
import { joinQueries } from "./src/05_joinQueries.js";
import { aggregateQueries } from "./src/06_aggregateQueries.js";

// npm start
const startDatabase = async () => {
  try {
    await createDatabase();
    await createAuthorsTable();
    await createResearchPapersTable();
    await insertData();
    await joinQueries();
    await aggregateQueries();
  } catch (err) {
    console.log("Oops! There was an error:", err);
  }
};

startDatabase();
