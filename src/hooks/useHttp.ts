import useAuth from "./useAuth";
import { http } from "utils/http";

const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

export default useHttp;
