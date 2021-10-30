import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useTaskGroupCURD } from "page-hooks/taskGroup";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import { Epic } from "types/epic";
import { deleteTaskGroupConfirm } from "utils/createDeleteConfirm";

const DeleteTaskGroupButton = ({ taskGroup }: { taskGroup: Epic }) => {
  const projectId = useProjectIdInParam();
  const history = useHistory();
  const { useDeleteItem } = useTaskGroupCURD();
  const { mutate } = useDeleteItem();

  const onClick = () => {
    const onOk = () => {
      mutate(taskGroup.id);
      onCancel();
    };
    const onCancel = () => history.replace(`/projects/${projectId}/task-group`);

    history.push(`/projects/${projectId}/task-group/${taskGroup.id}/delete`);
    deleteTaskGroupConfirm(taskGroup.name, onOk, onCancel);
  };

  return (
    <Button danger size="small" icon={<DeleteOutlined />} onClick={onClick} />
  );
};

export default DeleteTaskGroupButton;
