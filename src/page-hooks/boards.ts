import { useQuery } from "react-query";
import useHttp from "hooks/useHttp";
import { Board } from "types/boards";

export const useGetBoards = (param?: Partial<Board>) => {
  const client = useHttp();
  return useQuery<Board[]>(["boards", param], () =>
    client("/kanbans", { method: "GET", data: param })
  );
};
