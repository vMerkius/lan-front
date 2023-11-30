export interface ISentence {
  id: number;
  content: string;
  moduleId: number;
}

export type ISentenceCreation = Omit<ISentence, "id">;
