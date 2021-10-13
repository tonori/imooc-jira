// Component
import SearchForm from "./search-form";
import List from "./list";

// Hooks
import { useEffect, useMemo, useState } from "react";
import useHttp from "hooks/useHttp";
import useDebounce from "hooks/useDebounce";
import useDocumentTitle from "hooks/useDocumentTitle";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import { useGetProject } from "page-hooks/project";

// Utils
import { cleanObject, stringToNumber } from "utils";

const ProjectList = () => {
  useDocumentTitle("项目列表");

  const client = useHttp();
  const [users, setUsers] = useState([]);

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

  const {
    request: getProjectData,
    loading: tableLoading,
    response: projectList,
  } = useGetProject(queryParam);

  useEffect(() => {
    setUrlQueryParam(queryParam);
    getProjectData();
  }, [queryParam]);

  useEffect(() => {
    client("/users").then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      <h1>项目列表</h1>
      <SearchForm param={param} setParam={setParam} users={users} />
      <List
        refreshDataFunc={getProjectData}
        tableLoading={tableLoading}
        users={users}
        dataSource={projectList || []}
      />
    </div>
  );
};

export default ProjectList;
