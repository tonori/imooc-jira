// Components
import { Switch, Route, Redirect } from "react-router";
import { Dropdown, Menu, Button, message } from "antd";
import styled from "@emotion/styled";
import ProjectListScreen from "pages/project-list";
import ProjectScreen from "pages/project";
import ProjectPopover from "pages/project-list/project-popover";
import ProjectModal from "pages/project-list/project-modal";

// Hooks
import { useState } from "react";
import useAuth from "hooks/useAuth";

// Resources
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

const PageHeader = () => {
  const { user, logout: _logout } = useAuth();

  const logout = () => {
    _logout();
    message.info("您已登出");
  };

  const menu = (
    <Menu>
      <Menu.Item key="logoutButton">
        <Button type="link" onClick={logout}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header>
      <HeaderLeft>
        <Button
          type="link"
          onClick={() => (window.location.href = window.location.origin)}
        >
          <SoftwareLogo width="18rem" color="rbg(38, 132, 255)" />
        </Button>
        <h3>
          <ProjectPopover />
        </h3>
        <h3>用户</h3>
      </HeaderLeft>
      <Dropdown overlay={menu}>
        <Button type="link" onClick={(e) => e.preventDefault()}>
          你好，{user?.name || "用户"}
        </Button>
      </Dropdown>
    </Header>
  );
};

const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader />
      <Main>
        <Switch>
          <Route exact path="/projects" component={ProjectListScreen} />
          <Route path="/projects/:projectId" component={ProjectScreen} />
          <Redirect to="/projects" from="/" />
        </Switch>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        setProjectModalOpen={setProjectModalOpen}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  height: 6rem;
  padding: 0 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Main = styled.main`
  padding: 0 3.2rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-bottom: 0;
  }

  > :not(:last-child) {
    margin-right: 2rem;
  }
`;

export default AuthenticatedApp;
