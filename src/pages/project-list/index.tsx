// Component
import SearchForm from "./search-form";
import List from "./list";
import ProjectModal from "./project-modal";
import FlexBetween from "styled-components/FlexBetween";
import { Button } from "antd";
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useMemo, useState } from "react";
import useDebounce from "hooks/useDebounce";
import useDocumentTitle from "hooks/useDocumentTitle";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import { useGetProject } from "page-hooks/project";
import { useGetProjectUsers } from "page-hooks/projectUsers";

// Utils
import { cleanObject, stringToNumber } from "utils";

const ProjectList = () => {
  useDocumentTitle("项目列表");

  const [urlQueryParam, setUrlQueryParam] = useUrlQueryParams([
    "name",
    "personId",
  ]);
  const [param, setParam] = useState({
    ...urlQueryParam,
    personId: stringToNumber(urlQueryParam.personId),
  });

  const debouncedParam = useDebounce(param, 200);
  const queryParam = useMemo(
    () => cleanObject(debouncedParam, true),
    [debouncedParam]
  );

  const { data: users } = useGetProjectUsers();
  const { data: projectList, isLoading: tableLoading } =
    useGetProject(queryParam);

  useEffect(() => {
    setUrlQueryParam(queryParam);
    // eslint-disable-next-line
  }, [queryParam]);

  return (
    <div>
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
    </div>
  );
};

export default ProjectList;
