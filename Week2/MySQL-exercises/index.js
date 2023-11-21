import { createDatabase } from "./src/01_createDatabase.js";
import { createAuthorsTable } from "./src/02_createAuthorsTable.js";

const startDatabase = async () => {
  try {
    await createDatabase();
    await createAuthorsTable();
  } catch (err) {
    console.log("Oops! There was an error:", err);
  }
};

startDatabase();
