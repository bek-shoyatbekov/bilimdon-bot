import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/log/logger";
import validateQuiz from "../utils/joi/validate-quiz";
import addQuiz from "../database/quiz/add-quiz";
import IPoll from "../types/bot/poll-interface";
import sendPoll from "../bot/helpers/send-quiz";
import IQuiz from "../types/quiz/quiz-interface";
import sendQuiz from "../bot/helpers/send-quiz";
import ISendQuiz from "../types/quiz/send-quiz-interface";
import { ObjectId, WithId } from "mongodb";

export default async function addNewQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const image = req.file?.filename;
    const value = await validateQuiz(req.body);

    const newQuiz = await addQuiz({ ...value, image });

    if (!newQuiz) {
      res.status(400).send("Quiz qo'shilmadi");
    }

    const quiz: ISendQuiz = {
      id: (newQuiz as WithId<ObjectId>)._id,
      image: image!,
      question: value.question as string,
      answers: JSON.parse(value.answers) as string[],
      correctAnswer: value.correct as number,
      explanation: value.explanation as string,
      point: value.point as number,
    };

    const resultSentQuiz = await sendQuiz(quiz);

    logger.info(resultSentQuiz);

    res.status(200).send("ok");
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
