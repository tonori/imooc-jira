// Components
import BoardItem from "./BoardItem";
import SearchPanel from "./SearchPanel";
import SpinOutlined from "components/LoadingOutlined";
import AddBoard from "./AddBoard";
import { FlexColumn } from "styled-components/FlexLayout";
import styled from "@emotion/styled";

// Hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import { useBoardParam, useGetBoards } from "page-hooks/boards";
import { useGetSingleProject } from "page-hooks/project";
import { useGetTasks } from "page-hooks/task";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";

const Boards = () => {
  useDocumentTitle("任务看板");

  const [queryParam, cleanedQueryParam, setQueryParam] = useBoardParam();
  const projectId = useProjectIdInParam();

  // 获取 project
  const { data: currentProjectData, isLoading: getProjectLoading } =
    useGetSingleProject(projectId);
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
