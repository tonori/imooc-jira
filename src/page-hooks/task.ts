import useCURD from "hooks/useCURD";
import useDebounce from "hooks/useDebounce";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import { useEffect, useMemo, useState } from "react";
import { useProjectIdInParam } from "./useProjectIdInParam";
import { cleanObject } from "utils";
import { BoardParamProps } from "./boards";
import { Task } from "types/task";
import useHttp from "../hooks/useHttp";
import { useMutation, useQueryClient } from "react-query";
import { DropSortProps } from "../types/DropSortProps";
import { notification } from "antd";
import reorder from "../utils/dragReorder";

export const useTaskParam = () => {
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

export const useTaskCURD = (cleanedQueryParam?: Partial<Task>) => {
  const projectId = useProjectIdInParam();
  const queryKey = ["tasks", { projectId }, cleanedQueryParam || {}];
  return useCURD<Task>({ queryKey, finalPoint: "/tasks" });
};

export const useReorderTask = () => {
  const client = useHttp();
  const projectId = useProjectIdInParam();
  const queryClient = useQueryClient();
  const queryKey = ["tasks", { projectId }, {}];
  return useMutation(
    (params: DropSortProps) =>
      client("/tasks/reorder", {
        data: params,
        method: "POST",
      }),
    {
      onMutate: async (target: any) => {
        await queryClient.cancelQueries(queryKey);
        // 保存前一次状态的快照
        const previousItems = queryClient.getQueryData(queryKey);
        // 乐观更新修改数据
        queryClient.setQueryData(queryKey, (old?: any[]) => {
          const orderedList = reorder({ list: old, ...target }) as Task[];
          return orderedList.map((item) =>
            item.id === target.fromId
              ? { ...item, kanbanId: target.toKanbanId }
              : item
          );
        });
        // 返回前一次状态的快照，以便发生错误时需要回滚所使用
        return { previousItems };
      },
      // 出错时，使用前一次状态的快照重新设置当前缓存数据
      onError: (error: any, newItem: any, context: any) => {
        queryClient.setQueryData(queryKey, context.previousItems);
        notification.error({
          message: "数据更新时出现异常",
          description:
            "数据请求中出现了异常，数据已自动回退至异常前的版本，请核查数据。",
        });
      },
    }
  );
};
