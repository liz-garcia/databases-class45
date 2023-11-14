// Import 'mysql' package
import mysql from "mysql";

// Make a connection using login credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log("Connection error!", err);
  } else {
    console.log("Connection success!");
  }
});

// Write select queries to answer the questions
const selectQueries = [
  'SELECT name FROM country WHERE population > 8000000',
  'SELECT name FROM country WHERE name LIKE "%land%"',
  'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
  'SELECT name FROM country WHERE continent = "Europe"',
  'SELECT name, surfacearea FROM country ORDER BY surfacearea DESC',
  'SELECT name FROM city WHERE countrycode = "NLD"',
  'SELECT population FROM city WHERE name = "Rotterdam"',
  'SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10',
  'SELECT name, population FROM city ORDER BY population DESC LIMIT 10',
  'SELECT population FROM country WHERE name LIKE "%world%"'
];

// Execute select queries
selectQueries.forEach((query, index) => {
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(`Query ${index + 1}:`, results);
  });
});

// Close the database connection when done
connection.end((err) => {
  if (err) throw err;
  console.log("Connection closed.");
});
