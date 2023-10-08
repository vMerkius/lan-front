export interface ISubject {
  id: number;
  name: string;
  desription: string;
  imageUrl: string;
  lessonId: number;
}
export type ISubjectCreation = Omit<ISubject, "id">;
