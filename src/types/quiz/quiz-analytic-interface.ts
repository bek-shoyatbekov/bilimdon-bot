import { ObjectId } from "mongodb";
import IUser from "../user/user-interface";

export interface IQuizAnalytic {
  quizId: ObjectId;
  correctAnswers: IUser[];
  wrongAnswers: IUser[];
}
