import { ObjectId } from "mongodb";

export default function makeAnswerInlineButtons(
  answers: string[],
  quizId: ObjectId,
  correctAnswer: number
) {
  if (answers.length > 0) {
    let half = Math.ceil(answers.length / 2);
    const alteredAnswers = insertCallbackData(answers, quizId, correctAnswer);
    return [alteredAnswers.slice(0, half), alteredAnswers.slice(half)];
  }
  return [];
}

function insertCallbackData(
  answers: string[],
  quizId: ObjectId,
  correctAnswer: number
) {
  return answers.map((answer, index) => {
    return {
      text: answer,
      callback_data: `answer_${quizId}_${index}_${correctAnswer}`,
    };
  });
}
