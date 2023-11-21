import mysql from "mysql2/promise";

export const dbConnectAndQuery = async (queries, resultsQuery) => {
  try {
    // Make a connection using login credentials
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "hyfuser",
      password: "hyfpassword",
    });

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        console.log("Connection error!", err);
      } else {
        console.log("Connection success!");
      }
    });

    // Execute SQL queries
    for (const [index, query] of queries.entries()) {
      try {
        await connection.query(query);
        console.log(`Query ${index + 1} Success!`);
      } catch (queryErr) {
        console.error(`Error executing SQL query ${index + 1}:`, queryErr);
        throw queryErr;
      }
    }

    // Show Results
    try {
      const [results] = await connection.query(resultsQuery);
      console.log("Results:");
      console.table(results);
    } catch (resultsErr) {
      console.error("Error retrieving results:", resultsErr);
      throw resultsErr;
    }

    // Close the MySQL connection
    await connection.end();
  } catch (err) {
    console.log("Connection error!", err);
  }
};
