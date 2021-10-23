// Components
import Boards from "pages/boards";
import TaskGroup from "pages/task-group";
import { Layout, Menu } from "antd";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import {
  Content,
  ContentContainer,
  Main,
} from "styled-components/ContentScreenLayout";

// Hooks
import { useMemo } from "react";

const Project = () => {
  const { Sider } = Layout;
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const currentActive = useMemo(() => {
    const pathArray = pathname.split("/");
    return pathArray[pathArray.length - 1];
  }, [pathname]);

  return (
    <Main>
      <Sider theme="light">
        <Menu mode="inline" theme="light" selectedKeys={[currentActive]}>
          <Menu.Item key="boards" style={{ marginTop: 0 }}>
            <Link to={`${url}/boards`}>看板</Link>
          </Menu.Item>
          <Menu.Item key="task-group">
            <Link to={`${url}/task-group`}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <ContentContainer>
        <Content>
          <Switch>
            <Route path={`${path}/boards`} component={Boards} />
            <Route path={`${path}/task-group`} component={TaskGroup} />
            <Redirect to={`${url}/boards`} from={path} />
          </Switch>
        </Content>
      </ContentContainer>
    </Main>
  );
};

export default Project;
