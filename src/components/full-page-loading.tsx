// Components
import { Spin } from "antd";
import styled from "@emotion/styled";

// Resources
import { ReactComponent as SoftwareLogo } from "assets/logo.svg";

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullPageLoading = () => (
  <LoadingContainer>
    <Spin delay={200} spinning={true} size="large" style={{ margin: "4rem" }} />
    <SoftwareLogo width="18rem" color="rbg(38, 132, 255)" />
  </LoadingContainer>
);

export default FullPageLoading;
