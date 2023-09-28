export interface IQuestion {
  id: number;
  description: string;
  correctAnswer: string;
  quizId: number;
}
export type IQuestionCreation = Omit<IQuestion, "id">;
