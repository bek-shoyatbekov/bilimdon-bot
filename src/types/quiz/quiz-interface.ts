export default interface IQuiz {
  text: string;
  image: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
  point: number;
}
