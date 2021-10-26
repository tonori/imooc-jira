import { useEffect, useMemo, useState } from "react";
import useUrlQueryParams from "hooks/useUrlQueryParam";
import useDebounce from "hooks/useDebounce";
import useCURD from "hooks/useCURD";

import { cleanObject } from "utils";

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

export const useProjectCURD = () => {
  const queryKey = useProjectQueryKey();
  return useCURD<Project>({ queryKey, finalPoint: "/projects" });
};
