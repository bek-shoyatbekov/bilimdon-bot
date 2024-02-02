import { Bot } from "grammy";
import config from "../config";
import handleUserAnswer from "./handlers/handle-user-answer";

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => {
  ctx.reply("Welcome! Up and running.");
});

bot.on("callback_query", handleUserAnswer);
bot.on("callback_query", async (ctx) => {
  await ctx.answerCallbackQuery("Natijalar");
});

export default bot;
