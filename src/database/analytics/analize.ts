import { ObjectId } from "mongodb";
import { client } from "../connectDB";
import { logger } from "../../utils/log/logger";

const analize = async (quizId: ObjectId) => {
  const db = client.db("bilimdon");
  try {
    const result = await db.collection("quiz_analytics").findOne({ quizId });
    if (!result) {
      return null;
    }
    
    return result;
  } catch (err) {
    logger.error(err);
  }
};
