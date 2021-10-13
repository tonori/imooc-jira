import { useEffect } from "react";
import useRequest, { RequestProps } from "hooks/useRequest";
import { Project } from "types";

export const useGetProject = (params?: Partial<Project>) => {
  const { request, ...response } = useRequest<Project[]>();

  useEffect(() => {
    request({
      finalPoint: "/projects",
      method: "GET",
      data: params,
    });
    // eslint-disable-next-line
  }, []);

  return { ...response };
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
  const { request, ...response } = useRequest();

  const mutate = async (params: Partial<Project>) => {
    const config: RequestProps = {
      finalPoint: `/projects/${params.id}`,
      method: "PATCH",
      data: params,
    };
    return request(config);
  };

  return {
    mutate,
    ...response,
  };
};
