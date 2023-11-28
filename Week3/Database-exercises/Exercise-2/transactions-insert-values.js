const accountData = `
INSERT INTO account
(account_number, balance)
VALUES
    (101, 5000.00),
    (102, 8000.00);
`;

const accountChangesData = `
INSERT INTO account_changes
(account_number, amount, remark)
VALUES
    (101, 5000.00, 'Initial deposit'),
    (102, 8000.00, 'Initial deposit');
`;

export const insertValuesQueries = [accountData, accountChangesData];
