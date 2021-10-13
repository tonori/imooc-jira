import { useState } from "react";
import { http, Config } from "utils/http";
import useIsUnMounted from "hooks/useIsUnMounted";
import * as Auth from "context/auth-provider";
import { message } from "antd";

export interface RequestProps extends Config {
  finalPoint: string;
}

const useRequest = <P>() => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<P>();
  const [error, setError] = useState(null);

  const isUnmounted = useIsUnMounted();

  const request = async ({
    finalPoint,
    data,
    ...customConfig
  }: RequestProps) => {
    setLoading(() => true);

    const httpConfig = {
      data,
      token: Auth.getToken() || undefined,
      ...customConfig,
    };

    return http(finalPoint, httpConfig)
      .then((res) => {
        if (!isUnmounted.current) {
          setResponse(res);
          return Promise.resolve(res);
        }
      })
      .catch((error) => {
        if (!isUnmounted.current) {
          setError(error);
          message.error(error.message);
          return Promise.reject(error);
        }
      })
      .finally(() => {
        if (!isUnmounted.current) {
          setLoading(() => false);
        } else return Promise.reject("Component is unmounted");
      });
  };

  return {
    loading,
    response,
    error,
    request,
  };
};

export default useRequest;
