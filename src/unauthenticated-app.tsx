// Components
import { Redirect, Route, Switch } from "react-router";
import { Card } from "antd";
import RegisterScreen from "pages/auth/register";
import LoginScreen from "pages/auth/login";
import styled from "@emotion/styled";

// Resources
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

const UnauthenticatedApp = () => {
  return (
    <Container>
      <Background />
      <Header />
      <AuthenticatedCard>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Redirect to="/login" from="/" />
        </Switch>
      </AuthenticatedCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthenticatedCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

export const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94.108.132);
`;

export default UnauthenticatedApp;
