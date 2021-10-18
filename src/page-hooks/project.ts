import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useHttp from "hooks/useHttp";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import { Project } from "types";
import { cleanObject, stringToNumber } from "utils";
import useDebounce from "../hooks/useDebounce";

// 获取项目列表页面的查询参数
export const useProjectParam = () => {
  // 获取到 personId 和 name 的对象
  const [urlQueryParam, setUrlQueryParam] = useUrlQueryParams([
    "personId",
    "name",
  ]);
  // 将获取到的参数对象中的 personId 转换成为数字
  // 如果 personId 的值不是数字，则会被转换成0，然后被 cleanObject 清除
  const [param, setParam] = useState({
    ...urlQueryParam,
    personId: stringToNumber(urlQueryParam.personId),
  });
  // 防抖
  const debounceParam = useDebounce(param, 200);
  // cleanObject
  const cleanedParam = useMemo(
    () => cleanObject(debounceParam, true),
    [debounceParam]
  );
  // 将计算的 param 推入 history
  useEffect(() => {
    setUrlQueryParam(cleanedParam);
  }, [setUrlQueryParam, cleanedParam]);
  return [param, cleanedParam, setParam] as const;
};

// 获取 project list
export const useGetProject = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projectList", params], () =>
    client("/projects", { method: "GET", data: params })
  );
};

// 获取单个 project
export const useGetSingleProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { personId: id }],
    () => client(`/projects/${id}`, { method: "GET" }),
    {
      enabled: !!id,
    }
  );
};

// 新增项目
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (form: Partial<Project>) =>
      client("/projects", {
        method: "POST",
        data: form,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projectsList"),
    }
  );
};

// 编辑项目
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  // param[0]: param
  // param[1]: cleanedParam
  // param[2]: setParam
  const param = useProjectParam();
  const cleanedParam = param[1];

  // 查询的键值
  const queryKey = ["projectList", cleanedParam];

  return useMutation(
    (params: Partial<Project>) =>
      client(`/projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

// 删除项目
export const useDeleteProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (id: Project["id"]) =>
      client(`/projects/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projectsList"),
    }
  );
};
