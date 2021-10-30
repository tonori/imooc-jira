import useCURD from "hooks/useCURD";
import useHttp from "hooks/useHttp";
import { useProjectIdInParam } from "./useProjectIdInParam";
import { useMutation, useQueryClient } from "react-query";
import { Board } from "types/boards";
import { DropSortProps } from "types/DropSortProps";
import reorder from "../utils/dragReorder";
import { notification } from "antd";

export interface BoardParamProps {
  name: string | undefined;
  typeId: number | undefined;
  processorId: number | undefined;
}

export const useBoardQueryKey = () => {
  const projectId = useProjectIdInParam();
  return ["boards", { projectId }];
};

export const useBoardCURD = () => {
  const queryKey = useBoardQueryKey();
  return useCURD<Board>({ queryKey, finalPoint: "/kanbans" });
};

export const useReorderBoard = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const projectId = useProjectIdInParam();
  const queryKey = ["boards", { projectId }];
  return useMutation(
    (params: DropSortProps) =>
      client("/kanbans/reorder", {
        data: params,
        method: "POST",
      }),
    {
      onMutate: async (target: any) => {
        await queryClient.cancelQueries(queryKey);
        // 保存前一次状态的快照
        const previousItems = queryClient.getQueryData(queryKey);
        // 乐观更新修改数据
        queryClient.setQueryData(queryKey, (old?: any[]) =>
          reorder({ list: old, ...target })
        );
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
