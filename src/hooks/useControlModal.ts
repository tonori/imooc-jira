import { useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";

const useControlModal = (
  startPoint: string,
  path: { [key: string]: string }
) => {
  const { path: pathname } = useRouteMatch();
  const history = useHistory();

  const closeModal = () => {
    history.push(startPoint);
  };

  const visible = useMemo(
    () => Object.values(path).includes(pathname),
    [path, pathname]
  );
  const action = useMemo(
    () => Object.keys(path).find((k) => path[k] === pathname),
    [path, pathname]
  );

  return {
    visible,
    action,
    closeModal,
  };
};

export default useControlModal;
