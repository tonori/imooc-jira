import { useQuery } from "react-query";
import useHttp from "hooks/useHttp";
import { Task } from "types/task";

export const useGetTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["task", param], () =>
    client("/tasks", { method: "GET", data: param })
  );
};
