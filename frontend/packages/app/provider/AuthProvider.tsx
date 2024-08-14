import { useAuthListener } from "app/entities/currentUser/model/currentUserAtom";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useAuthListener();
  return <>{children}</>;
};
