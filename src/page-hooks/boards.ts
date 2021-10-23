import { useMutation, useQuery, useQueryClient } from "react-query";
import useHttp from "hooks/useHttp";
import { Board } from "types/boards";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "hooks/useDebounce";
import { cleanObject } from "utils";
import { useProjectQueryKey } from "./project";
import useOptimisticOption from "../hooks/useOptimisticOption";
import { useRouteMatch } from "react-router-dom";

export interface BoardParamProps {
  name: string | undefined;
  typeId: number | undefined;
  processorId: number | undefined;
}

export const useBoardParam = () => {
  // 与 /page-hooks/project.ts 中的 useProjectParam 写法相同
  const [urlQueryParam, setUrlQueryParam] = useUrlQueryParams([
    "name",
    "typeId",
    "processorId",
  ]);
  const [param, setParam] = useState<BoardParamProps>({
    ...urlQueryParam,
    typeId: Number(urlQueryParam.typeId) || undefined,
    processorId: Number(urlQueryParam.processorId) || undefined,
  });
  // 防抖
  const debounceParam = useDebounce(param, 200);
  // cleanObject
  const cleanedParam = useMemo(
    () => cleanObject(debounceParam as Partial<BoardParamProps>),
    [debounceParam]
  );
  // 将计算的 param 推入 history
  useEffect(() => {
    setUrlQueryParam(cleanedParam);
  }, [setUrlQueryParam, cleanedParam]);
  return [param, cleanedParam, setParam] as const;
};

export const useBoardQueryKey = () => {
  const param = useBoardParam();
  const cleanedParam = param[1];
  return ["boards", cleanedParam];
};

export const useProjectIdInParam = () => {
  const { params } = useRouteMatch<{ projectId: string }>();
  return Number(params.projectId) || undefined;
};

export const useGetBoards = (param?: Partial<Board>) => {
  const client = useHttp();
  return useQuery<Board[]>(["boards", param], () =>
    client("/kanbans", { method: "GET", data: param })
  );
};

export const useAddBoard = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const queryKey = useBoardQueryKey();
  const projectId = useProjectIdInParam();

  return useMutation(
    (boardName: string) =>
      client("/kanbans", {
        method: "POST",
        data: {
          projectId,
          name: boardName,
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

const useEditBoard = () => {
  const client = useHttp();
  const queryKey = useBoardQueryKey();

  const options = useOptimisticOption<Board>({
    queryKey,
    callback: (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || [],
  });

  return useMutation(
    (params: Partial<Board>) =>
      client(`/kanbans/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    options
  );
};

export const useDeleteBoard = () => {
  const client = useHttp();
  const queryKey = useProjectQueryKey();

  const options = useOptimisticOption<Board>({
    queryKey,
    callback: (target, old) =>
      old?.filter((item) => item.id !== target.id) || [],
  });

  return useMutation(
    (params: Partial<Board>) =>
      client(`/kanbans/${params.id}`, {
        method: "DELETE",
      }),
    options
  );
};
