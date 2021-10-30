import { useProjectIdInParam } from "./useProjectIdInParam";
import useCURD from "hooks/useCURD";
import { Epic } from "../types/epic";

export const useTaskGroupCURD = () => {
  const projectId = useProjectIdInParam();
  const queryKey = ["epic", { projectId }];
  return useCURD<Epic>({ queryKey, finalPoint: "/epics" });
};
