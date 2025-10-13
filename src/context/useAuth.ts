import { useContext } from "react";
import AuthContext, { AuthContextValue } from "./AuthContext";

export const useAuth = () => {
  const c = useContext(AuthContext) as AuthContextValue | undefined;
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};

export default useAuth;
