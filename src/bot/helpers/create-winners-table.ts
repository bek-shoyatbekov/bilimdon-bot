/** @format */

import getWinners from "../../database/user/get-winners";
import { logger } from "../../utils/log/logger";
import getUserInfo from "./get-user-info";

const createWinnersTable = async () => {
  try {
    const winners = await getWinners();
    if (!winners) {
      return;
    }

    let winnersTable = "Go'liblar aniqlandi 🥳 \n\n";

    let countMedals = 0;
    const medals = ["🥇", "🥈", "🥉"];

    for (let winnerIndex = 0; winnerIndex < winners.length; winnerIndex++) {
      const winner = winners[winnerIndex];
      const winnerInfo = await getUserInfo(winner.telegramId!);
      let userMedal = "";
      if (countMedals < 3) {
        userMedal = medals[countMedals];
        countMedals++;
      }

      winnersTable += `${winnerIndex + 1}. ${winnerInfo?.user?.first_name} - ${
        winner.points
      } ball ${userMedal}\n`;
    }

    return winnersTable;
  } catch (err) {
    logger.error(err);
  }
};

export default createWinnersTable;
