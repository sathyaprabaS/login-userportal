import  { ReactNode, useContext } from "react";
import { useState, createContext } from "react";
import { IAuthContext, IUser } from "../interface/types";

const AuthContext = createContext<IAuthContext>({
  user: {
    userId: null,
    email: null,
    name: null,
  },
  updateUserData: () => {},
});
interface AuthProviderProps {
  children: ReactNode; // Explicitly declare the type for the children prop
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setuser] = useState<IUser | null>(null);

  const updateUserData = (user: IUser | null) => {
    if (user) {
      setuser({
        ...user,
      });
    } else {
      setuser(null);
    }
  };

  const contextValue: IAuthContext = {
    user,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext<IAuthContext>(AuthContext);
  return context;
}

export default AuthProvider;
