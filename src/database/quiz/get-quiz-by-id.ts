import { ObjectId } from "mongodb";
import { client } from "../connectDB";
import { logger } from "../../utils/log/logger";

const getQuizById = async (quizId: ObjectId) => {
  try {
    const db = client.db("bilimdon");
    const quiz = await db.collection("quizzes").findOne({ _id: quizId });
    return quiz;
  } catch (err) {
    logger.error(err);
  }
};

export default getQuizById;
