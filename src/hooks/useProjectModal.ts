import { useMemo, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";

const useProjectModal = () => {
  const PATH = useRef<{ [key: string]: string }>({
    create: "/projects/create-project",
    edit: "/projects/:projectId/edit",
  });

  const { path: pathname } = useRouteMatch();
  const history = useHistory();

  const closeModal = () => {
    history.push("/projects");
  };

  const visible = useMemo(
    () => Object.values(PATH.current).includes(pathname),
    [PATH, pathname]
  );
  const action = useMemo(
    () => Object.keys(PATH.current).find((k) => PATH.current[k] === pathname),
    [PATH, pathname]
  );

  return {
    visible,
    action,
    closeModal,
  };
};

export default useProjectModal;
