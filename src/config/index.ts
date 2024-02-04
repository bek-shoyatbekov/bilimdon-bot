/** @format */

import "dotenv/config";

import { IConfig } from "../types/config/config-interface";

export const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017",
  secret: process.env.SECRET || "bilimdon",
  botToken: process.env.BOT_TOKEN || "",
  channelId: Number(process.env.CHANNEL_ID) || 0,
};

export default config;
