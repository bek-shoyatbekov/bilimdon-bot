export function separateData(data: string) {
  const dataArr = data.split("_");
  const buttonType = dataArr[0];

  if (buttonType !== "answer") {
    return { buttonType, quizId: dataArr[1] };
  }
  const quizId = dataArr[1];
  const answer = dataArr[2];
  const correctAnswer = dataArr[3];

  return { buttonType, quizId, answer, correctAnswer };
}
