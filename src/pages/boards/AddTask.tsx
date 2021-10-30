import SubmitInput from "./SubmitInput";
import { Button } from "antd";
import { EnterOutlined, RollbackOutlined } from "@ant-design/icons";

import { cloneElement, useMemo, useState } from "react";
import { useTaskCURD } from "page-hooks/task";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import useHasQueryParams from "hooks/useHasQueryParams";

const AddTask = ({ boardId }: { boardId: number }) => {
  const [state, setState] = useState<"button" | "input">("button");
  const [inputValue, setInputValue] = useState("");

  const { useAddItem: useAddTask } = useTaskCURD();
  const { mutateAsync: addTask, isLoading } = useAddTask();
  const projectId = useProjectIdInParam();
  const hasQueryParam = useHasQueryParams();

  const enterButton = useMemo(() => {
    if (isLoading) {
      return <span />;
    } else if (inputValue === "" || !inputValue) {
      return <RollbackOutlined />;
    } else {
      return <EnterOutlined />;
    }
  }, [inputValue, isLoading]);

  const onSubmit = (value: string) => {
    // 在不输入内容时点击按钮则切换回按钮形态
    if (value === "") {
      setState("button");
    } else {
      // 添加任务后清空 Input
      addTask({ name: value, kanbanId: boardId, projectId }).then(() => {
        setInputValue("");
      });
    }
  };

  const addTaskButton = (
    <Button
      onClick={() => {
        setState("input");
      }}
    >
      + 添加任务
    </Button>
  );

  const addTaskInput = (
    <SubmitInput
      allowClear={!isLoading}
      placeholder="请输入任务名称"
      loading={isLoading}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      enterButton={enterButton}
      onSubmit={onSubmit}
    />
  );

  return cloneElement(state === "button" ? addTaskButton : addTaskInput, {
    style: { display: hasQueryParam ? "none" : "block" },
  });
};

export default AddTask;
