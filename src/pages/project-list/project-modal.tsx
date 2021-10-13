// Components
import { Modal } from "antd";

// Hooks
import useProjectModal from "hooks/useProjectModal";

const ProjectModal = () => {
  const { projectModalState, closeModal } = useProjectModal();
  return (
    <Modal
      destroyOnClose
      visible={projectModalState}
      onCancel={closeModal}
      okText="确定"
      cancelText="推出"
    >
      <span>Project Modal</span>
    </Modal>
  );
};

export default ProjectModal;
