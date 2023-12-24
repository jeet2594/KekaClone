import { useContext } from "react";
import { UserContext } from "../UserContext";

export const useAppCntext = () => {
  const UserContext1 = useContext(UserContext);
  const { user, isOnline } = UserContext1;
  return { user, isOnline };
};
