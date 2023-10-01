export interface ISubject {
  id: number;
  name: string;
  desription: string;
  lessonId: number;
}
export type ILessonCreation = Omit<ISubject, "id">;
