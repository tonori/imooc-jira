import { FlexBetween, FlexColumn } from "styled-components/FlexLayout";
import { Button, Divider, List, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";
import DeleteTaskGroupButton from "./DeleteTaskGroupButton";
import SpinOutlined from "components/LoadingOutlined";

import { useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { useProjectCURD } from "page-hooks/project";
import { useTaskCURD } from "page-hooks/task";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";

import { useTaskGroupCURD } from "page-hooks/taskGroup";
import { ListItemMetaProps } from "antd/es/list";
import { Epic } from "types/epic";
import { Project } from "types/project";

import dayjs from "dayjs";
import AddTaskGroupModal from "./AddTaskGroupModal";

const TaskGroup = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const projectId = useProjectIdInParam();
  const { useGetItemById } = useProjectCURD();
  const { data: currentProject, isLoading: getProjectLoading } =
    useGetItemById<Project>(["project", { id: projectId }], projectId);
  const { useGetItem: getTaskGroup } = useTaskGroupCURD();
  const { data: taskGroups, isLoading: getTaskGroupLoading } = getTaskGroup({
    projectId,
  });
  const { useGetItem: getTasks } = useTaskCURD();
  const { data: tasks, isLoading: getTasksLoading } = getTasks({ projectId });
  const isLoading = getProjectLoading || getTaskGroupLoading || getTasksLoading;

  // 任务组标题
  const title = useMemo(() => {
    if (getProjectLoading) return "任务组";

    return `${currentProject?.name || "Unknown Project"} · 任务组`;
  }, [getProjectLoading, currentProject]);

  const renderListItem = (taskGroup: Epic) => {
    const listItemMeta: ListItemMetaProps = {
      title: (
        <FlexBetween>
          <h3 className="mb-0 color-primary">{taskGroup.name}</h3>
          <DeleteTaskGroupButton taskGroup={taskGroup} />
        </FlexBetween>
      ),
      description: (
        <Space direction="vertical" size="small">
          <Typography.Text type="secondary">
            开始时间：{dayjs(taskGroup.start).format("YYYY-MM-DD H:M:s")}
          </Typography.Text>
          <Typography.Text type="secondary">
            结束时间：{dayjs(taskGroup.end).format("YYYY-MM-DD H:M:s")}
          </Typography.Text>
        </Space>
      ),
    };

    const taskLinks = () => {
      const _tasks =
        tasks?.filter((task) => task.epicId === taskGroup.id) || [];
      if (!_tasks.length) return "该任务组下没有任务";
      return _tasks.map((task) => (
        <NavLink
          key={task.id}
          className="d-block"
          to={`/projects/${projectId}/task/${task.id}/edit`}
        >
          {task.name}
        </NavLink>
      ));
    };

    return (
      <List.Item key={taskGroup.id}>
        <List.Item.Meta {...listItemMeta} />
        <div>{taskLinks()}</div>
      </List.Item>
    );
  };

  return (
    <FlexColumn className="w-100">
      <FlexBetween>
        <h1 className="mb-0">
          {title}
          <SpinOutlined
            spinning={isLoading}
            delay={200}
            style={{ marginLeft: "1rem" }}
          />
        </h1>
        <Button onClick={() => history.push(`${pathname}/add-task-group`)}>
          创建任务组
        </Button>
      </FlexBetween>
      <Divider style={{ margin: "1rem 0" }} />
      <List
        dataSource={taskGroups || []}
        itemLayout="vertical"
        renderItem={renderListItem}
      />
      <AddTaskGroupModal />
    </FlexColumn>
  );
};

export default TaskGroup;
