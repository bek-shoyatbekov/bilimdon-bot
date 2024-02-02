import { Context } from "grammy";
import { logger } from "../../utils/log/logger";

const alert = async (ctx: Context, message: string) => {
  try {
    await ctx.answerCallbackQuery({
      text: message,
      show_alert: true,
    });
    return true;
  } catch (err) {
    logger.error(err);
  }
};

export default alert;
