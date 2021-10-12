import { useState } from "react";
import useIsUnmounted from "utils/use-is-unmounted";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "pending" | "success" | "error";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const isUnmounted = useIsUnmounted();

  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  const run = (promise: Promise<D>) => {
    if (
      !promise &&
      !(Object.prototype.toString.call(promise) === "[object Promise]")
    ) {
      throw new Error("传入的需要是 Promise 对象");
    }

    setState({ ...state, status: "pending" });

    // 延迟设定
    return promise
      .then((data) => {
        if (!isUnmounted.current) {
          setState({ ...state, status: "success" });
          setData(data);
          return Promise.resolve(data);
        }
      })
      .catch((error) => {
        if (!isUnmounted.current) {
          setState({ ...state, status: "error" });
          setError(error);
          return Promise.reject(error);
        }
      })
      .finally(() => {
        if (isUnmounted.current)
          return Promise.reject("Component is unmountend");
      });
  };

  return {
    isIdle: state.status === "idle",
    isPending: state.status === "pending",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    ...state,
  };
};

export default useAsync;
