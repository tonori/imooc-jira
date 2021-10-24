// Components
import { Redirect, Route, Switch } from "react-router";
import AuthenticatedAppHeader from "components/authenticatedAppHeader";
import ProjectListScreen from "pages/project-list";
import ProjectScreen from "pages/project";

const AuthenticatedApp = () => {
  return (
    <div style={{ height: "100vh" }}>
      <AuthenticatedAppHeader />
      <div>
        <Switch>
          <Route
            path="/projects/create-project"
            component={ProjectListScreen}
          />
          <Route
            path="/projects/:projectId/edit"
            component={ProjectListScreen}
          />
          <Route
            path="/projects/:projectId/delete"
            component={ProjectListScreen}
          />
          <Route path="/projects/:projectId" component={ProjectScreen} />
          <Route path="/projects" component={ProjectListScreen} />
          <Redirect to="/projects" from="/" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
