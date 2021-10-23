import { ComponentProps } from "react";
import { Select } from "antd";
import { useGetTaskTypes } from "page-hooks/taskType";

const TaskTypeSelect = (props: ComponentProps<typeof Select>) => {
  const { data: taskTypes } = useGetTaskTypes();
  return (
    <Select placeholder="任务类型" allowClear {...props}>
      {taskTypes &&
        taskTypes.map((taskType) => (
          <Select.Option value={taskType.id} key={taskType.name}>
            {taskType.name}
          </Select.Option>
        ))}
    </Select>
  );
};

export default TaskTypeSelect;
