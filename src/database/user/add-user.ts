import IUser from "../../types/user/user-interface";
import { client } from "../connectDB";

const addUser = async (user: Partial<IUser>) => {
  const db = client.db("bilimdon");
  try {
    const result = await db.collection("users").insertOne(user);
    const insertedUser = await db
      .collection("users")
      .findOne({ _id: result.insertedId });
    return insertedUser;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default addUser;
