import { useEffect } from "react";
import { User } from "./FormSubmission";
import axios from "axios";
import { useQuery } from "react-query";
import * as userLocalStorage from "./userLocalSotrage";

async function getUser(user: User | null | undefined): Promise<User | null> {
  if (!user) return null;
  const response = await axios.get(
    `http://localhost:8080/auth/user/${user.email}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  if (!response.status) throw new Error("Failed on get user request");

  return await response.data;
}

export const useAuth = () => {
  const { data: user } = useQuery<User | null>(
    "user",
    async (): Promise<User | null> => getUser(user),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser(),
      onError: () => {
        userLocalStorage.removeUser();
      },
    }
  );

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
};
