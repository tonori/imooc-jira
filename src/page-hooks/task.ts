import { useMutation, useQuery, useQueryClient } from "react-query";
import useHttp from "hooks/useHttp";
import { Task } from "types/task";
import { useProjectIdInParam } from "./useProjectIdInParam";

const useQueryKey = () => {
  const projectId = useProjectIdInParam();
  return ["tasks", { projectId }];
};

export const useGetTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("/tasks", { method: "GET", data: param })
  );
};

export const useGetTaskById = (param: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task>(["task", param], () =>
    client("/tasks", { method: "GET", data: param })
  );
};

export const useAddTask = (boardId: number) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const projectId = useProjectIdInParam();
  const queryKey = useQueryKey();

  return useMutation(
    (taskName: string) =>
      client("/tasks", {
        method: "POST",
        data: {
          projectId,
          name: taskName,
          kanbanId: boardId,
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
};
