// Components
import BoardItem from "./BoardItem";
import SearchPanel from "./SearchPanel";
import SpinOutlined from "components/LoadingOutlined";
import AddBoard from "./AddBoard";
import EditTaskModal from "./EditTaskModal";
import EditBoardModal from "./EditBoardModal";
import { FlexColumn } from "styled-components/FlexLayout";
import styled from "@emotion/styled";

// Hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import { useBoardParam, useBoardsCURD } from "page-hooks/boards";
import { useProjectCURD } from "page-hooks/project";
import { useTaskCURD } from "page-hooks/task";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";

import { Project } from "types/project";

const Boards = () => {
  useDocumentTitle("任务看板");

  const [queryParam, cleanedQueryParam, setQueryParam] = useBoardParam();
  const { useGetItem: useGetBoards } = useBoardsCURD();
  const { useGetItem: useGetTasks } = useTaskCURD();
  const projectId = useProjectIdInParam();

  // 获取 project
  const { useGetItemById: useGetProjectById } = useProjectCURD();
  const { data: currentProjectData, isLoading: getProjectLoading } =
    useGetProjectById<Project>(["project", { id: projectId }], projectId);
  // 获取项目中的看板
  const { data: boardData, isLoading: getBoardLoading } = useGetBoards({
    projectId: projectId,
  });
  // 获取所有看板的任务，在前端 filter
  const { data: tasks, isLoading: getTasksLoading } = useGetTasks({
    projectId: projectId,
    ...cleanedQueryParam,
  });
  // loading flag
  const isLoading = getProjectLoading || getBoardLoading || getTasksLoading;

  return (
    <FlexColumn className="w-100">
      <h1>
        {currentProjectData
          ? `${currentProjectData.name} · 任务看板`
          : "任务看板"}
        <SpinOutlined
          spinning={isLoading}
          size="large"
          style={{ marginLeft: "1rem" }}
        />
      </h1>
      <SearchPanel queryParam={queryParam} setQueryParam={setQueryParam} />
      <Container>
        {boardData?.map((board) => (
          <BoardItem
            key={board.id}
            board={board}
            tasks={tasks?.filter((task) => task.kanbanId === board.id) || []}
          />
        ))}
        <AddBoard />
        <EditTaskModal />
        <EditBoardModal />
      </Container>
    </FlexColumn>
  );
};

export default Boards;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow-x: scroll;
`;
