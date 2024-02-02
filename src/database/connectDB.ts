import { MongoClient, ServerApiVersion } from "mongodb";

import config from "../config";
import { logger } from "../utils/log/logger";

export const client = new MongoClient(config.mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected...");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
