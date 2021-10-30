// Components
import TaskItem from "./TaskItem";
import BoardAction from "./BoardAction";
import AddTask from "./AddTask";
import styled from "@emotion/styled";
import { FlexBetween } from "styled-components/FlexLayout";
import { Drag, Drop, DropChild } from "components/DragAndDrop";

// Types
import { Board } from "types/boards";
import { Task } from "types/task";

import { forwardRef } from "react";

export interface BoardItemProps {
  board: Board;
  tasks: Task[];
}

const BoardItem = forwardRef<HTMLDivElement, BoardItemProps>(
  ({ board, tasks, ...props }, ref) => (
    <Container ref={ref} {...props}>
      <FlexBetween>
        <h3>{board.name}</h3>
        <BoardAction board={board} />
      </FlexBetween>
      <TaskContainer>
        <Drop
          droppableId={`boardItem-${board.id}`}
          type="ROW"
          direction="vertical"
        >
          <DropChild style={{ minHeight: "5px" }}>
            {tasks.map((task, index) => (
              <Drag key={task.id} draggableId={`task-${task.id}`} index={index}>
                <div>
                  <TaskItem task={task} key={task.id} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <AddTask boardId={board.id} />
      </TaskContainer>
    </Container>
  )
);

export default BoardItem;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 1rem 1.75rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
