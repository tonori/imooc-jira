// Components
import BoardItem from "./BoardItem";
import styled from "@emotion/styled";

// Hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import { useGetBoards } from "page-hooks/boards";
import { useGetSingleProject } from "page-hooks/project";
import { useRouteMatch } from "react-router-dom";

const Boards = () => {
  useDocumentTitle("任务看板");
  const { params } = useRouteMatch<{ projectId: string }>();
  const projectId = Number(params.projectId);
  const { data: currentProjectData } = useGetSingleProject(projectId);
  const { data: boardData } = useGetBoards({ projectId: projectId });

  return (
    <div>
      <h1>{currentProjectData?.name} · 任务看板</h1>
      <BoardContainer>
        {boardData?.map((board) => (
          <BoardItem board={board} key={board.id} />
        ))}
      </BoardContainer>
    </div>
  );
};

export default Boards;

const BoardContainer = styled.div`
  display: flex;
  overflow: hidden;
`;
