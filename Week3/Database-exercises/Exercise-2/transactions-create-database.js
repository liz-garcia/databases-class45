// Drop database if exists (for exercise purposes)
const dropDatabase = `DROP DATABASE IF EXISTS hyf_accounts_transactions;`;

// Create database if not exists
const createDatabase = `CREATE DATABASE IF NOT EXISTS hyf_accounts_transactions;`;

const useDatabase = `USE hyf_accounts_transactions;`;

export const createDatabaseQueries = [
  dropDatabase,
  createDatabase,
  useDatabase,
];
