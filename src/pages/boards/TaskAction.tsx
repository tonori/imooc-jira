import { Link } from "react-router-dom";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useHistory } from "react-router";
import { useTaskCURD } from "page-hooks/task";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import { deleteTaskConfirm } from "utils/createDeleteConfirm";
import { Task } from "types/task";

const TaskActionContainer = styled.div`
  *:not(:last-child) {
    margin-right: 0.7rem;
  }
`;

const TaskAction = ({ task }: { task: Task }) => {
  const history = useHistory();
  const projectId = useProjectIdInParam();
  const { useDeleteItem } = useTaskCURD();

  const { mutate, isLoading } = useDeleteItem();

  const deleteButtonOnClick = () => {
    const onOk = () => {
      mutate(task.id);
      onCancel();
    };
    const onCancel = () => history.replace(`/projects/${projectId}/boards`);

    history.push(`/projects/${projectId}/task/${task.id}/delete`);
    deleteTaskConfirm(task.name, isLoading, onOk, onCancel);
  };

  return (
    <TaskActionContainer>
      <Link to={`/projects/${projectId}/task/${task.id}/edit`}>
        <Button size="small" icon={<EditOutlined />} />
      </Link>
      <Link to={`/projects/${projectId}/task/${task.id}/delete`}>
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={deleteButtonOnClick}
        />
      </Link>
    </TaskActionContainer>
  );
};

export default TaskAction;
