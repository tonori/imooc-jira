import { useMutation, useQuery, useQueryClient } from "react-query";
import useHttp from "hooks/useHttp";
import { Project } from "types";

export const useGetProject = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projectsList", params], () =>
    client("/projects", { method: "GET", data: params })
  );
};

// 新增项目
// export const useAddProject = () => {
//   const { request } = useRequest()
//   const add = (params: Partial<Project>) => {
//     return run(client(`/projects/${params.id}`, {
//       data: params,
//       method: 'POST'
//     }))
//   }
//   return {
//     mutate,
//     ...response
//   }
// }

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
