import { useMutation, useQuery, useQueryClient } from "react-query";
import useHttp from "hooks/useHttp";
import { Project } from "types";

// 获取全部 project
export const useGetProject = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projectsList", params], () =>
    client("/projects", { method: "GET", data: params })
  );
};

// 获取单个 project
export const useGetSingleProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
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
  return useMutation(
    (params: Partial<Project>) =>
      client(`/projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projectsList"),
    }
  );
};

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
