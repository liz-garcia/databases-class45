import mysql from "mysql2/promise";

export const dbConnection = async (queries) => {
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
        const [results] = await connection.query(query);

        // If query statement includes 'SELECT'
        if (query.includes("SELECT")) {
          console.log(`${query}`);
          console.table(results);
        }
      } catch (queryErr) {
        console.error(
          `Error executing SQL query ${index + 1}: ${query}\n\n`,
          queryErr
        );
        throw queryErr;
      }
    }

    // Close the MySQL connection
    await connection.end();
  } catch (err) {
    console.log("Connection error!", err);
  }
};
