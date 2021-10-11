// Components
import Boards from "pages/boards";
import TaskGroup from "pages/task-group";
import { Switch, Route, Redirect } from "react-router";
import { NavLink } from "react-router-dom";

// Hooks
import { useRouteMatch } from "react-router-dom";

const Project = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <NavLink to={`${url}/boards`}>看板</NavLink>
      <NavLink to={`${url}/task-group`}>任务组</NavLink>
      <Switch>
        <Route path={`${path}/boards`} component={Boards} />
        <Route path={`${path}/task-group`} component={TaskGroup} />
        <Redirect to={`${url}/boards`} from={path} />
      </Switch>
    </div>
  );
};

export default Project;
