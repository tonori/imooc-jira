import { useQuery } from "react-query";
import useHttp from "hooks/useHttp";
import { User } from "types/user";

export const useGetProjectUsers = () => {
  const client = useHttp();
  return useQuery<User[]>("projectUsers", () =>
    client("/users", { method: "GET" })
  );
};
