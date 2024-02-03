/** @format */

import { Bot } from "grammy";

import config from "../config";
import handleUserAnswer from "./handlers/handle-user-answer";
import createCronJob from "../utils/cron-job";
import setRating from "./helpers/set-rating";

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => {
  ctx.reply("Bilimdon bot ishga tushdi...🤖");
  return;
});

bot.on("callback_query", handleUserAnswer);

const winnersRatingJob = createCronJob("0 0 * * *", setRating);

winnersRatingJob.start();

export default bot;
