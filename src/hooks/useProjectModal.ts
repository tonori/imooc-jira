import { useHistory, useLocation } from "react-router";

const useProjectModal = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const PATH = "/projects/create-project";
  const prevPATH = "/projects";

  const openModal = () => {
    history.push(PATH);
  };
  const closeModal = () => {
    history.push(prevPATH);
  };

  return {
    projectModalState: pathname === PATH,
    openModal,
    closeModal,
  };
};

export default useProjectModal;
