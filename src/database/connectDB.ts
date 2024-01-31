import { MongoClient, ServerApiVersion } from "mongodb";

import config from "../config";

const connectDB = async () => {
  try {
    const uri = config.mongoURI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log("MongoDB Connected...");
    return client;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
