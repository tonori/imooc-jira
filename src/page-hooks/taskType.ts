import { useQuery } from "react-query";
import useHttp from "hooks/useHttp";
import { TaskType } from "types/taskType";

export const useGetTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () =>
    client("/taskTypes", { method: "GET" })
  );
};
