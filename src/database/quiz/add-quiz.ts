import IQuiz from "../../types/quiz/quiz-interface";

import { client } from "../connectDB";

const addQuiz = async (question: IQuiz) => {
  const db = client.db("bilimdon");
  try {
    const result = await db.collection("quizzes").insertOne(question);
    const insertedQuiz = await db.collection("quizzes").findOne({
      _id: result.insertedId,
    });
    return insertedQuiz;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default addQuiz;
