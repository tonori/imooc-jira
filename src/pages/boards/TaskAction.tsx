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

const TaskAction = ({ taskId }: { taskId: number }) => {
  const history = useHistory();
  const projectId = useProjectIdInParam();
  const { useDeleteItem, useGetItemById } = useTaskCURD();

  const { data: task, isLoading: getLoading } = useGetItemById<Task>(
    ["task", { id: taskId }],
    taskId
  );
  const { mutateAsync, isLoading: mutateLoading } = useDeleteItem();
  const loading = getLoading || mutateLoading;

  const deleteButtonOnClick = () => {
    const onOk = () => mutateAsync(taskId);
    const onCancel = () => history.replace(`/projects/${projectId}/boards`);

    history.push(`/projects/${projectId}/task/${taskId}/delete`);
    deleteTaskConfirm(task?.name || "", loading, onOk, onCancel);
  };

  return (
    <TaskActionContainer>
      <Link to={`/projects/${projectId}/task/${taskId}/edit`}>
        <Button size="small" icon={<EditOutlined />} />
      </Link>
      <Link to={`/projects/${projectId}/task/${taskId}/delete`}>
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
