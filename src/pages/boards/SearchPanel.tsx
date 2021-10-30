// Components
import { Button, Input } from "antd";
import styled from "@emotion/styled";
import ProjectUserSelect from "components/projectUserSelect";
import TaskTypeSelect from "components/TaskTypeSelect";
// Hooks
import { BoardParamProps } from "page-hooks/boards";
// Utils
import { selectValueToNumber } from "utils";

interface SearchPanelProps {
  taskParams: BoardParamProps;
  setTaskQueryParams: (param: SearchPanelProps["taskParams"]) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;

  *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const SearchPanel = ({ taskParams, setTaskQueryParams }: SearchPanelProps) => {
  const reset = () => {
    setTaskQueryParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
    });
  };
  return (
    <Container>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={taskParams.name}
        onChange={(e) =>
          setTaskQueryParams({ ...taskParams, name: e.target.value })
        }
      />

      <ProjectUserSelect
        value={taskParams.processorId}
        onChange={(value) =>
          setTaskQueryParams({
            ...taskParams,
            processorId: selectValueToNumber(value),
          })
        }
      />
      <TaskTypeSelect
        value={taskParams.typeId || undefined}
        onChange={(value) =>
          setTaskQueryParams({
            ...taskParams,
            typeId: selectValueToNumber(value),
          })
        }
      />
      <Button onClick={reset}>重置</Button>
    </Container>
  );
};

export default SearchPanel;
