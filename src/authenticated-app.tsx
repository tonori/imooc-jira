// Components
import { Route, Switch } from "react-router";
import AuthenticatedAppHeader from "components/authenticatedAppHeader";
import ProjectListScreen from "pages/project-list";
import DefaultRouteNavigation from "components/DefaultRouteNavigation";

const AuthenticatedApp = () => {
  return (
    <div style={{ height: "100vh" }}>
      <AuthenticatedAppHeader />
      <div>
        <Switch>
          <Route path="/projects" component={ProjectListScreen} />
          <Route
            path="/*"
            render={() => <DefaultRouteNavigation to={"/projects"} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
