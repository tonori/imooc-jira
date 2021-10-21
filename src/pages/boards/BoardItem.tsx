// Components
import styled from "@emotion/styled";
import { Button, Card, Tag } from "antd";

// Hooks
import { useGetTasks } from "page-hooks/task";
import { useGetTaskTypes } from "page-hooks/taskType";
// Types
import { Board } from "types/boards";
import { Task } from "types/task";

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

const BoardItem = ({ board }: { board: Board }) => {
  const { data: allTasks } = useGetTasks();
  const tasks = allTasks?.filter((task) => task.kanbanId === board.id) || [];
  return (
    <Container>
      <h3>{board.name}</h3>
      <TaskContainer>
        {tasks.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <p>{task.name}</p>
            <TaskTypeIcon id={task.id} />
          </Card>
        ))}
        <Button style={{ margin: "0.7rem 0" }}>+ 创建事务</Button>
      </TaskContainer>
    </Container>
  );
};

export default BoardItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 1rem;

  :not(:last-child) {
    margin-right: 2rem;
  }
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
