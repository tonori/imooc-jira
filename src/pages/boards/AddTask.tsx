import { Button } from "antd";
import { useState } from "react";
import SubmitInput from "./SubmitInput";

import { useAddTask } from "page-hooks/task";

const AddTask = ({ boardId }: { boardId: number }) => {
  const [state, setState] = useState<"button" | "input">("button");
  const [inputValue, setInputValue] = useState("");

  const { mutateAsync: addTask, isLoading } = useAddTask(boardId);
  const resetValue = () => setInputValue("");

  const addTaskButton = (
    <Button
      onClick={() => {
        setState("input");
      }}
      style={{ margin: "0.7rem 0" }}
    >
      + 添加任务
    </Button>
  );

  const addTaskInput = (
    <SubmitInput
      placeholder="请输入任务名称"
      loading={isLoading}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onSearch={(value) => {
        value !== "" &&
          addTask(value).then(() => {
            resetValue();
          });
      }}
    />
  );

  return state === "button" ? addTaskButton : addTaskInput;
};

export default AddTask;
