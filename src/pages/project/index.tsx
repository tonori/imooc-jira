// Components
import Boards from "pages/boards";
import TaskGroup from "pages/task-group";
import { Layout, Menu } from "antd";
import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import {
  Content,
  ContentContainer,
  FlexRowMain,
} from "styled-components/ContentScreenLayout";

// Hooks
import { useMemo } from "react";
import DefaultRouteNavigation from "../../components/DefaultRouteNavigation";

const SubMenu = () => {
  const { Sider } = Layout;
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const currentActive = useMemo(() => {
    const pathArray = pathname.split("/");
    return pathArray[pathArray.length - 1];
  }, [pathname]);

  return (
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
  );
};

const Project = () => {
  const { url, path } = useRouteMatch();
  return (
    <FlexRowMain>
      <SubMenu />
      <ContentContainer>
        <Content>
          <Switch>
            <Route path={`${path}/boards`} component={Boards} />
            <Route path={`${path}/board/:boardId/*`} component={Boards} />
            <Route path={`${path}/task/:taskId/*`} component={Boards} />
            <Route exact path={`${path}/task-group`} component={TaskGroup} />
            <Route path={`${path}/task-group/*`} component={TaskGroup} />
            <Route
              path={url}
              render={() => <DefaultRouteNavigation to={`${url}/boards`} />}
            />
          </Switch>
        </Content>
      </ContentContainer>
    </FlexRowMain>
  );
};

export default Project;
