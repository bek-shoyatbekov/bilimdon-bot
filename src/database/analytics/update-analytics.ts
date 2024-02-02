import { ObjectId } from "mongodb";
import { client } from "../connectDB";
import { logger } from "../../utils/log/logger";

const updateAnalytics = async (
  analytics_id: ObjectId,
  answerType: "correctAnswers" | "wrongAnswers",
  userId: ObjectId,
  answer: string
) => {
  try {
    const db = client.db("bilimdon");
    const result = await db.collection("quiz_analytics").updateOne(
      {
        _id: new ObjectId(analytics_id),
      },
      {
        $push: {
          [answerType]: { userId, answer },
        },
      }
    );
    return result.modifiedCount > 0;
  } catch (err) {
    logger.error(err);
  }
};

export default updateAnalytics;
