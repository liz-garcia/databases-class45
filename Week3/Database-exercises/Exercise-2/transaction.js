import mysql from "mysql2/promise";
import { createDatabaseQueries } from "./transactions-create-database.js";
import { createTablesQueries } from "./transactions-create-tables.js";
import { insertValuesQueries } from "./transactions-insert-values.js";

const pool = mysql.createPool({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// Queries for: creating new database, tables, and sample values.
const initialDataQueries = [
  ...createDatabaseQueries,
  ...createTablesQueries,
  ...insertValuesQueries,
];

async function runTransaction(debitAccount, creditAccount, amount) {
  const connection = await pool.getConnection();

  try {
    // Create new database with initial data
    for (const dataQuery of initialDataQueries) {
      await connection.query(dataQuery);
    }

    // Start transaction
    await connection.beginTransaction();

    // Transfer 1000 from account 101 to account 102
    const debitQuery = `
    UPDATE account
    SET balance = balance - ${amount}
    WHERE account_number = ${debitAccount};
    `;
    await connection.query(debitQuery);

    const creditQuery = `
    UPDATE account
    SET balance = balance + ${amount}
    WHERE account_number = ${creditAccount}
    `;
    await connection.query(creditQuery);

    // Log changes into accounts_changes table
    const logChangesQuery = `
      INSERT INTO account_changes (account_number, amount, remark) VALUES
      (101, -${amount}, 'Transfer to account ${creditAccount}'),
      (102, ${amount}, 'Transfer from account ${debitAccount}');
    `;
    await connection.query(logChangesQuery);

    await connection.commit();

    console.log("Transaction completed successfully.");
  } catch (error) {
    await connection.rollback();
    console.error("Error in transaction:", error);
  } finally {
    connection.release();
  }
}

// Run the transaction
runTransaction(101, 102, 1000);
