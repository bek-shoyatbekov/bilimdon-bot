import { client } from "../connectDB";
import { IQuizAnalytic } from "../../types/quiz/quiz-analytic-interface";

const addQuizAnalytics = async (quizAnalytics: Partial<IQuizAnalytic>) => {
  const db = client.db("bilimdon");
  quizAnalytics.correctAnswers = quizAnalytics.correctAnswers || [];
  quizAnalytics.wrongAnswers = quizAnalytics.wrongAnswers || [];
  try {
    const result = await db
      .collection("quiz_analytics")
      .insertOne(quizAnalytics);
    const insertedQuizAnalytic = await db
      .collection("quiz_analytics")
      .findOne({ _id: result.insertedId });
    return insertedQuizAnalytic;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default addQuizAnalytics;
