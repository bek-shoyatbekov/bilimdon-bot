import IQuestion from "../../types/quiz/quiz-interface";
import connectDB from "../connectDB";

const addQuiz = async (question: IQuestion) => {
  const dbClient = await connectDB();
  const db = dbClient.db("bilimdon");
  try {
    const result = await db.collection("quizzes").insertOne(question);
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default addQuiz;
