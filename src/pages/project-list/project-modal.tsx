// Components
import { Form, Modal, ModalProps } from "antd";
import CreateProjectForm from "./createProjectForm";
import EditProjectForm from "./editProjectForm";

// Hooks
import { useMemo, useState } from "react";
import useControlModal from "hooks/useControlModal";

const ProjectModal = () => {
  const path = {
    create: "/projects/create-project",
    edit: "/projects/:projectId/edit",
  };

  const actionModalTitle: { [key: string]: string } = {
    create: "新建项目",
    edit: "编辑项目",
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalForm] = Form.useForm();
  const { visible, action, closeModal } = useControlModal("/projects", path);

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
    const props = {
      form: modalForm,
      setConfirmLoading,
      closeModal,
    };

    switch (action) {
      case "create":
        return <CreateProjectForm {...props} />;
      case "edit":
        return <EditProjectForm {...props} />;
    }
  }, [closeModal, modalForm, action]);

  return <Modal {...modalProps}>{activeComponent}</Modal>;
};
export default ProjectModal;
