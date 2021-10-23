import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useHttp from "hooks/useHttp";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import { cleanObject } from "utils";
import useDebounce from "hooks/useDebounce";
import useOptimisticOption from "../hooks/useOptimisticOption";
import { Project } from "types/project";

export interface ProjectQueryParamProps {
  name: string | undefined;
  personId: number | undefined;
}

// 获取项目列表页面的查询参数
export const useProjectParam = () => {
  // 获取到 personId 和 name 的对象
  const [urlQueryParam, setUrlQueryParam] = useUrlQueryParams([
    "personId",
    "name",
  ]);
  // 将获取到的参数对象中的 personId 转换成为数字
  // 如果 personId 的值不是数字，则会被转换成0，然后被 cleanObject 清除
  const [param, setParam] = useState<ProjectQueryParamProps>({
    ...urlQueryParam,
    personId: Number(urlQueryParam.personId) || undefined,
  });
  // 防抖
  const debounceParam = useDebounce(param, 200);
  // cleanObject
  const cleanedParam = useMemo(
    () => cleanObject(debounceParam as Partial<ProjectQueryParamProps>),
    [debounceParam]
  );
  // 将计算的 param 推入 history
  useEffect(() => {
    setUrlQueryParam(cleanedParam);
  }, [setUrlQueryParam, cleanedParam]);
  return [param, cleanedParam, setParam] as const;
};

// 获取项目列表页面的 QueryKey
export const useProjectQueryKey = () => {
  // param[0]: param
  // param[1]: cleanedParam
  // param[2]: setParam
  const param = useProjectParam();
  const cleanedParam = param[1];
  return ["projectList", cleanedParam];
};

// 获取 project list
export const useGetProject = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projectList", params], () =>
    client("/projects", { method: "GET", data: params })
  );
};

// 获取单个 project
export const useGetSingleProject = (id: number) => {
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
  const queryKey = useProjectQueryKey();

  return useMutation(
    (form: Partial<Project>) =>
      client("/projects", {
        method: "POST",
        data: form,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

// 编辑项目
export const useEditProject = () => {
  const client = useHttp();
  const queryKey = useProjectQueryKey();

  const mutationOptions = useOptimisticOption<Project>({
    queryKey,
    callback: (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || [],
  });

  return useMutation(
    (params: Partial<Project>) =>
      client(`/projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    mutationOptions
  );
};

// 删除项目
export const useDeleteProject = () => {
  const client = useHttp();
  const queryKey = useProjectQueryKey();

  const mutationOptions = useOptimisticOption<Project>({
    queryKey,
    callback: (target, old) =>
      old?.filter((item) => item.id !== target.id) || [],
  });

  return useMutation(
    (params: Partial<Project>) =>
      client(`/projects/${params.id}`, {
        method: "DELETE",
      }),
    mutationOptions
  );
};
