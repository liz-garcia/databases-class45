import mysql from "mysql2";

// Create a connection to the database
const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

// Connect to the database
conn.connect((err) => {
  if (err) throw err;
});

// Revised function for preventing SQL injection
async function getPopulationSafe(Country, name, code, cb) {
  conn.query(
    'SELECT Population FROM ?? WHERE Name = ? and Code = ?',
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("\nElement Not found"));
      cb(null, result);
    }
  );
}

// Example usage to get the population of Aruba without SQL injection
await getPopulationSafe("Country", "Aruba", "ABW", (err, result) => {
  console.log('Result for Aruba Population:');
  if (err) {
    console.error(err.message);
  } else {
    console.log(result);
  }
});

// Example usage with SQL injection
await getPopulationSafe(
  "Country",
  "fakeName' OR '1'='1",
  "fakeCode' OR '1'='1",
  (err, result) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Result for SQL Injection:', result);
    }
  }
);

// Close the connection after using
conn.end((err) => {
  if (err) throw err;
});
