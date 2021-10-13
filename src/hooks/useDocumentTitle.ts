import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      document.title = oldTitle;
    };
  }, [oldTitle]);
};

export default useDocumentTitle;
