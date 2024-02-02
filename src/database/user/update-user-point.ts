import { ObjectId } from "mongodb";
import { client } from "../connectDB";

const updateUserPoint = async (userId: ObjectId, points: number) => {
  const db = client.db("bilimdon");

  const result = await db
    .collection("users")
    .updateOne({ _id: userId }, { $set: { points } });

  return result.modifiedCount > 0;
};

export default updateUserPoint;
