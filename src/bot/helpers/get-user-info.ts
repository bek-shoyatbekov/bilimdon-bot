/** @format */

import bot from "..";
import config from "../../config";
import { logger } from "../../utils/log/logger";

const getUserInfo = async (userId: number) => {
  try {
    const user = await bot.api.getChatMember(config.channelId, userId);
    return user;
  } catch (err) {
    logger.error(err);
  }
};

export default getUserInfo;
