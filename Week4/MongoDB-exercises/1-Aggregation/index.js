const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URL;
const db_name = process.env.DB_NAME;

const client = new MongoClient(uri);
const database = client.db(db_name);
const collection = database.collection("population_pyramid_1950-2022");

// Part 1: Data for this database was added through MongoDB Compass
// by importing population_pyramid_1950-2022.csv file

// Part 2: Function to return the array of the total population for a given Country per year.
async function getTotalPopulationByYear(country) {
  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const pipeline = [
      {
        $match: { Country: country },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: { $add: ["$M", "$F"] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    console.log(`Population data for ${country} retrieved successfully.`);
    return result;
  } catch (error) {
    console.error(`Failed to get population by year for ${country}:\n`, error);
    throw error;
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB.");
  }
}

// Part 3: Function to return an array with all the information for each Continent for a given 'Year' and 'Age', with a new field 'TotalPopulation' that will be the addition of M and F.
async function getContinentsInfoByYearAndAge(year, age) {
  const continents = [
    "AFRICA",
    "ASIA",
    "EUROPE",
    "LATIN AMERICA AND THE CARIBBEAN",
    "NORTHERN AMERICA",
    "OCEANIA",
  ];

  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const results = [];

    for (const continent of continents) {
      const pipeline = [
        {
          $match: { Country: continent, Year: year, Age: age },
        },
        {
          $group: {
            _id: "$Country",
            Country: { $first: "$Country" },
            Year: { $first: "$Year" },
            Age: { $first: "$Age" },
            M: { $sum: "$M" },
            F: { $sum: "$F" },
            TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
            originalId: { $first: "$_id" },
          },
        },
        {
          $project: {
            _id: "$originalId",
            Country: "$Country",
            Year: "$_id.Year",
            Age: "$Age",
            M: "$M",
            F: "$F",
            TotalPopulation: "$TotalPopulation",
          },
        },
      ];      

      const continentResult = await collection.aggregate(pipeline).toArray();
      results.push(...continentResult);
    }

    console.log(
      `Continent information for Year ${year} and Age ${age} retrieved successfully.`
    );
    return results;
  } catch (error) {
    console.error(
      `Failed to get continent information for Year ${year} and Age ${age}:\n`,
      error
    );
    throw error;
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB.");
  }
}

// Function for testing results
async function runTest() {
  try {
    const countryTotalPopulationByYear = await getTotalPopulationByYear(
      "Netherlands"
    );
    console.log(countryTotalPopulationByYear);

    console.log("\n");

    const continentsInfo = await getContinentsInfoByYearAndAge(2020, "100+");
    console.log(continentsInfo);
  } catch (error) {
    console.error("Error during test:", error);
  }
}

runTest();
