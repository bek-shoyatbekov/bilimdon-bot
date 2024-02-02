import { ObjectId } from "mongodb";
import { client } from "../connectDB";
import { logger } from "../../utils/log/logger";

const getQuizAnalytics = async (quizId: ObjectId) => {
  try {
    const db = client.db("bilimdon");
    const quiz = await db.collection("quiz_analytics").findOne({ quizId });
    return quiz;
  } catch (err) {
    logger.error(err);
  }
};

export default getQuizAnalytics;
