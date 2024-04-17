
import { ILoginResponse, ILoginFormInputs, ISignUp } from "../interface/types";
import axios from "axios";

const login = async (credential: ILoginFormInputs) => {
  try {
    const response = await axios.post<ILoginResponse>(
      "http://localhost:3001/user/login",
      credential
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signUp = async (credential: ISignUp) => {
  try {
    const response = await axios.post<ILoginResponse>(
      "http://localhost:3001/user/signup",
      credential
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const logOut = async () => {
  try {
    const response = await axios.get<ILoginResponse>(
      "http://localhost:3001/user/logout"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login, signUp, logOut };