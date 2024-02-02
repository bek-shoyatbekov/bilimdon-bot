import { ObjectId } from "mongodb";
import { logger } from "../../utils/log/logger";
import { client } from "../connectDB";
import findUserById from "../../utils/analysis/find-user-in-answers";

const checkIfUserAnswered = async (quizId: ObjectId, userId: number) => {
  try {
    const db = client.db("bilimdon");
    const quizAnalytics = await db
      .collection("quiz_analytics")
      .findOne({ quizId });
    if (quizAnalytics) {
      const user = findUserById(
        quizAnalytics?.correctAnswers,
        quizAnalytics?.wrongAnswers,
        userId
      );
      return user;
    }
    return null;
  } catch (err) {
    logger.error(err);
  }
};

export default checkIfUserAnswered;
