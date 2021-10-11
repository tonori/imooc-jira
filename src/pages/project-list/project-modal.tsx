// Components
import { Modal } from "antd";

// Hooks
import { useSelector, useDispatch } from "react-redux";

// redux action
import {
  selectModalOpen,
  projectListActions,
} from "pages/project-list/project-list.slice";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector(selectModalOpen);

  const closeModal = () => {
    dispatch(projectListActions.closeModal());
  };

  return (
    <Modal destroyOnClose visible={modalOpen} onCancel={closeModal}>
      <span>Project Modal</span>
    </Modal>
  );
};

export default ProjectModal;
