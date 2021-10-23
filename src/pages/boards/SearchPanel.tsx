import { Button, Input } from "antd";
import styled from "@emotion/styled";
import ProjectUserSelect from "components/projectUserSelect";
import TaskTypeSelect from "components/TaskTypeSelect";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router";
import { BoardParamProps } from "page-hooks/boards";

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
  const { path } = useRouteMatch();
  const history = useHistory();
  const reset = () => {
    history.replace(path);
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
        onChange={(value) =>
          setQueryParam({ ...queryParam, processorId: Number(value) })
        }
      />
      <TaskTypeSelect
        onChange={(value) =>
          setQueryParam({ ...queryParam, typeId: Number(value) })
        }
      />
      <Button onClick={reset}>重置</Button>
    </Container>
  );
};

export default SearchPanel;
