import useHttp from "./useHttp";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import useOptimisticOption from "./useOptimisticOption";

interface CURDProps {
  queryKey: QueryKey;
  finalPoint: string;
}

const useCURD = <T>({ queryKey, finalPoint }: CURDProps) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  const useGetItem = (param?: Partial<T>) =>
    useQuery<T[]>(queryKey, () =>
      client(finalPoint, { method: "GET", data: param })
    );

  const useGetItemById = <I>(
    queryKey: QueryKey,
    id?: number,
    params?: Partial<I>
  ) =>
    useQuery<I>(
      queryKey,
      () => client(finalPoint + "/" + id, { method: "GET", data: params }),
      {
        enabled: !!id,
      }
    );

  const useAddItem = () => {
    return useMutation(
      (params: Partial<T>) =>
        client(finalPoint, {
          method: "POST",
          data: params,
        }),
      {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
      }
    );
  };

  const useEditItem = () => {
    const options = useOptimisticOption({
      queryKey,
      callback: (target, old) =>
        old?.map((item) =>
          item.id === target.id ? { ...item, ...target } : item
        ) || [],
    });

    return useMutation(
      (params: { id: number } & Partial<T>) =>
        client(finalPoint + "/" + params.id, {
          method: "PATCH",
          data: params,
        }),
      options
    );
  };

  const useDeleteItem = () => {
    const options = useOptimisticOption({
      queryKey,
      callback: (target, old) =>
        old?.filter((item) => item.id !== target) || [],
    });

    return useMutation(
      (id: number) =>
        client(finalPoint + "/" + id, {
          method: "DELETE",
        }),
      options
    );
  };

  return {
    useGetItem,
    useGetItemById,
    useAddItem,
    useEditItem,
    useDeleteItem,
  };
};

export default useCURD;
