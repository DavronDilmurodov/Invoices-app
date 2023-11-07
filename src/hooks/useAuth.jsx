import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  return [token, setToken];
};
