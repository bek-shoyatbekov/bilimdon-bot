import Joi from "joi";

const quizSchema = Joi.object().keys({
  question: Joi.string().max(300).required(),
  answers: Joi.string().required(),
  correct: Joi.number().required(),
  explanation: Joi.string(),
  point: Joi.number().required(),
});
const validateQuiz = async (quiz: object) => {
  return quizSchema.validateAsync(quiz);
};

export default validateQuiz;
