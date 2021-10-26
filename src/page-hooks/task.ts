import { Task } from "types/task";
import { useProjectIdInParam } from "./useProjectIdInParam";
import useCURD from "hooks/useCURD";

const useQueryKey = () => {
  const projectId = useProjectIdInParam();
  return ["tasks", { projectId }];
};

export const useTaskCURD = () => {
  const queryKey = useQueryKey();
  return useCURD<Task>({ queryKey, finalPoint: "/tasks" });
};
