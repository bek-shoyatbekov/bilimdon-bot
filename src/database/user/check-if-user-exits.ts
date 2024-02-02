import { client } from "../connectDB";

const checkIfUserExists = async (telegramId: number) => {
  const db = client.db("bilimdon");
  try {
    const result = await db
      .collection("users")
      .findOne({ telegramId: telegramId });
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default checkIfUserExists;
