import { useState, useEffect } from "react";

const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    let timer: number | null = setTimeout(() => {
      setDebounceValue(value);
      timer = null;
    }, delay);

    // 返回一个用于清除副作用的函数，React 会在执行当前 effect 之前对上一个 effect 进行清除
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
