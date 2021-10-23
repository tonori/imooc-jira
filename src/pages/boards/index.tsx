// Components
import BoardItem from "./BoardItem";
import SearchPanel from "./SearchPanel";
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
  const { data: currentProjectData } = useGetSingleProject(projectId);
  const { data: boardData } = useGetBoards({ projectId: projectId });
  const { data: tasks } = useGetTasks({
    projectId: projectId,
    ...cleanedQueryParam,
  });

  return (
    <FlexColumn>
      <h1>{currentProjectData?.name} · 任务看板</h1>
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
