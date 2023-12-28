export interface IUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  dateOfBirth: Date;
  gender: string;
  country: string;
  imageUrl: string;
  isAdmin: boolean;
}

export type IUserCreation = Omit<IUser, "id">;
