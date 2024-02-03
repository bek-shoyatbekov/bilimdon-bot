/** @format */

import IUser from "../../types/user/user-interface";
import { logger } from "../../utils/log/logger";
import { client } from "../connectDB";

const getWinners = async () => {
  const db = client.db("bilimdon");
  try {
    const result = await db
      .collection("users")
      .aggregate([
        {
          $sort: { points: -1 },
        },
        {
          $project: {
            _id: 0,
          },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();
    return result as Partial<IUser>[];
  } catch (err) {
    logger.error(err);
  }
};

export default getWinners;
