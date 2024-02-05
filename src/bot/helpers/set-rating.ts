/** @format */

import bot from "..";
import config from "../../config";
import { logger } from "../../utils/log/logger";
import createWinnersTable from "./create-winners-table";

const setRating = async () => {
  try {
    const winnersTable = await createWinnersTable();
    const ratingMessage = await bot.api.sendMessage(
      config.channelId,
      winnersTable!
    );

    if (ratingMessage) {
      await bot.api.pinChatMessage(config.channelId, ratingMessage.message_id);
    }
  } catch (err) {
    logger.error(err);
  }
};

export default setRating;
