// Component
import SearchForm from "./search-form";
import List from "./list";

// Hooks
import { useState, useEffect, useMemo, useCallback } from "react";
import useHttp from "hooks/useHttp";
import useDebounce from "hooks/useDebounce";
import useMount from "hooks/useMount";
import useRequest from "hooks/useRequest";
import useDocumentTitle from "hooks/useDocumentTitle";
import useUrlQueryParams from "hooks/useUrlQueryParam";

// Utils
import { cleanObject, stringToNumber } from "utils";

// Types
import { Project } from "types";

const ProjectList = () => {
  useDocumentTitle("项目列表");

  const client = useHttp();
  const {
    request,
    loading: tableLoading,
    response: projectList,
  } = useRequest<Project[]>();
  const [urlQueryParam, setUrlQueryParam] = useUrlQueryParams([
    "name",
    "personId",
  ]);
  const [param, setParam] = useState({
    ...urlQueryParam,
    personId: stringToNumber(urlQueryParam.personId),
  });
  const [users, setUsers] = useState([]);

  const debouncedParam = useDebounce(param, 200);
  const queryParam = useMemo(
    () => cleanObject(debouncedParam, true),
    [debouncedParam]
  );

  const getProjectData = useCallback(() => {
    request({
      finalPoint: "/projects",
      data: queryParam,
    });
    // eslint-disable-next-line
  }, [queryParam]);

  useEffect(() => {
    setUrlQueryParam(queryParam);
    getProjectData();
    // eslint-disable-next-line
  }, [queryParam, getProjectData]);

  useMount(() => {
    client("/users").then((users) => {
      setUsers(users);
    });
  });

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
