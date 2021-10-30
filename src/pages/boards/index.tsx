// Components
import SearchPanel from "./SearchPanel";
import AddBoard from "./AddBoard";
import EditTaskModal from "./EditTaskModal";
import EditBoardModal from "./EditBoardModal";
import DragDropBoards from "./DragDropBoards";
import { FlexColumn } from "styled-components/FlexLayout";
import styled from "@emotion/styled";

// Hooks
import { useMemo } from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useProjectCURD } from "page-hooks/project";
import { useTaskParam } from "page-hooks/task";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";

// Types
import { Project } from "types/project";
import SpinOutlined from "../../components/LoadingOutlined";

const Boards = () => {
  useDocumentTitle("任务看板");

  const [taskParams, cleanedTaskParams, setTaskQueryParams] = useTaskParam();

  // 获取 project
  const projectId = useProjectIdInParam();
  const { useGetItemById: getProjectById } = useProjectCURD();
  const { data: currentProjectData, isLoading: getProjectLoading } =
    getProjectById<Project>(["project", { id: projectId }], projectId);

  const boardTitle = useMemo(() => {
    if (getProjectLoading) return "任务看板";

    return `${currentProjectData?.name || "Unknown Project"} · 任务看板`;
  }, [getProjectLoading, currentProjectData]);

  return (
    <FlexColumn className="w-100">
      <h1>
        {boardTitle}
        <SpinOutlined
          spinning={getProjectLoading}
          delay={200}
          style={{ marginLeft: "1rem" }}
        />
      </h1>
      <SearchPanel
        taskParams={taskParams}
        setTaskQueryParams={setTaskQueryParams}
      />
      <Container>
        <DragDropBoards cleanedTaskParams={cleanedTaskParams} />
        <AddBoard />
      </Container>
      <EditTaskModal />
      <EditBoardModal />
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
