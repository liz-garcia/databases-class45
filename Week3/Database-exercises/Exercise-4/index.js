require('dotenv').config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const result = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .insertOne(newEpisode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}.\n`
  );
}

async function findEpisodesExercises(client) {
  const episode2Season2 = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${episode2Season2.title}.\n`);

  const blackRiverEpisode = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}.\n`
  );

  const cliffEpisodes = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" })
    .toArray();
  console.log(
    `The episodes that Bob Ross painted a CLIFF are: "${cliffEpisodes
      .map((episode) => episode.title)
      .join(", ")}".\n`
  );

  const cliffLighthouseEpisodes = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .toArray();
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are: "${cliffLighthouseEpisodes
      .map((episode) => episode.title)
      .join(", ")}".\n`
  );
}

async function updateEpisodeExercises(client) {
  const resultUpdateTitle = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${resultUpdateTitle.modifiedCount} episode(s).\n`
  );

  const resultUpdateBushes = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .updateMany({ elements: "BUSHES" }, { $set: { "elements.$": "BUSH" } });
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${resultUpdateBushes.modifiedCount} episode(s).\n`
  );
}

async function deleteEpisodeExercise(client) {
  const resultDelete = await client
    .db(process.env.DB_NAME)
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });
  console.log(
    `Ran a command to delete episode and it deleted ${resultDelete.deletedCount} episode(s).\n`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }

  const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();