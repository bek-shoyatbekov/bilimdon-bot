import { InputFile } from "grammy";

import bot from "..";
import path from "node:path";
import config from "../../config";
import { logger } from "../../utils/log/logger";
import ISendQuiz from "../../types/quiz/send-quiz-interface";
import makeAnswerInlineButtons from "../../utils/bot/make-answer-inline-buttons";
import { ObjectId } from "mongodb";
import deleteFile from "../../utils/fs/delete-file";

const publicFolderPath = path.join(__dirname, "../../../public");

const sendQuiz = async (quiz: ISendQuiz) => {
  try {
    const imagePath = publicFolderPath + "/" + quiz.image;
    const image = new InputFile(imagePath);
    const answerKeyboards = makeAnswerInlineButtons(
      quiz.answers,
      quiz.id as ObjectId,
      quiz.correctAnswer
    );

    await bot.api.sendPhoto(config.channelId, image, {
      caption: quiz.question,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [...answerKeyboards[0], ...answerKeyboards[1]],
          [{ text: "Natijalar", callback_data: `results_${quiz.id}` }],
        ],
      },
    });

    await deleteFile(imagePath);
    return true;
  } catch (err) {
    logger.error(err);
  }
};

export default sendQuiz;
