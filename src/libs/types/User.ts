export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password?: string;
}

export interface IUserInput {
  fullName: string;
  email: string;
  confirmEmail: string;
  password: string;
  repeatPassword: string;
}

export interface IUserContext {
  user: IUser;
  token: string;
}
