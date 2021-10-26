// Components
import { Header } from "styled-components/ContentScreenLayout";
import { Button, Dropdown, Menu, message } from "antd";
import ProjectPopover from "pages/project-list/project-popover";
import styled from "@emotion/styled";
// Hooks
import useAuth from "hooks/useAuth";
// Resource
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

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

const AuthenticatedAppHeader = () => {
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
          <SoftwareLogo
            width="18rem"
            color="rbg(38, 132, 255)"
            style={{ padding: 0 }}
          />
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

export default AuthenticatedAppHeader;
