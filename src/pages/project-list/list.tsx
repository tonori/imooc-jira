// Components
import { Link } from "react-router-dom";
import { Table } from "antd";
import Pin from "components/pin";

// Module
import dayjs from "dayjs";

// Hooks
import { useRouteMatch } from "react-router";
import { useEditProject } from "page-hooks/project";

// Types
import { Project, User } from "types";
import { TableProps } from "antd/es/table";

interface ListProps extends TableProps<Project> {
  users: User[];
  tableLoading: boolean;
}

const List = ({ users, ...props }: ListProps) => {
  const { url } = useRouteMatch();
  const { mutate, isLoading: editing } = useEditProject();

  const switchPin = (id: number) => (pin: boolean) => mutate({ id, pin });

  const columns = [
    {
      title: <Pin active={true} disabled={true} />,
      render(_: Project, project: Project) {
        return (
          <Pin active={project.pin} changeActive={switchPin(project.id)} />
        );
      },
    },
    {
      title: "项目名称",
      render(_: Project, project: Project) {
        return (
          <Link to={`${url}/${project.id.toString()}`}>{project.name}</Link>
        );
      },
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render(_: Project, project: Project) {
        return (
          users.find((user) => user.id === project.personId)?.name || "未知"
        );
      },
    },
    {
      title: "创建时间",
      render(_: Project, project: Project) {
        return project.created
          ? dayjs(project.created).format("YYYY-MM-DD H:M:s")
          : "无";
      },
    },
  ];

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={columns}
      loading={{ delay: 200, spinning: props.tableLoading || editing }}
      {...props}
    />
  );
};

export default List;
