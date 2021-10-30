// Components
import { Link } from "react-router-dom";
import { Button, Space, Table } from "antd";
import Pin from "components/pin";

// Module
import dayjs from "dayjs";

// Hooks
import { useHistory, useRouteMatch } from "react-router";
import { useProjectCURD } from "page-hooks/project";

// Types
import { TableProps } from "antd/es/table";
import { User } from "types/user";
import { Project } from "types/project";

// Utils
import { deleteProjectConfirm } from "utils/createDeleteConfirm";

interface ListProps extends TableProps<Project> {
  users: User[];
  tableLoading: boolean;
}

const List = ({ users, ...props }: ListProps) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { useEditItem: useEditProject, useDeleteItem: useDeleteProject } =
    useProjectCURD();
  const { mutate: editProject } = useEditProject();
  const { mutateAsync: deleteProject } = useDeleteProject();

  const switchPin = (id: number) => (pin: boolean) => editProject({ id, pin });

  const deleteProjectButtonOnclick = (id: number, name: string) => {
    history.push(`${url}/${id}/delete`);
    deleteProjectConfirm(
      name,
      () => deleteProject(id),
      () => history.replace("/projects")
    );
  };

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
    {
      title: "操作",
      render(_: Project, project: Project) {
        return (
          <Space size="small">
            <Link to={`/projects/${project.id}/edit`}>编辑</Link>
            <Button
              danger
              type="link"
              onClick={() =>
                deleteProjectButtonOnclick(project.id, project.name)
              }
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={columns}
      loading={{ delay: 200, spinning: props.tableLoading }}
      {...props}
    />
  );
};

export default List;
