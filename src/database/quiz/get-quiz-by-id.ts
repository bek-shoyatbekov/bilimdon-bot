import { ObjectId } from "mongodb";
import { client } from "../connectDB";
import { logger } from "../../utils/log/logger";

const getQuizById = async (quizId: string) => {
  try {
    const db = client.db("bilimdon");
    const quiz = await db
      .collection("quizzes")
      .findOne({ _id: new ObjectId(quizId) });
    return quiz;
  } catch (err) {
    logger.error(err);
  }
};

export default getQuizById;
