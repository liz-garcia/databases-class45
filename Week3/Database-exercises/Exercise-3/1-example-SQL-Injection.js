import mysql from 'mysql2';

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

// Function with SQL injection vulnerability
function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

// Example with SQL injection:
// Malicious values for accessing all records
const maliciousName = "1' OR '1'='1' -- ";
const maliciousCode = "1' OR '1'='1' -- ";

getPopulation("Country", maliciousName, maliciousCode, (err, result) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("\nExample SQL injection:");
    console.log(result);
  }
  // Close the connection after the query
  connection.end();
});
