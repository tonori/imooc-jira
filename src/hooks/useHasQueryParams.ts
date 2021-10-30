import { useLocation } from "react-router";

const useHasQueryParams = () => {
  const { search } = useLocation();
  return !!search && search !== "?";
};

export default useHasQueryParams;
