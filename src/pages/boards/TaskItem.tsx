import { Card, Tag } from "antd";
import styled from "@emotion/styled";
import TaskAction from "./TaskAction";
import { useGetTaskTypes } from "page-hooks/taskType";
import { Task } from "types/task";

const TaskItem = ({ task }: { task: Task }) => (
  <Card style={{ marginBottom: "0.7rem" }}>
    <TaskInfo>
      <p style={{ marginBottom: 0 }}>{task.name}</p>
      <TaskTypeIcon id={task.typeId} />
    </TaskInfo>
    <TaskAction task={task} />
  </Card>
);
export default TaskItem;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TaskTypeIcon = ({ id }: { id: Task["id"] }) => {
  const { data: taskTypes } = useGetTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return <Tag color="#FAAD14">Unknown</Tag>;
  return name === "task" ? (
    <Tag color="#108ee9">Task</Tag>
  ) : (
    <Tag color="#f50">BUG</Tag>
  );
};
