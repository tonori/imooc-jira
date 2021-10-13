import { useRef, useEffect } from "react";

const useIsUnMounted = () => {
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return isUnmounted;
};

export default useIsUnMounted;
