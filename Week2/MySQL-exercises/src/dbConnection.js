import mysql from "mysql";

export const dbConnectAndQuery = (queriesArray) => {
  // Make a connection using login credentials
  const connection = mysql.createConnection({
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
  queriesArray.forEach((query, index) => {
    connection.query(query, (queryErr, results) => {
      if (queryErr) {
        console.error("Error executing SQL queries:", queryErr);
      } else {
        console.log(`Query ${index + 1} Success!`);
      }
    });
  });

  // Close the MySQL connection
  connection.end();
};
