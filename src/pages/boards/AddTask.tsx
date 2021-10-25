import SubmitInput from "./SubmitInput";
import { Button } from "antd";

import { useMemo, useState } from "react";
import { useAddTask } from "page-hooks/task";
import { EnterOutlined, RollbackOutlined } from "@ant-design/icons";

const AddTask = ({ boardId }: { boardId: number }) => {
  const [state, setState] = useState<"button" | "input">("button");
  const [inputValue, setInputValue] = useState("");

  const { mutateAsync: addTask, isLoading } = useAddTask(boardId);

  const enterButton = useMemo(() => {
    if (isLoading) {
      return "";
    } else if (inputValue === "" || !inputValue) {
      return <RollbackOutlined />;
    } else {
      return <EnterOutlined />;
    }
  }, [inputValue, isLoading]);

  const onSearch = (value: string) => {
    // 在不输入内容时点击按钮则切换回按钮形态
    if (value === "") {
      setState("button");
    } else {
      // 添加任务后清空 Input
      addTask(value).then(() => {
        setInputValue("");
      });
    }
  };

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
      enterButton={enterButton}
      onSearch={onSearch}
    />
  );

  return state === "button" ? addTaskButton : addTaskInput;
};

export default AddTask;
