async function transferTransaction(client, collection, fromAccount, toAccount, amount, remark) {
  await client.connect();
  console.log("Connected to MongoDB.");
  const session = client.startSession();
  console.log("Started Transfer Transaction...");

  try {
    await session.withTransaction(async () => {
      // Find the accounts
      const fromAcc = await collection.findOne({ account_number: fromAccount });
      const toAcc = await collection.findOne({ account_number: toAccount });

      if (!fromAcc || !toAcc) {
        console.log("Invalid account numbers.");
        return;
      }

      // Check if the from account has enough balance
      if (fromAcc.balance < amount) {
        console.log("Insufficient funds.");
        return;
      }

      // Update balances and account_changes
      const changeNumber =
        Math.max(
          ...fromAcc.account_changes.map((change) => change.change_number),
          ...toAcc.account_changes.map((change) => change.change_number),
          0
        ) + 1;

      const timestamp = new Date();

      // Update "from" account
      await collection.updateOne(
        { account_number: fromAccount },
        {
          $set: { balance: fromAcc.balance - amount },
          $push: {
            account_changes: {
              change_number: changeNumber,
              amount: -amount,
              changed_date: timestamp,
              remark,
            },
          },
        }
      );

      // Update "to" account
      await collection.updateOne(
        { account_number: toAccount },
        {
          $set: { balance: toAcc.balance + amount },
          $push: {
            account_changes: {
              change_number: changeNumber,
              amount,
              changed_date: timestamp,
              remark,
            },
          },
        }
      );

      console.log(
        `Transfer successful: ${amount} from ${fromAccount} to ${toAccount}`
      );
    });
    console.log("Transaction committed successfully.");
  } catch (error) {
    console.error("Error during transaction:", error);
  } finally {
    await session.endSession();
    await client.close();
    console.log("Disconnected from MongoDB.\n");
  }
}

// Export the transfer function
module.exports = transferTransaction;
