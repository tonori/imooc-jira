// Components
import SubmitInput from "./SubmitInput";
import { Container as BoardContainer } from "./BoardItem";
import { Typography } from "antd";
// Hooks
import { useAddBoard } from "page-hooks/boards";
import { useState } from "react";

const AddBoard = () => {
  const { mutateAsync: addBoard, isLoading } = useAddBoard();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const onSearch = () => {
    if (inputValue === "") {
      setError("任务看板名称不能为空");
    } else {
      if (error !== "") setError("");
      addBoard(inputValue).then(() => {
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
