import { ObjectId } from "mongodb";
import getQuizAnalytics from "../../database/analytics/get-quiz-analytics";
import getQuizById from "../../database/quiz/get-quiz-by-id";
import addUser from "../../database/user/add-user";
import checkIfUserExists from "../../database/user/check-if-user-exits";
import { separateData } from "../../utils/bot/separate-data";
import { logger } from "../../utils/log/logger";
import addQuizAnalytics from "../../database/analytics/add-quiz-analytics";
import updateUserPoint from "../../database/user/update-user-point";
import updateAnalytics from "../../database/analytics/update-analytics";
import checkIfUserAnswered from "../../database/analytics/check-if-user-answerd";
import alert from "../helpers/alert";
import calculatePercentages from "../../utils/analysis/calculate-percentages";

const handleUserAnswer = async (ctx: any) => {
  try {
    const { data } = ctx.callbackQuery;

    const userId = ctx?.from.id;

    const { buttonType, quizId, answer, correctAnswer } = separateData(data);

    if (!quizId) {
      await alert(ctx, "Xatolik yuz berdi");
      return;
    }

    const isCorrectAnswer = parseInt(answer!) + 1 === parseInt(correctAnswer!);

    const quiz = await getQuizById(new ObjectId(quizId));

    let quizAnalytics = await getQuizAnalytics(quiz?._id!);

    const checkIfUserAnsweredResult = await checkIfUserAnswered(
      new ObjectId(quizId),
      userId
    );

    if (checkIfUserAnsweredResult && buttonType === "answer") {
      const tip = isCorrectAnswer
        ? ""
        : "\n\nXato javob 👎 \n\n" + quiz?.explanation + " 💡";
      const answers = JSON.parse(quiz?.answers);
      await alert(
        ctx,
        `Javob berib bo'ldingiz: 🙅\n\nSizning javobingiz: ${
          answers[checkIfUserAnsweredResult.answer]
        } ${
          checkIfUserAnsweredResult.answer + 1 ==
          parseInt(correctAnswer as string)
            ? "✅"
            : "❌"
        }\n ${tip}
      `
      );
      return;
    }

    // Check if user exists
    let user = await checkIfUserExists(userId);

    if (!user) {
      user = await addUser({ telegramId: userId });
    }

    // Check if quiz analytics exists, else create
    if (!quizAnalytics) {
      quizAnalytics = await addQuizAnalytics({ quizId: new ObjectId(quizId) });
    }

    if (checkIfUserAnsweredResult && buttonType === "results") {
      const analytics = await getQuizAnalytics(quiz?._id!);
      if (!analytics) {
        await alert(ctx, "Hali javoblar hisoblanmadi...");
        return;
      }
      const correctAnswers = analytics?.correctAnswers?.length;
      const wrongAnswers = analytics?.wrongAnswers?.length;
      const totalAnswers = correctAnswers + wrongAnswers;
      const correctAnswersInPercent = calculatePercentages(
        correctAnswers,
        totalAnswers
      );
      const wrongAnswersInPercent = Math.abs(100 - correctAnswersInPercent);

      await alert(
        ctx,
        `🎯 Natijalar:\n\n✅ To'g'ri javoblar: ${correctAnswersInPercent}%\n❎ Noto'g'ri javoblar: ${wrongAnswersInPercent}% \n👥 Umumiy javoblar: ${totalAnswers}`
      );
    }

    // Update user points and analytics
    if (user && quizAnalytics) {
      if (isCorrectAnswer) {
        await Promise.all([
          updateUserPoint(user._id, (quiz?.point + user?.points) | 0),
          updateAnalytics(quizAnalytics._id, "correctAnswers", userId, answer!),
        ]);
        alert(ctx, `✅ To'g'ri javob `);
        return;
      } else {
        await updateAnalytics(
          quizAnalytics._id,
          "wrongAnswers",
          userId,
          answer!
        );
        alert(ctx, `❌ Noto'g'ri javob \n 💡 ${quiz?.explanation}`);
        return;
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

export default handleUserAnswer;
