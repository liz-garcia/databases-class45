const accountTable = `
  CREATE TABLE IF NOT EXISTS account (
    account_number INT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL
  );
`;

const accountChangesTable = `
  CREATE TABLE IF NOT EXISTS account_changes (
    change_no INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    amount DECIMAL(10, 2) NOT NULL,
    changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
  );
`;

export const createTablesQueries = [accountTable, accountChangesTable];
