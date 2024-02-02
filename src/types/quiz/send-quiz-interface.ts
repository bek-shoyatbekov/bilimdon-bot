import { ObjectId } from "mongodb";

export default interface ISendQuiz {
  id: number | ObjectId;
  question: string;
  image: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
  point: number;
}
