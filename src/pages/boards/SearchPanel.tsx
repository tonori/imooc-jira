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
  queryParam: BoardParamProps;
  setQueryParam: (param: SearchPanelProps["queryParam"]) => void;
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

const SearchPanel = ({ queryParam, setQueryParam }: SearchPanelProps) => {
  const reset = () => {
    setQueryParam({
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
        value={queryParam.name}
        onChange={(e) => setQueryParam({ ...queryParam, name: e.target.value })}
      />

      <ProjectUserSelect
        value={queryParam.processorId}
        onChange={(value) =>
          setQueryParam({
            ...queryParam,
            processorId: selectValueToNumber(value),
          })
        }
      />
      <TaskTypeSelect
        value={queryParam.typeId || undefined}
        onChange={(value) =>
          setQueryParam({ ...queryParam, typeId: selectValueToNumber(value) })
        }
      />
      <Button onClick={reset}>重置</Button>
    </Container>
  );
};

export default SearchPanel;
