/** @format */

import bot from "..";
import { logger } from "../../utils/log/logger";

const pinMessage = async (chatId: number, messageId: number) => {
  try {
    const result = await bot.api.pinChatMessage(chatId, messageId);
    return result;
  } catch (err) {
    logger.error(err);
  }
};

export default pinMessage;
