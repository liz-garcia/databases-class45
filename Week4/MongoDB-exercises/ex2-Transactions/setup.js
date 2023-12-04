async function setup(client, collection) {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB.");

    // Clean up existing data
    await collection.deleteMany({});

    // Sample data
    const sampleData = [
      { account_number: 101, balance: 1000, account_changes: [] },
      { account_number: 102, balance: 2000, account_changes: [] },
      { account_number: 103, balance: 5000, account_changes: [] },
    ];

    // Insert sample data
    await collection.insertMany(sampleData);
    console.log("Sample data inserted successfully.");
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log("Disconnected from MongoDB.\n");
  }
}

// Export the setup function
module.exports = setup;
