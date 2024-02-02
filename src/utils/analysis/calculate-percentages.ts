const calculatePercentages = (correctAnswers: number, totalAnswers: number) => {
  return Math.floor((correctAnswers / totalAnswers) * 100);
};

export default calculatePercentages;
