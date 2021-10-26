// Components
import SubmitInput from "./SubmitInput";
import { Container as BoardContainer } from "./BoardItem";
import { Typography } from "antd";
// Hooks
import { useState } from "react";
import { useBoardsCURD } from "page-hooks/boards";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";

const AddBoard = () => {
  const { useAddItem: useAddBoard } = useBoardsCURD();
  const { mutateAsync: addBoard, isLoading } = useAddBoard();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const projectId = useProjectIdInParam();

  const onSearch = () => {
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
    <BoardContainer>
      <SubmitInput
        allowClear
        placeholder="新建任务看板"
        loading={isLoading}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onSearch={onSearch}
      />
      <Typography.Text type="danger" style={{ fontSize: "13px" }}>
        {error}
      </Typography.Text>
    </BoardContainer>
  );
};

export default AddBoard;
