// Components
import AddTask from "./AddTask";
import styled from "@emotion/styled";
import { FlexBetween } from "styled-components/FlexLayout";
// Types
import { Board } from "types/boards";
import { Task } from "types/task";
import TaskItem from "./TaskItem";
import BoardAction from "./BoardAction";

interface BoardItemProps {
  board: Board;
  tasks: Task[];
}

const BoardItem = ({ board, tasks }: BoardItemProps) => {
  return (
    <Container>
      <FlexBetween>
        <h3>{board.name}</h3>
        <BoardAction board={board} />
      </FlexBetween>
      <TaskContainer>
        {tasks?.map((task) => (
          <TaskItem task={task} key={task.id} />
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
