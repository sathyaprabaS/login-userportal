export interface ILoginFormInputs {
  email: string;
  password: string;
}
export interface ISignUp {
  phoneNumber: string | undefined;
  password: string;
  name: string;
  email?: string;
  confirmPassword: string;
  role?: string;
}

export interface IUser {
  userId: string | null;
  email: string | null;
  name: string | null;
  iat?: number;
}

export interface ISignUp {
  phoneNumber: string | undefined;
  password: string;
  name: string;
  email?: string;
  confirmPassword: string;
  role?: string;
}

export interface ILoginResponse {
  data: IUser | null;
  message: string;
  status?: boolean;
}
export interface IAuthContext {
  user: IUser | null;
  updateUserData: (user: IUser | null) => void;
}



