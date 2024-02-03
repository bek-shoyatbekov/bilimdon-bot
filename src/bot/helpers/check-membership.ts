/** @format */

import bot from "..";
import config from "../../config";
import { logger } from "../../utils/log/logger";

const checkMemberShip = async (userId: number) => {
  try {
    const result = await bot.api.getChatMember(config.channelId, userId);
    return result;
  } catch (err) {
    logger.error(err);
  }
};

export default checkMemberShip;
