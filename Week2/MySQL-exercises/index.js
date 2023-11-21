import { createDatabase } from "./src/01_createDatabase.js";

const startDatabase = () => {
  try {
    createDatabase();
  } catch (err) {
    console.log("Oops! There was an error:", err);
  }
};

startDatabase();
