// Components
import SubmitInput from "./SubmitInput";
import { Container as BoardContainer } from "./BoardItem";
import { Typography } from "antd";
// Hooks
import { useState } from "react";
import { useBoardCURD } from "page-hooks/boards";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import useHasQueryParams from "hooks/useHasQueryParams";

const AddBoard = () => {
  const { useAddItem: useAddBoard } = useBoardCURD();
  const { mutateAsync: addBoard, isLoading } = useAddBoard();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const projectId = useProjectIdInParam();
  const hasQueryParam = useHasQueryParams();

  const onSubmit = () => {
    if (inputValue === "") {
      setError("任务看板名称不能为空");
    } else {
      if (error !== "") setError("");
      addBoard({ name: inputValue, projectId }).then(() => {
        setInputValue("");
      });
    }
  };

  return (
    <BoardContainer style={{ display: hasQueryParam ? "none" : "block" }}>
      <SubmitInput
        placeholder="新建任务看板"
        loading={isLoading}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onSubmit={onSubmit}
      />
      <Typography.Text type="danger" style={{ fontSize: "13px" }}>
        {error}
      </Typography.Text>
    </BoardContainer>
  );
};

export default AddBoard;
