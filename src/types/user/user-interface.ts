import { ObjectId } from "mongodb";

export default interface IUser {
  _id?: ObjectId;
  telegramId: number;
  username?: string;
  name?: string;
  points?: number;
}
