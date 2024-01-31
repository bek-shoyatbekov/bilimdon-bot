import bot from ".";
import config from "../config";
import { logger } from "../utils/log/logger";

const sendQuiz = async (quiz: any) => {
  try {
    // const newQuiz = InputMediaBuilder.photo(
    //   "https://grammy.dev/images/grammY.png",
    //   {
    //     caption: quiz.question,
    //   }
    // );

    // await bot.api.sendPhoto(config.channelId, );
    return true;
  } catch (err) {
    logger.error(err);
  }
};

export default sendQuiz;
