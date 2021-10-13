import { useRef, useEffect } from "react";

const useIsMounted = () => {
  const isMounted = useRef(false);

  console.log(isMounted);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
