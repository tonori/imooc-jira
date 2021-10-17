import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = `${title} · Jira任务管理系统`;
  }, [title]);
  useEffect(() => {
    return () => {
      document.title = oldTitle;
    };
  }, [oldTitle]);
};

export default useDocumentTitle;
