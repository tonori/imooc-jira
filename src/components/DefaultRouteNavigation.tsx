import { useHistory } from "react-router";

const DefaultRouteNavigation = ({ to }: { to: string }) => {
  const history = useHistory();
  history.replace(to);
  return <div>跳转中...</div>;
};

export default DefaultRouteNavigation;
