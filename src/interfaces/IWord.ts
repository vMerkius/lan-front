export interface IWord {
  id: number;
  originalWord: string;
  translatedWord: string;
  flashcardId: number;
}

export type IWordCreation = Omit<IWord, "id">;
