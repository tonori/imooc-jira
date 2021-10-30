import { Input, Modal, ModalProps } from "antd";
import { useState } from "react";
import { useTaskGroupCURD } from "page-hooks/taskGroup";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import { useHistory, useRouteMatch } from "react-router";

const AddTaskGroupModal = () => {
  const history = useHistory();
  const { params } = useRouteMatch<{ 0: string }>();
  const action = params["0"];
  const projectId = useProjectIdInParam();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { useAddItem } = useTaskGroupCURD();
  const { mutate } = useAddItem();

  const onOk = () => {
    if (value === "" || !value) {
      setError("任务组名称不能为空");
      return;
    }
    mutate({ name: value, projectId });
    onCancel();
  };
  const onCancel = () => history.replace(`/projects/${projectId}/task-group`);

  const modalProps: ModalProps = {
    title: "新建任务组",
    okText: "确认",
    cancelText: "取消",
    destroyOnClose: true,
    visible: action === "add-task-group",
    onOk,
    onCancel,
  };

  return (
    <Modal {...modalProps}>
      <Input
        placeholder="请输入任务组名称"
        allowClear
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className="color-danger" style={{ fontSize: "13px" }}>
        {error}
      </span>
    </Modal>
  );
};

export default AddTaskGroupModal;
