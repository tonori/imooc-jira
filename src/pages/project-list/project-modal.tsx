// Components
import { Modal, ModalProps } from "antd";

// Types
import { Dispatch, SetStateAction } from "react";

interface ProjectModalProps extends ModalProps {
  projectModalOpen: boolean;
  setProjectModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ProjectModal = (props: ProjectModalProps) => {
  const closeModal = () => {
    props.setProjectModalOpen(() => false);
  };
  return (
    <Modal
      destroyOnClose
      visible={props.projectModalOpen}
      onCancel={closeModal}
    >
      <span>Project Modal</span>
    </Modal>
  );
};

export default ProjectModal;
