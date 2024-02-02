const findUserById = (
  correctAnswers: any[],
  wrongAnswers: any[],
  userId: number
) => {
  const correctUser = correctAnswers.find((user) => user.userId === userId);
  const wrongUser = wrongAnswers.find((user) => user.userId === userId);
  return correctUser || wrongUser;
};

export default findUserById;
