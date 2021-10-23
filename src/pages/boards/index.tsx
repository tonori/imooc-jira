// Components
import BoardItem from "./BoardItem";
import SearchPanel from "./SearchPanel";
import SpinOutlined from "components/LoadingOutlined";
import { FlexColumn } from "styled-components/FlexLayout";
import styled from "@emotion/styled";

// Hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import { useBoardParam, useGetBoards } from "page-hooks/boards";
import { useGetSingleProject } from "page-hooks/project";
import { useRouteMatch } from "react-router-dom";
import { useGetTasks } from "page-hooks/task";

const Boards = () => {
  useDocumentTitle("任务看板");
  const { params } = useRouteMatch<{ projectId: string }>();
  const [queryParam, cleanedQueryParam, setQueryParam] = useBoardParam();
  const projectId = Number(params.projectId);
  const { data: currentProjectData, isLoading: getProjectLoading } =
    useGetSingleProject(projectId);
  const { data: boardData, isLoading: getBoardLoading } = useGetBoards({
    projectId: projectId,
  });
  const { data: tasks, isLoading: getTasksLoading } = useGetTasks({
    projectId: projectId,
    ...cleanedQueryParam,
  });
  const isLoading = getProjectLoading || getBoardLoading || getTasksLoading;

  return (
    <FlexColumn>
      <h1>
        {currentProjectData
          ? `${currentProjectData.name} · 任务看板`
          : "任务看板"}
        <SpinOutlined
          delay={200}
          spinning={isLoading}
          size="large"
          style={{ marginLeft: "1rem" }}
        />
      </h1>
      <SearchPanel queryParam={queryParam} setQueryParam={setQueryParam} />
      <BoardContainer>
        {boardData?.map((board) => (
          <BoardItem
            key={board.id}
            boardName={board.name}
            tasks={tasks?.filter((task) => task.kanbanId === board.id) || []}
          />
        ))}
      </BoardContainer>
    </FlexColumn>
  );
};

export default Boards;

const BoardContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
`;
