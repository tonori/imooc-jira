import { useRouteMatch } from "react-router-dom";

export const useProjectIdInParam = () => {
  const { params } = useRouteMatch<{ projectId: string }>();
  return Number(params.projectId) || undefined;
};
