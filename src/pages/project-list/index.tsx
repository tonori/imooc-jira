// Component
import { Main } from "styled-components/ContentScreenLayout";
import SearchForm from "./search-form";
import List from "./list";
import ProjectModal from "./project-modal";
import { FlexBetween } from "styled-components/FlexLayout";
import { Button } from "antd";
import { Link } from "react-router-dom";

// Hooks
import useDocumentTitle from "hooks/useDocumentTitle";
import { useGetProject, useProjectParam } from "page-hooks/project";
import { useGetProjectUsers } from "page-hooks/projectUsers";

const ProjectList = () => {
  useDocumentTitle("项目列表");

  const [param, cleanedParam, setParam] = useProjectParam();
  const { data: users } = useGetProjectUsers();
  const { data: projectList, isLoading: tableLoading } =
    useGetProject(cleanedParam);

  return (
    <Main>
      <FlexBetween>
        <h1>项目列表</h1>
        <Button>
          <Link to="/projects/create-project">新建项目</Link>
        </Button>
      </FlexBetween>
      <SearchForm param={param} setParam={setParam} users={users || []} />
      <List
        tableLoading={tableLoading}
        users={users || []}
        dataSource={projectList || []}
      />
      <ProjectModal />
    </Main>
  );
};

export default ProjectList;
