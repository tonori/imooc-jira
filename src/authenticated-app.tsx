// Components
import { Route, Switch, useHistory } from "react-router";
import AuthenticatedAppHeader from "components/authenticatedAppHeader";
import ProjectListScreen from "pages/project-list";

const AuthenticatedApp = () => {
  const history = useHistory();

  return (
    <div style={{ height: "100vh" }}>
      <AuthenticatedAppHeader />
      <div>
        <Switch>
          <Route path="/projects" component={ProjectListScreen} />
          <Route
            exact
            path="/"
            render={() => {
              history.replace("/projects");
              return <div>跳转中...</div>;
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
