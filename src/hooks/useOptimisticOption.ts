// 此 Hook 用于生产 React Query useMutation 的 乐观更新 Option
import { QueryKey, useQueryClient } from "react-query";
import { notification } from "antd";

interface OptimisticOptionProps {
  queryKey: QueryKey;
  callback: (target: any, old?: any[]) => any[];
}

const useOptimisticOption = ({ queryKey, callback }: OptimisticOptionProps) => {
  const queryClient = useQueryClient();
  return {
    onMutate: async (target: any) => {
      await queryClient.cancelQueries(queryKey);
      // 保存前一次状态的快照
      const previousItems = queryClient.getQueryData(queryKey);
      // 乐观更新修改数据
      queryClient.setQueryData(queryKey, (old?: any[]) =>
        callback(target, old)
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
  };
};

export default useOptimisticOption;
