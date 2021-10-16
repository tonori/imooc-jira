// Components
import { Form, Modal, ModalProps } from "antd";
import CreateProjectForm from "./createProjectForm";
import EditProjectForm from "./editProjectForm";

// Hooks
import { useMemo, useState } from "react";
import useProjectModal from "hooks/useProjectModal";

const ProjectModal = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalForm] = Form.useForm();
  const { visible, action, closeModal } = useProjectModal();

  const actionModalTitle: { [key: string]: string } = {
    create: "新建项目",
    edit: "编辑项目",
  };

  const onOk = () => {
    modalForm.submit();
    setConfirmLoading(true);
  };

  const modalProps: ModalProps = {
    destroyOnClose: true,
    visible,
    onOk: onOk,
    onCancel: closeModal,
    confirmLoading,
    okText: "确定",
    cancelText: "退出",
    title: actionModalTitle[action || "create"],
    afterClose() {
      setConfirmLoading(false);
    },
  };

  const activeComponent = useMemo(() => {
    switch (action) {
      case "create":
        return (
          <CreateProjectForm
            form={modalForm}
            setConfirmLoading={setConfirmLoading}
          />
        );
      case "edit":
        return (
          <EditProjectForm
            form={modalForm}
            setConfirmLoading={setConfirmLoading}
          />
        );
    }
  }, [modalForm, action]);

  return <Modal {...modalProps}>{activeComponent}</Modal>;
};
export default ProjectModal;
