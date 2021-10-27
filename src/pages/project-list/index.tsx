// Component
import { FlexColumnMain } from "styled-components/ContentScreenLayout";
import { FlexBetween } from "styled-components/FlexLayout";
import { Button } from "antd";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import SearchForm from "./search-form";
import List from "./list";
import ProjectModal from "./project-modal";
import Project from "pages/project";

// Hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import { useProjectCURD, useProjectParam } from "page-hooks/project";
import { useGetProjectUsers } from "page-hooks/projectUsers";

const ProjectList = () => {
  useDocumentTitle("项目列表");

  const [param, cleanedParam, setParam] = useProjectParam();
  const { data: users } = useGetProjectUsers();
  const { useGetItem: useGetProject } = useProjectCURD();
  const { data: projectList, isLoading: tableLoading } =
    useGetProject(cleanedParam);

  return (
    <FlexColumnMain style={{ padding: "1.5rem 3.2rem 0" }}>
      <FlexBetween>
        <h1>项目列表</h1>
        <Link to="/projects/create-project">
          <Button>新建项目</Button>
        </Link>
      </FlexBetween>
      <SearchForm param={param} setParam={setParam} users={users || []} />
      <List
        tableLoading={tableLoading}
        users={users || []}
        dataSource={projectList || []}
      />
      <ProjectModal />
    </FlexColumnMain>
  );
};

const ProjectListScreen = () => (
  <Switch>
    {/*创建项目*/}
    <Route exact path="/projects/create-project" component={ProjectList} />
    {/*指定 projectId 编辑*/}
    <Route exact path="/projects/:projectId/edit" component={ProjectList} />
    {/*指定 projectId 删除*/}
    <Route exact path="/projects/:projectId/delete" component={ProjectList} />
    {/*项目详情（看板、任务组）*/}
    <Route path="/projects/:projectId" component={Project} />
    <Route path="" component={ProjectList} />
  </Switch>
);

export default ProjectListScreen;
