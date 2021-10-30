import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/DragAndDrop";
import BoardItem from "./BoardItem";
import styled from "@emotion/styled";
import { useCallback, useMemo } from "react";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import { useBoardCURD, useReorderBoard } from "page-hooks/boards";
import { useReorderTask, useTaskCURD } from "page-hooks/task";
import { Task } from "types/task";

const DragItemContainer = styled(DropChild)`
  display: flex;
  flex-direction: row;
`;

const useDragEnd = ({
  cleanedTaskParams,
}: {
  cleanedTaskParams: Partial<Task>;
}) => {
  const { useGetItem: getBoard } = useBoardCURD();
  const { useGetItem: getTask } = useTaskCURD();
  const projectId = useProjectIdInParam();
  const { data: boardData } = getBoard({ projectId });
  const { data: taskData } = getTask(cleanedTaskParams);
  const { mutate: reorderBoard } = useReorderBoard();
  const { mutate: reorderTask } = useReorderTask();

  const hasQueryParam = useMemo(
    () => Boolean(Object.keys(cleanedTaskParams).length),
    [cleanedTaskParams]
  );

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination || hasQueryParam) return;

      // 排序看板
      if (type === "COLUMN") {
        // 被 drag 的元素 index
        const fromId = boardData?.[source.index].id;
        // drop 的位置的 index
        const toId = boardData?.[destination.index].id;

        if (!fromId || !toId || fromId === toId) return;

        const type = destination.index > source.index ? "after" : "before";

        reorderBoard({ fromId, referenceId: toId, type });
      }

      // 排序任务
      if (type === "ROW") {
        // 发生拖拽事件的容器 ID
        const fromBoardId = Number(source.droppableId.split("-")[1]);
        // drop 时元素所处的容器 ID
        const toBoardId = Number(destination.droppableId.split("-")[1]);

        // 从所有看板中筛选出来源的看板，再从中读取到是哪一个 task 被 drag 了
        const fromTask = taskData?.filter(
          (task) => task.kanbanId === fromBoardId
        )[source.index];
        // drop 的位置的 index
        const toTask = taskData?.filter((task) => task.kanbanId === toBoardId)[
          destination.index
        ];

        if (!fromTask || fromTask.id === toTask?.id) return;

        reorderTask({
          fromId: fromTask.id,
          referenceId: toTask?.id || destination.index,
          fromKanbanId: fromBoardId,
          toKanbanId: toBoardId,
          type:
            fromBoardId === toBoardId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [boardData, hasQueryParam, reorderBoard, reorderTask, taskData]
  );
};

const DragDropBoards = ({
  cleanedTaskParams,
}: {
  cleanedTaskParams: Partial<Task>;
}) => {
  const projectId = useProjectIdInParam();
  const { useGetItem: getBoards } = useBoardCURD();
  const { useGetItem: getTasks } = useTaskCURD(cleanedTaskParams);
  const { data: boardsData } = getBoards({ projectId });
  const { data: tasksData } = getTasks({ projectId, ...cleanedTaskParams });
  const onDragEnd = useDragEnd({ cleanedTaskParams });
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Drop droppableId="boardsDrop" type="COLUMN" direction="horizontal">
        <DragItemContainer>
          {boardsData?.map((board, index) => {
            const tasks =
              tasksData?.filter((task) => task.kanbanId === board.id) || [];
            return (
              <Drag
                key={board.id}
                draggableId={`board-${board.id}`}
                index={index}
              >
                <BoardItem board={board} tasks={tasks} />
              </Drag>
            );
          })}
        </DragItemContainer>
      </Drop>
    </DragDropContext>
  );
};

export default DragDropBoards;
