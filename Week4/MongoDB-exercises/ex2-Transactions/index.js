require("dotenv").config();
const uri = process.env.MONGODB_URL;
const db_name = process.env.DB_NAME;
const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);

// Import functions
const setup = require("./setup");
const transferTransaction = require("./transferTransaction");

// Reference to collection 'accounts'
const collectionAccounts = client.db(db_name).collection("accounts");

async function testTransfer() {
  // Call the setup function to initialize data
  await setup(client, collectionAccounts);

  // Call the transfer function to test the transfer
  await transferTransaction(client, collectionAccounts, 101, 102, 1000, "Test transfer.");
}

testTransfer();
