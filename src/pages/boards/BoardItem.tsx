// Components
import styled from "@emotion/styled";
import { Card, Tag } from "antd";
import AddTask from "./AddTask";
// Hooks
import { useGetTaskTypes } from "page-hooks/taskType";
// Types
import { Board } from "types/boards";
import { Task } from "types/task";

interface BoardItemProps {
  board: Board;
  tasks: Task[];
}

const TaskTypeIcon = ({ id }: { id: Task["id"] }) => {
  const { data: taskTypes } = useGetTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return <Tag color="#FAAD14">进度不详</Tag>;
  return name === "task" ? (
    <Tag color="#108ee9">进行中</Tag>
  ) : (
    <Tag color="#f50">有问题</Tag>
  );
};

const BoardItem = ({ board, tasks }: BoardItemProps) => {
  return (
    <Container>
      <h3>{board.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.7rem" }} key={task.id}>
            <p>{task.name}</p>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <AddTask boardId={board.id} />
      </TaskContainer>
    </Container>
  );
};

export default BoardItem;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 1rem 1.75rem;

  :not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
