import { useEffect, useMemo, useState } from "react";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import useCURD from "hooks/useCURD";
import useDebounce from "hooks/useDebounce";
import { cleanObject } from "utils";
import { Board } from "types/boards";

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

export const useBoardsCURD = () => {
  const queryKey = useBoardQueryKey();
  return useCURD<Board>({ queryKey, finalPoint: "/kanbans" });
};
