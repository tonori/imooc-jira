import { useHistory, useLocation } from "react-router-dom";
import { useCallback, useMemo, useRef } from "react";
import * as qs from "qs";

const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const history = useHistory();
  const { search: searchString, pathname } = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(searchString),
    [searchString]
  );
  const paramKeys = useRef(keys);

  const setSearchParams = useCallback(
    (queryParam: { [key: string]: unknown }) => {
      history.push({
        pathname,
        search: "?" + qs.stringify(queryParam),
      });
    },
    [history, pathname]
  );

  return [
    useMemo(
      () =>
        paramKeys.current.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) };
        }, {} as { [key in K]: string }),
      [searchParams, paramKeys]
    ),
    setSearchParams,
  ] as const;
};

export default useUrlQueryParam;
