export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  country: string;
}

export type IUserCreation = Omit<IUser, "id">;
