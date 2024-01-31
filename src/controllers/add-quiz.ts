import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/log/logger";
import validateQuiz from "../utils/joi/validate-quiz";
import addQuiz from "../database/quiz/add-quiz";
import IPoll from "../types/bot/poll-interface";
import sendPoll from "../bot/send-quiz";
import IQuiz from "../types/quiz/quiz-interface";
import sendQuiz from "../bot/send-quiz";

export default async function addNewQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const image = req.file?.filename;
    const value = await validateQuiz(req.body);
    logger.info(value);

    const quiz = {
      image,
      question: value.question,
      answers: JSON.parse(value.answers),
      correctAnswer: value.correct,
    };

    const resultSentQuiz = await sendQuiz(quiz);

    const newQuiz = await addQuiz({ ...value, image });

    if (!newQuiz) {
      res.status(400).send("Quiz qo'shilmadi");
    }

    logger.info(newQuiz);

    res.status(200).send("ok");
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
